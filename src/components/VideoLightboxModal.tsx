/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { X, Play, Pause, Volume2, VolumeX, MessageCircle, Heart, Share2, Sparkles, Check } from 'lucide-react';

interface VideoLightboxProps {
  isOpen: boolean;
  video: {
    id: string;
    title: string;
    duration: string;
    thumbnail: string;
    speaker: string;
    accent: string;
    description: string;
  } | null;
  onClose: () => void;
  onAddToCart: (name: string, price: number, image: string) => void;
}

const SIMULATED_SUBTITLES: Record<string, { time: number; text: string }[]> = {
  'v-1': [
    { time: 0, text: 'Hi! I am Lerato, and my mornings as an HR Lead in Pretoria are chaotic.' },
    { time: 3, text: 'I need cosmetics that stay perfectly matte continuously, through heat and pressure.' },
    { time: 7, text: 'The Profuse 3-in-1 foundation acts as premium primer & cover in one step.' },
    { time: 11, text: 'Look at this flawless, breakout-resistant, zero-fatigue finish!' },
    { time: 14, text: 'Seriously, Shade 09 is my absolute soulmate. Try it out!' }
  ],
  'v-2': [
    { time: 0, text: 'Motherhood is beautiful, but sleep... well, what is sleep? Haha.' },
    { time: 4, text: 'The Micro Pearl setting powder is talc-free, zero flashback, and baby safe.' },
    { time: 8, text: 'I sweep a gentle layer over my cheeks after school commutes.' },
    { time: 12, text: 'It feels completely air-weight, smooth, and resists perspiration!' },
    { time: 16, text: 'My skin looks hydrated and clean all day. Highly recommend!' }
  ],
  'v-3': [
    { time: 0, text: 'Welcome to Pretoria Studio! Today we are testing high-density synthetic bristles.' },
    { time: 4, text: 'Marcia Kgaphola engineered these Teakwood brushes for maximum retention.' },
    { time: 9, text: 'Watch the liquid foundation glide easily with zero streaking.' },
    { time: 14, text: 'Look at this seamless physical blend... perfection!' },
    { time: 18, text: 'Get the full professional studio look. Absolute game changer!' }
  ]
};

export default function VideoLightboxModal({ isOpen, video, onClose, onAddToCart }: VideoLightboxProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [likesCount, setLikesCount] = useState(148);
  const [hasLiked, setHasLiked] = useState(false);
  const [cartSuccess, setCartSuccess] = useState(false);
  
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (isOpen) {
      setIsPlaying(true);
      setCurrentTime(0);
      setLikesCount(Math.floor(120 + Math.random() * 200));
      setHasLiked(false);
      setCartSuccess(false);

      // Initialize the simulation timer for time progression & subtitles sync
      timerRef.current = window.setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= 17) {
            return 0; // Loop simulation
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isOpen, video]);

  if (!isOpen || !video) return null;

  const currentSubtitles = SIMULATED_SUBTITLES[video.id] || [];
  const activeSub = currentSubtitles
    .filter((s) => currentTime >= s.time)
    .pop()?.text || "";

  // Progress Bar Width percentage
  const progressPercent = (currentTime / 18) * 100;

  const handleLike = () => {
    if (hasLiked) {
      setLikesCount(likesCount - 1);
      setHasLiked(false);
    } else {
      setLikesCount(likesCount + 1);
      setHasLiked(true);
    }
  };

  const handleAddSetToCart = () => {
    // Generate simulated bundle buy
    let price = 350;
    if (video.id === 'v-2') price = 250;
    if (video.id === 'v-3') price = 599;

    onAddToCart(video.title + " Routine Item", price, video.thumbnail);
    setCartSuccess(true);
    setTimeout(() => setCartSuccess(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay backblurs */}
      <div 
        className="absolute inset-0 bg-[#1E1214]/75 dark:bg-black/85 backdrop-blur-lg cursor-pointer"
        onClick={onClose}
      />

      {/* Main Container framed as a vertical smartphone */}
      <div className="relative w-full max-w-sm aspect-[9/16] bg-black rounded-[42px] border-[10px] border-[#1E1214] overflow-hidden shadow-2xl z-10 flex flex-col justify-between animate-scaleIn">
        
        {/* Phone Notch/Island */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-full z-30 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-stone-900 mr-2" />
          <div className="w-12 h-1 bg-stone-950 rounded-full" />
        </div>

        {/* Video stream background canvas simulation */}
        <div className="absolute inset-0 w-full h-full bg-[#120A0B] -z-10">
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-full object-cover transition-transform duration-[10000ms] ease-out scale-110"
            style={{ transform: isPlaying ? 'scale(1.2) translateY(-10px)' : 'scale(1.1)' }}
            referrerPolicy="no-referrer"
          />
          {/* Subtle gold gradient filter on running video */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
        </div>

        {/* Header Options */}
        <div className="flex justify-between items-center p-6 pt-10 z-20">
          <div className="bg-white/10 backdrop-blur-md rounded-full px-3 py-1 border border-white/20 text-[10px] text-white flex items-center gap-1.5 font-bold tracking-widest uppercase">
            <Sparkles size={11} className="text-pink-300 animate-pulse" />
            <span>MUA Demo</span>
          </div>
          
          <button 
            onClick={onClose}
            className="p-1.5 bg-black/60 hover:bg-black text-white rounded-full transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Floating Sound bars animation to visualize physical audio */}
        {isPlaying && (
          <div className="absolute top-[20%] left-6 flex items-end gap-1 z-20 h-5">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-1 bg-pink-500 rounded-full"
                style={{
                  height: isMuted ? '4px' : `${Math.floor(10 + Math.random() * 25)}px`,
                  animation: isMuted ? 'none' : `bounce 1s ease-in-out infinite alternate`,
                  animationDelay: `${i * 0.15}s`
                }}
              />
            ))}
          </div>
        )}

        {/* Narrator Details & Caption Sync overlay */}
        <div className="p-6 pb-20 z-20 text-left">
          
          {/* Subtitles synced with ticking time of video */}
          <div className="min-h-[48px] bg-black/40 backdrop-blur-sm rounded-xl p-3 mb-4 border border-white/10 text-center">
            <p className="text-xs text-white/95 leading-relaxed font-medium animate-fadeIn text-center">
              "{activeSub || "Profuse Beauty highlights natural South African confidence..."}"
            </p>
          </div>

          <div className="flex justify-between items-end gap-4">
            {/* Presenter Name */}
            <div className="flex-1">
              <span className="text-[10px] text-pink-300 font-bold uppercase tracking-wider">{video.speaker}</span>
              <h4 className="text-base text-white font-bold tracking-tight mt-0.5">{video.title}</h4>
              <p className="text-[11px] text-gray-300 leading-tight mt-1">{video.description}</p>
              
              {/* Highlight accent */}
              <span className="inline-block mt-2.5 text-[9px] bg-amber-500/25 border border-amber-500/30 text-amber-200 font-bold px-2 py-0.5 rounded">
                Active: {video.accent}
              </span>
            </div>

            {/* Micro Interaction sidebar stack (MUA Instagram style) */}
            <div className="flex flex-col gap-4 items-center text-white z-30">
              <button 
                onClick={handleLike}
                className="flex flex-col items-center cursor-pointer group"
              >
                <div className={`p-2.5 rounded-full backdrop-blur-md border transition-all ${
                  hasLiked 
                    ? 'bg-rose-600 border-rose-500 text-white scale-110 shadow-lg' 
                    : 'bg-black/45 border-white/10 text-white hover:bg-white/15'
                }`}>
                  <Heart size={16} fill={hasLiked ? 'currentColor' : 'none'} />
                </div>
                <span className="text-[10px] font-bold mt-1 tracking-wider">{likesCount}</span>
              </button>

              <button 
                onClick={handleAddSetToCart}
                className="flex flex-col items-center cursor-pointer group"
              >
                <div className="p-2.5 bg-black/45 border border-white/10 hover:bg-white/15 rounded-full backdrop-blur-md transition-all text-white hover:scale-105">
                  <Play size={16} className="text-emerald-400" />
                </div>
                <span className="text-[9px] font-bold mt-1 uppercase tracking-widest text-[#F9EBE6]">Get Set</span>
              </button>
            </div>
          </div>

          {/* Checkout Bundle Action */}
          <button
            onClick={handleAddSetToCart}
            className="w-full bg-gradient-to-r from-pink-600 to-amber-600 text-white py-3.5 rounded-full text-xs font-bold mt-4 shadow-xl flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 duration-200 cursor-pointer"
          >
            {cartSuccess ? <Check size={14} className="text-emerald-300 animate-scaleIn" /> : null}
            {cartSuccess ? 'Set Added ✓' : 'Add Active Routine Set to Cart'}
          </button>

        </div>

        {/* Video Controls Timeline Bar */}
        <div className="absolute bottom-12 inset-x-0 px-6 z-20">
          <div className="relative h-1 w-full bg-white/20 rounded-full overflow-hidden">
            <div 
              className="absolute top-0 left-0 bottom-0 bg-pink-500 transition-all duration-1000"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex justify-between text-[8px] text-gray-400 font-bold mt-1">
            <span>0:0{currentTime < 10 ? `0${currentTime}` : currentTime}</span>
            <span>0:{video.duration.split(':')[1]}</span>
          </div>
        </div>

        {/* Phone Home Indicator bar */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/40 rounded-full z-20" />

      </div>
    </div>
  );
}
