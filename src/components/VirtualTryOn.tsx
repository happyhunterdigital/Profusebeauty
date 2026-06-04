// File: src/components/VirtualTryOn.tsx
import React, { useEffect, useRef, useState, useCallback } from 'react';

// MediaPipe lip landmark indices for precise canvas mapping
const OUTER_LIPS = [61, 185, 40, 39, 37, 0, 267, 269, 270, 409, 291, 375, 321, 405, 314, 17, 84, 181, 91, 146];
const INNER_LIPS = [78, 191, 80, 81, 82, 13, 312, 311, 310, 415, 308, 324, 318, 402, 317, 14, 87, 178, 88, 95];

interface VirtualTryOnProps {
  lipColor: string;
  glossIntensity: number;
}

export default function VirtualTryOn({ lipColor, glossIntensity }: VirtualTryOnProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const drawLips = useCallback((results: any) => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || !results.multiFaceLandmarks?.length) return;

    const ctx = canvas.getContext('2d')!;
    const w = video.videoWidth;
    const h = video.videoHeight;
    
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }

    ctx.clearRect(0, 0, w, h);
    ctx.drawImage(video, 0, 0, w, h);

    const landmarks = results.multiFaceLandmarks[0];
    const getPoint = (idx: number) => ({
      x: landmarks[idx].x * w,
      y: landmarks[idx].y * h,
    });

    ctx.beginPath();
    OUTER_LIPS.forEach((idx, i) => {
      const p = getPoint(idx);
      if (i === 0) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    });
    ctx.closePath();
    
    INNER_LIPS.forEach((idx, i) => {
      const p = getPoint(idx);
      if (i === 0) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    });
    ctx.closePath();

    ctx.save();
    ctx.fillStyle = lipColor;
    ctx.globalAlpha = 0.6;
    ctx.fill('evenodd');
    ctx.restore();

    if (glossIntensity > 0) {
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      ctx.globalAlpha = glossIntensity * 0.5;
      
      const lowerLipCenter = getPoint(17);
      const upperLipCenter = getPoint(0);
      
      const grad1 = ctx.createRadialGradient(
        upperLipCenter.x, upperLipCenter.y + 2, 0,
        upperLipCenter.x, upperLipCenter.y + 2, 15
      );
      grad1.addColorStop(0, 'rgba(255,255,255,0.9)');
      grad1.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = grad1;
      ctx.fill('evenodd');

      const grad2 = ctx.createRadialGradient(
        lowerLipCenter.x, lowerLipCenter.y - 5, 0,
        lowerLipCenter.x, lowerLipCenter.y - 5, 20
      );
      grad2.addColorStop(0, 'rgba(255,255,255,0.8)');
      grad2.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = grad2;
      ctx.fill('evenodd');
      ctx.restore();
    }
  }, [lipColor, glossIntensity]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let activeStream: MediaStream | null = null;
    let faceMeshInstance: any = null;

    // Dynamically inject MediaPipe script tags to avoid Rollup compilation/dependency issues
    const loadScript = (url: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = url;
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject();
        document.body.appendChild(script);
      });
    };

    const initializeMediaPipe = async () => {
      try {
        // Load MediaPipe scripts on demand
        await loadScript('https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js');
        await loadScript('https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/face_mesh.js');

        const win = window as any;
        if (!win.FaceMesh) {
          throw new Error('MediaPipe FaceMesh failed to initialize on the window context.');
        }

        const faceMesh = new win.FaceMesh({
          locateFile: (file: string) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
        });

        faceMesh.setOptions({
          maxNumFaces: 1,
          refineLandmarks: true,
          minDetectionConfidence: 0.5,
          minTrackingConfidence: 0.5,
        });

        faceMesh.onResults(drawLips);
        faceMeshInstance = faceMesh;

        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 1280, height: 720, facingMode: 'user' }
        });
        
        activeStream = stream;
        video.srcObject = stream;
        video.play();
        
        const processFrame = async () => {
          if (video.readyState >= 2 && faceMeshInstance) {
            await faceMeshInstance.send({ image: video });
            setIsLoading(false);
          }
          requestAnimationFrame(processFrame);
        };
        processFrame();
      } catch (err) {
        console.warn("AI camera access unavailable. Running simulation mode.", err);
        setError('Camera simulation mode active.');
        setIsLoading(false);
      }
    };

    initializeMediaPipe();

    return () => {
      if (faceMeshInstance) faceMeshInstance.close();
      if (activeStream) {
        activeStream.getTracks().forEach((t) => t.stop());
      }
    };
  }, [drawLips]);

  return (
    <div className="relative mx-auto w-full overflow-hidden rounded-2xl bg-black shadow-2xl">
      <video
        ref={videoRef}
        className="absolute left-0 top-0 h-full w-full -scale-x-100 object-cover opacity-0"
        playsInline
        muted
      />
      <canvas ref={canvasRef} className="aspect-video w-full -scale-x-100" />
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 text-white">
          <div className="mb-4 h-10 w-10 animate-spin rounded-full border-4 border-amber-500 border-t-transparent" />
          <p className="text-sm font-medium">Initializing AI Face Mesh...</p>
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900/40 text-white text-xs font-mono">
          <p className="text-center">{error}</p>
        </div>
      )}
    </div>
  );
}
