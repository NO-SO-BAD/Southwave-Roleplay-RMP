// src/components/GameChat.tsx
import { useState, useEffect, useRef } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { Send } from 'lucide-react';
// src/components/GameChat.tsx

interface Message {
  id: number;
  sender: string;
  text: string;
  type: 'ic' | 'ooc' | 'system';
}

export function GameChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isInputOpen, setIsInputOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Expone función para client-side
    (window as any).ui.addChatMessage = (sender: string, text: string, type: 'ic' | 'ooc' | 'system') => {
      setMessages(prev => [...prev, { id: Date.now(), sender, text, type }]);
    };

    // Auto-scroll
    const scrollToBottom = () => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    };

    scrollToBottom();

    return () => {
      delete (window as any).ui.addChatMessage;
    };
  }, [messages]);

  useEffect(() => {
    // Tecla T o / abre input
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 't' || e.key === '/') {
        e.preventDefault();
        setIsInputOpen(true);
        setTimeout(() => inputRef.current?.focus(), 50);
      } else if (e.key === 'Escape' && isInputOpen) {
        setIsInputOpen(false);
        setInput('');
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isInputOpen]);

  const sendMessage = () => {
    if (input.trim() === '') return;
    mp.trigger('client:sendChatMessage', input.trim());
    setInput('');
    setIsInputOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage();
    } else if (e.key === 'Escape') {
      setIsInputOpen(false);
      setInput('');
    }
  };

  const getMessageColor = (type: Message['type']) => {
    switch (type) {
      case 'ic': return 'text-white';
      case 'ooc': return 'text-gray-400';
      case 'system': return 'text-yellow-400 italic';
    }
  };

  return (
    <div className="absolute bottom-4 left-4 w-[500px] h-80 bg-black/60 backdrop-blur-md rounded-xl border border-white/10 flex flex-col">
      {/* Mensajes */}
      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        {messages.map(msg => (
          <div key={msg.id} className={`text-sm mb-1 ${getMessageColor(msg.type)}`}>
            {msg.sender && <span className="font-semibold">{msg.sender}: </span>}
            {msg.text}
          </div>
        ))}
      </ScrollArea>

      {/* Input */}
      <div className="p-4">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => setIsInputOpen(false)}
          placeholder="Presiona T o / para escribir..."
          className={`w-full px-4 py-3 bg-black/70 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all ${isInputOpen ? 'block' : 'hidden'}`}
        />
      </div>
    </div>
  );
}