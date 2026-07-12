// File: src/components/ChatbotDrawer.tsx
import React, { useState, useRef, useEffect } from 'react';
import { httpsCallable } from 'firebase/functions';
import { functions } from '../lib/firebase';

interface ChatbotDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
}

interface ChatMessage {
  sender: 'User' | 'AI';
  text: string;
}

const CHATBOT_ICON = 'https://res.cloudinary.com/dafc66cma/image/upload/v1783848833/PB_Chatbot_icon_hbtkc9.png';

const beautyChatFn = httpsCallable<{ message: string; history: ChatMessage[] }, { reply: string }>(
  functions,
  'beautyChat'
);

export default function ChatbotDrawer({ isOpen, onClose, isDarkMode }: ChatbotDrawerProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { sender: 'AI', text: "Hi! I'm the Profuse Beauty assistant. Ask me anything — product recommendations, shades, prices, what's in stock, or tips from our Journal. What are you looking for today?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, isTyping]);

  if (!isOpen) return null;

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || isTyping) return;

    const nextMessages: ChatMessage[] = [...messages, { sender: 'User', text: trimmed }];
    setMessages(nextMessages);
    setInput('');
    setIsTyping(true);

    try {
      const result = await beautyChatFn({ message: trimmed, history: nextMessages });
      setMessages(prev => [...prev, { sender: 'AI', text: result.data.reply }]);
    } catch (err) {
      console.error('beautyChat call failed:', err);
      setMessages(prev => [...prev, { sender: 'AI', text: "I'm having trouble connecting right now — please try again in a moment, or browse the Shop page directly." }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-end">
      <div className={`w-full max-w-md ${isDarkMode ? 'bg-[#0E0E12]' : 'bg-white'} h-full p-6 flex flex-col shadow-2xl animate-slide-in`}>

        <div className="flex justify-between items-center border-b border-zinc-800 pb-4 mb-4">
          <div className="flex items-center gap-3">
            <img src={CHATBOT_ICON} alt="Profuse Beauty Assistant" className="w-9 h-9 rounded-full border border-[#d4af37]/50 object-cover" />
            <div>
              <span className="text-[8px] font-mono uppercase tracking-widest text-amber-500 block">Profuse Beauty</span>
              <h3 className="text-base font-bold text-white">AI Beauty Assistant</h3>
            </div>
          </div>
          <button onClick={onClose} className="text-xs font-mono text-zinc-500 hover:text-white">CLOSE</button>
        </div>

        <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto pr-2 text-xs">
          {messages.map((m, idx) => (
            <div key={idx} className={`flex ${m.sender === 'User' ? 'justify-end' : 'justify-start'}`}>
              {m.sender === 'AI' && (
                <img src={CHATBOT_ICON} alt="" className="w-6 h-6 rounded-full mr-2 mt-1 flex-shrink-0 object-cover" />
              )}
              <div className={`p-2.5 max-w-[80%] rounded-lg leading-relaxed whitespace-pre-wrap ${m.sender === 'User' ? 'bg-[#fbbf24] text-black' : 'bg-zinc-900 text-zinc-300'}`}>
                {m.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <img src={CHATBOT_ICON} alt="" className="w-6 h-6 rounded-full mr-2 mt-1 flex-shrink-0 object-cover" />
              <div className="p-2.5 bg-zinc-900 text-zinc-500 rounded-lg text-xs italic">Typing…</div>
            </div>
          )}
        </div>

        <div className="border-t border-zinc-800 pt-4 mt-4">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about products, shades, prices..."
              className="flex-1 bg-zinc-900 border border-zinc-800 rounded-full px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#d4af37]"
            />
            <button
              onClick={handleSend}
              disabled={isTyping || !input.trim()}
              className="w-10 h-10 flex-shrink-0 rounded-full bg-[#d4af37] text-black flex items-center justify-center disabled:opacity-40 hover:bg-[#b8960f] transition-colors"
              aria-label="Send message"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
          <span className="text-[8px] font-mono text-zinc-600 block text-center mt-3">
            🔒 POPIA compliant • Answers are based on our live catalog and Journal
          </span>
        </div>

      </div>
    </div>
  );
}
