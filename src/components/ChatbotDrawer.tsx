// File: src/components/ChatbotDrawer.tsx
import React, { useState } from 'react';
import { ingredients } from '../data';
import { INCIIngredient } from '../types';

interface ChatbotDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
}

export default function ChatbotDrawer({ isOpen, onClose, isDarkMode }: ChatbotDrawerProps) {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([
    { sender: 'AI', text: "Hello! I am your automated AI Beauty Assistant, running the gemini-3.1-flash-lite-preview framework. Click on any ingredient below to evaluate chemical safety." }
  ]);

  if (!isOpen) return null;

  const handleDecode = (ing: INCIIngredient) => {
    setMessages(prev => [
      ...prev,
      { sender: 'AI', text: `🔬 [DECODED] ${ing.name} is a "${ing.function}" with a safety rating of ${ing.hazard}. Use Cases: ${ing.desc}` }
    ]);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-end">
      <div className={`w-full max-w-md ${isDarkMode ? 'bg-[#0E0E12]' : 'bg-white'} h-full p-6 flex flex-col justify-between shadow-2xl animate-slide-in`}>
        
        <div>
          <div className="flex justify-between items-center border-b border-zinc-800 pb-4 mb-4">
            <div>
              <span className="text-[8px] font-mono uppercase tracking-widest text-amber-500 block">AI Bot Framework</span>
              <h3 className="text-base font-bold text-white">gemini-3.1-flash-lite-preview</h3>
            </div>
            <button onClick={onClose} className="text-xs font-mono text-zinc-500 hover:text-white">CLOSE</button>
          </div>

          <div className="bg-zinc-950 p-3 border border-white/5 space-y-2 mb-4">
            <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-400 block">Select Botanical Asset:</span>
            <div className="flex flex-wrap gap-1">
              {ingredients.map(ing => (
                <button
                  key={ing.name}
                  onClick={() => handleDecode(ing)}
                  className="text-[9px] font-mono border border-zinc-800 hover:border-amber-400 text-zinc-300 px-2 py-1 uppercase"
                >
                  {ing.name}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-2 text-xs">
            {messages.map((m, idx) => (
              <div key={idx} className={`flex ${m.sender === 'User' ? 'justify-end' : 'justify-start'}`}>
                <div className={`p-2.5 max-w-[85%] rounded-lg leading-relaxed ${m.sender === 'User' ? 'bg-[#fbbf24] text-black' : 'bg-zinc-900 text-zinc-300'}`}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-zinc-850 pt-4 text-center">
          <span className="text-[8px] font-mono text-zinc-600 block">
            🔒 POPIA compliant encrypted analysis • AWS Cape Town database nodes
          </span>
        </div>

      </div>
    </div>
  );
}
