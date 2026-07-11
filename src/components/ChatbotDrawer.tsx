// File: src/components/ChatbotDrawer.tsx
import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2, Sparkles } from 'lucide-react';
import { httpsCallable } from 'firebase/functions';
import { functions } from '../lib/firebase';

interface ChatbotDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
}

interface ChatMessage {
  sender: 'AI' | 'User';
  text: string;
}

const STARTER_PROMPTS = [
  "What's on sale right now?",
  "Recommend a foundation for oily skin",
  "How do I become an affiliate?",
  "What lipsticks do you have?"
];

export default function ChatbotDrawer({ isOpen, onClose, isDarkMode }: ChatbotDrawerProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { sender: 'AI', text: "Hi! I'm your Profuse Beauty AI Assistant. Ask me about products, shade advice, what's on sale, or how to become an affiliate." }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  if (!isOpen) return null;

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const historyForCall = [...messages];
    setMessages(prev => [...prev, { sender: 'User', text: trimmed }]);
    setInput('');
    setLoading(true);

    try {
      const beautyChatCall = httpsCallable(functions, 'beautyChat');
      const response = await beautyChatCall({ message: trimmed, history: historyForCall }) as any;
      const reply = response.data?.reply || "Sorry, I didn't get that. Could you try again?";
      setMessages(prev => [...prev, { sender: 'AI', text: reply }]);
    } catch (err) {
      setMessages(prev => [...prev, { sender: 'AI', text: "Connection interrupted — please try again in a moment." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-end">
      <div className={`w-full max-w-md ${isDarkMode ? 'bg-[#0E0E12]' : 'bg-white'} h-full p-6 flex flex-col shadow-2xl animate-slide-in`}>

        <div className="flex justify-between items-center border-b border-zinc-800 pb-4 mb-4 shrink-0">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <div>
              <span className="text-[8px] font-mono uppercase tracking-widest text-amber-500 block">Profuse Beauty</span>
              <h3 className={`text-base font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>AI Beauty Assistant</h3>
            </div>
          </div>
          <button onClick={onClose} className="text-xs font-mono text-zinc-500 hover:text-amber-500">CLOSE</button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-3 pr-1 text-sm">
          {messages.map((m, idx) => (
            <div key={idx} className={`flex ${m.sender === 'User' ? 'justify-end' : 'justify-start'}`}>
              <div className={`p-3 max-w-[85%] rounded-xl leading-relaxed whitespace-pre-wrap ${
                m.sender === 'User'
                  ? 'bg-amber-500 text-black font-medium'
                  : isDarkMode ? 'bg-zinc-900 text-zinc-200' : 'bg-zinc-100 text-zinc-800'
              }`}>
                {m.text}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className={`p-3 rounded-xl flex items-center gap-2 text-[11px] ${isDarkMode ? 'bg-zinc-900 text-zinc-400' : 'bg-zinc-100 text-zinc-500'}`}>
                <Loader2 className="animate-spin" size={12} />
                <span>Thinking...</span>
              </div>
            </div>
          )}
          <div ref={scrollRef} />
        </div>

        {messages.length <= 1 && (
          <div className="flex flex-wrap gap-2 py-3 shrink-0">
            {STARTER_PROMPTS.map(prompt => (
              <button
                key={prompt}
                onClick={() => sendMessage(prompt)}
                className={`text-[10px] font-mono border ${isDarkMode ? 'border-zinc-800 hover:border-amber-400 text-zinc-300' : 'border-zinc-300 hover:border-amber-500 text-zinc-600'} px-2.5 py-1.5 rounded-full uppercase tracking-wide transition-colors`}
              >
                {prompt}
              </button>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit} className="pt-4 border-t border-zinc-800 flex gap-2 shrink-0">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about products, shades, sales..."
            disabled={loading}
            className={`flex-1 text-sm p-3 rounded-lg border outline-none disabled:opacity-50 ${
              isDarkMode
                ? 'bg-zinc-950 text-white border-zinc-800 focus:border-amber-500'
                : 'bg-zinc-50 text-black border-zinc-300 focus:border-amber-500'
            }`}
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="text-amber-500 hover:text-amber-400 p-3 disabled:opacity-40 transition-colors shrink-0"
            aria-label="Send message"
          >
            <Send size={18} />
          </button>
        </form>

      </div>
    </div>
  );
}
