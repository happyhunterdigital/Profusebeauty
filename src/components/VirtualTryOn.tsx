// File: src/components/VirtualTryOn.tsx
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { FaceLandmarker, FilesetResolver } from '@mediapipe/tasks-vision';

export type TryOnMode = 'Foundation' | 'Concealer' | 'Contour' | 'Lip Color';

// Canonical MediaPipe Face Mesh landmark indices (well-established, used across the
// MediaPipe ecosystem) mapping product regions onto the live video feed.
const OUTER_LIPS = [61, 185, 40, 39, 37, 0, 267, 269, 270, 409, 291, 375, 321, 405, 314, 17, 84, 181, 91, 146];
const INNER_LIPS = [78, 191, 80, 81, 82, 13, 312, 311, 310, 415, 308, 324, 318, 402, 317, 14, 87, 178, 88, 95];
const FACE_OVAL = [10, 338, 297, 332, 284, 251, 389, 356, 454, 323, 361, 288, 397, 365, 379, 378, 400, 377, 152, 148, 176, 149, 150, 136, 172, 58, 132, 93, 234, 127, 162, 21, 54, 103, 67, 109];

// Under-eye / cheek / jaw anchor points. These give a stylized, camera-ready preview
// placement for Concealer & Contour — not a pixel-exact segmentation mask. Refine
// further if an exact brand-supplied face map becomes available.
const EYE_LOWER_L = 145;
const EYE_LOWER_R = 374;
const CHEEK_L = 50;
const CHEEK_R = 280;
const JAW_L = 172;
const JAW_R = 397;
const FACE_LEFT_EDGE = 234;
const FACE_RIGHT_EDGE = 454;

const MEDIAPIPE_VERSION = '0.10.20';
const MODEL_URL = 'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task';
const WASM_URL = `https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@${MEDIAPIPE_VERSION}/wasm`;

function hexToRgba(hex: string, alpha: number): string {
  const clean = hex.replace('#', '');
  const full = clean.length === 3 ? clean.split('').map(c => c + c).join('') : clean;
  const bigint = parseInt(full, 16) || 0;
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r},${g},${b},${alpha})`;
}

interface Point { x: number; y: number; }

interface VirtualTryOnProps {
  mode: TryOnMode;
  color: string;
  intensity: number; // 0-1 product intensity / gloss
}

export default function VirtualTryOn({ mode, color, intensity }: VirtualTryOnProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [cameraReady, setCameraReady] = useState<boolean>(false);
  const [aiReady, setAiReady] = useState<boolean>(false);
  const [aiFailed, setAiFailed] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [runtimeError, setRuntimeError] = useState<string | null>(null);
  const [faceDetected, setFaceDetected] = useState<boolean>(false);
  const landmarkerRef = useRef<FaceLandmarker | null>(null);
  const filesetResolverRef = useRef<any>(null);
  const delegateRef = useRef<'GPU' | 'CPU'>('GPU');
  const recoveringRef = useRef(false);
  const hasRenderedFrame = useRef(false);

  // Kept in refs so the render loop always reads the latest value without re-subscribing
  const modeRef = useRef(mode);
  const colorRef = useRef(color);
  const intensityRef = useRef(intensity);
  useEffect(() => { modeRef.current = mode; }, [mode]);
  useEffect(() => { colorRef.current = color; }, [color]);
  useEffect(() => { intensityRef.current = intensity; }, [intensity]);

  const drawFrame = useCallback((landmarks: Point[] | null, w: number, h: number) => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }
    ctx.clearRect(0, 0, w, h);
    ctx.drawImage(video, 0, 0, w, h);
    if (!landmarks || landmarks.length === 0) return;

    const P = (idx: number): Point => ({ x: landmarks[idx].x * w, y: landmarks[idx].y * h });
    const activeMode = modeRef.current;
    const activeColor = colorRef.current;
    const activeIntensity = intensityRef.current;

    if (activeMode === 'Lip Color') {
      ctx.save();
      ctx.beginPath();
      OUTER_LIPS.forEach((idx, i) => { const p = P(idx); i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y); });
      ctx.closePath();
      INNER_LIPS.forEach((idx, i) => { const p = P(idx); i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y); });
      ctx.closePath();
      ctx.fillStyle = activeColor;
      ctx.globalAlpha = 0.6;
      ctx.fill('evenodd');
      ctx.restore();

      if (activeIntensity > 0) {
        ctx.save();
        ctx.globalCompositeOperation = 'screen';
        ctx.globalAlpha = activeIntensity * 0.5;
        const spots: { c: Point; r: number; dy: number }[] = [
          { c: P(0), r: 15, dy: 2 },
          { c: P(17), r: 20, dy: -5 },
        ];
        spots.forEach(({ c, r, dy }) => {
          const grad = ctx.createRadialGradient(c.x, c.y + dy, 0, c.x, c.y + dy, r);
          grad.addColorStop(0, 'rgba(255,255,255,0.9)');
          grad.addColorStop(1, 'rgba(255,255,255,0)');
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(c.x, c.y + dy, r, 0, Math.PI * 2);
          ctx.fill();
        });
        ctx.restore();
      }
      return;
    }

    if (activeMode === 'Foundation') {
      ctx.save();
      ctx.beginPath();
      FACE_OVAL.forEach((idx, i) => { const p = P(idx); i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y); });
      ctx.closePath();
      ctx.fillStyle = activeColor;
      ctx.globalAlpha = 0.26 + activeIntensity * 0.14;
      ctx.globalCompositeOperation = 'multiply';
      ctx.fill();
      ctx.restore();
      return;
    }

    const faceW = Math.hypot(P(FACE_LEFT_EDGE).x - P(FACE_RIGHT_EDGE).x, P(FACE_LEFT_EDGE).y - P(FACE_RIGHT_EDGE).y);

    if (activeMode === 'Concealer') {
      const rx = faceW * 0.11;
      const ry = rx * 0.62;
      [EYE_LOWER_L, EYE_LOWER_R].forEach(idx => {
        const lower = P(idx);
        const cx = lower.x;
        const cy = lower.y + ry * 0.5;
        ctx.save();
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(rx, ry) * 1.4);
        grad.addColorStop(0, hexToRgba(activeColor, 0.5 + activeIntensity * 0.25));
        grad.addColorStop(1, hexToRgba(activeColor, 0));
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
      return;
    }

    if (activeMode === 'Contour') {
      const rx = faceW * 0.09;
      const ry = rx * 1.7;
      ([[CHEEK_L, JAW_L], [CHEEK_R, JAW_R]] as [number, number][]).forEach(([cheekIdx, jawIdx]) => {
        const cheek = P(cheekIdx);
        const jaw = P(jawIdx);
        const cx = (cheek.x + jaw.x) / 2;
        const cy = (cheek.y + jaw.y) / 2;
        const angle = Math.atan2(jaw.y - cheek.y, jaw.x - cheek.x);
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(angle);
        const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, Math.max(rx, ry));
        grad.addColorStop(0, hexToRgba(activeColor, 0.38 + activeIntensity * 0.2));
        grad.addColorStop(1, hexToRgba(activeColor, 0));
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.ellipse(0, 0, ry, rx, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
    }
  }, []);

  // Camera + AI model bootstrap. These run independently and in parallel: a slow or
  // failed AI model load must never block the live camera feed from showing.
  useEffect(() => {
    let stream: MediaStream | null = null;
    let cancelled = false;

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 1280, height: 720, facingMode: 'user' }
        });
        if (cancelled) { stream.getTracks().forEach(t => t.stop()); return; }
        const video = videoRef.current;
        if (!video) return;
        video.srcObject = stream;
        await video.play();
        if (!cancelled) setCameraReady(true);
      } catch (err) {
        console.warn('Try-On Live: camera access denied or unavailable.', err);
        if (!cancelled) {
          setError('Camera access is blocked. Please allow camera permissions for this site and try again.');
          setIsLoading(false);
        }
      }
    };

    const createLandmarker = async (filesetResolver: any, delegate: 'GPU' | 'CPU') => {
      return FaceLandmarker.createFromOptions(filesetResolver, {
        baseOptions: { modelAssetPath: MODEL_URL, delegate },
        runningMode: 'VIDEO',
        numFaces: 1,
      });
    };

    const startFaceLandmarker = async () => {
      const timeoutId = window.setTimeout(() => {
        if (!cancelled) setAiFailed(true);
      }, 12000);
      try {
        const filesetResolver = await FilesetResolver.forVisionTasks(WASM_URL);
        filesetResolverRef.current = filesetResolver;
        let landmarker: FaceLandmarker;
        try {
          landmarker = await createLandmarker(filesetResolver, 'GPU');
          delegateRef.current = 'GPU';
        } catch (gpuErr) {
          console.warn('Try-On Live: GPU delegate unavailable, falling back to CPU.', gpuErr);
          landmarker = await createLandmarker(filesetResolver, 'CPU');
          delegateRef.current = 'CPU';
        }
        window.clearTimeout(timeoutId);
        if (cancelled) { landmarker.close(); return; }
        landmarkerRef.current = landmarker;
        setAiReady(true);
      } catch (err) {
        window.clearTimeout(timeoutId);
        // Camera still works without this — we degrade to a plain live mirror.
        // Common cause: Content-Security-Policy blocking storage.googleapis.com
        // (model file) or cdn.jsdelivr.net (WASM runtime) in connect-src/worker-src,
        // or missing 'wasm-unsafe-eval' in script-src. Check the browser console.
        console.warn('Try-On Live: AI face tracking unavailable, showing live camera without shade overlay. Check for Content-Security-Policy blocks (storage.googleapis.com / cdn.jsdelivr.net) in the browser console.', err);
        if (!cancelled) setAiFailed(true);
      }
    };

    startCamera();
    startFaceLandmarker();

    return () => {
      cancelled = true;
      if (stream) stream.getTracks().forEach(t => t.stop());
      if (landmarkerRef.current) {
        landmarkerRef.current.close();
        landmarkerRef.current = null;
      }
    };
  }, []);

  // Render loop — starts as soon as the camera is ready, independent of AI readiness.
  useEffect(() => {
    if (!cameraReady) return;
    let rafId: number;
    const video = videoRef.current;
    if (!video) return;

    const loop = () => {
      if (video.readyState >= 2) {
        const w = video.videoWidth;
        const h = video.videoHeight;
        const landmarker = landmarkerRef.current;
        let landmarks: Point[] | null = null;

        if (landmarker && !recoveringRef.current) {
          try {
            const results = landmarker.detectForVideo(video, performance.now());
            if (runtimeError) setRuntimeError(null);
            if (results.faceLandmarks && results.faceLandmarks[0]) {
              landmarks = results.faceLandmarks[0] as unknown as Point[];
              setFaceDetected(true);
            } else {
              setFaceDetected(false);
            }
          } catch (err) {
            // This is the critical fix: a single bad frame (most commonly a GPU-delegate
            // runtime failure — the delegate initializes fine but chokes on first real
            // inference) must never kill the whole render loop. Previously it did, which
            // froze the canvas on a plain, untinted frame with no visible error.
            console.error('Try-On Live: detectForVideo failed on a frame.', err);
            setRuntimeError(String((err as any)?.message || err));
            setFaceDetected(false);
            if (delegateRef.current === 'GPU' && !recoveringRef.current && filesetResolverRef.current) {
              recoveringRef.current = true;
              console.warn('Try-On Live: attempting runtime recovery by recreating the model on CPU delegate.');
              const oldLandmarker = landmarker;
              FaceLandmarker.createFromOptions(filesetResolverRef.current, {
                baseOptions: { modelAssetPath: MODEL_URL, delegate: 'CPU' },
                runningMode: 'VIDEO',
                numFaces: 1,
              }).then(newLandmarker => {
                landmarkerRef.current = newLandmarker;
                delegateRef.current = 'CPU';
                recoveringRef.current = false;
                oldLandmarker.close();
                setRuntimeError(null);
              }).catch(recoverErr => {
                console.error('Try-On Live: CPU recovery also failed, disabling AI tracking.', recoverErr);
                landmarkerRef.current = null;
                recoveringRef.current = false;
                setAiFailed(true);
              });
            }
          }
        }

        try {
          drawFrame(landmarks, w, h);
        } catch (drawErr) {
          console.error('Try-On Live: drawFrame failed.', drawErr);
        }

        if (!hasRenderedFrame.current) {
          hasRenderedFrame.current = true;
          setIsLoading(false);
        }
      }
      rafId = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(rafId);
  }, [cameraReady, drawFrame]);

  return (
    <div className="relative mx-auto w-full overflow-hidden rounded-2xl bg-black shadow-2xl">
      <video
        ref={videoRef}
        className="absolute left-0 top-0 h-full w-full -scale-x-100 object-cover opacity-0"
        playsInline
        muted
      />
      <canvas ref={canvasRef} className="aspect-video w-full -scale-x-100" />
      {isLoading && !error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 text-white">
          <div className="mb-4 h-10 w-10 animate-spin rounded-full border-4 border-amber-500 border-t-transparent" />
          <p className="text-sm font-medium">Requesting camera access…</p>
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900/95 text-white text-xs font-mono p-6">
          <p className="text-center">{error}</p>
        </div>
      )}
      {cameraReady && !aiReady && !error && !aiFailed && (
        <div className="absolute bottom-2 left-2 bg-black/60 text-amber-300 text-[10px] font-mono px-2 py-1 rounded">
          AI shade tracking loading… camera is live
        </div>
      )}
      {cameraReady && !aiReady && aiFailed && (
        <div className="absolute bottom-2 left-2 bg-black/70 text-red-300 text-[10px] font-mono px-2 py-1 rounded max-w-[90%]">
          Live shade tracking couldn't start (camera still works) — see browser console for details
        </div>
      )}
      {cameraReady && aiReady && (
        <div className={`absolute bottom-2 left-2 text-[10px] font-mono px-2 py-1 rounded ${faceDetected ? 'bg-green-900/70 text-green-300' : 'bg-black/60 text-amber-300'}`}>
          {faceDetected ? '● Face detected — tracking active' : '○ Looking for your face…'}
        </div>
      )}
      {runtimeError && (
        <div className="absolute bottom-2 right-2 bg-red-950/80 text-red-300 text-[9px] font-mono px-2 py-1 rounded max-w-[60%]">
          Tracking hiccup, recovering…
        </div>
      )}
    </div>
  );
}
