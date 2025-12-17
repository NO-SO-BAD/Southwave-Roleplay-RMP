// src/components/GameChat.tsx
import { useState, useEffect, useRef } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { Send } from 'lucide-react';

interface Message {
  id: number;
  sender: string;
  text: string;
  timestamp: string;
  type: 'ic' | 'ooc' | 'system';
}

export function GameChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Escucha mensajes desde client-side
    mp.events.add('cef:addChatMessage', (sender: string, text: string, type: 'ic' | 'ooc' | 'system') => {
      const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setMessages(prev => [...prev, { id: Date.now(), sender, text, timestamp, type }]);
    });

    // ESC cancela input
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isInputFocused) {
        setInput('');
        inputRef.current?.blur();
      }
    };

    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
      mp.events.remove('cef:addChatMessage');
    };
  }, [isInputFocused]);

  useEffect(() => {
    // Auto-scroll al nuevo mensaje
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [messages]);

  const sendMessage = () => {
    if (input.trim() === '') return;

    mp.trigger('client:sendChatMessage', input.trim());
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  const getMessageStyle = (type: Message['type']) => {
    switch (type) {
      case 'ic':
        return 'text-white';
      case 'ooc':
        return 'text-gray-400';
      case 'system':
        return 'text-yellow-400 italic';
    }
  };

  return (
    <div className="absolute bottom-4 left-4 w-96 h-64 bg-black/50 backdrop-blur-md rounded-lg border border-white/10 flex flex-col p-2">
      <ScrollArea className="flex-1 pr-2">
        {messages.map(msg => (
          <div key={msg.id} className="text-sm mb-1 flex gap-1">
            <span className="text-gray-500">[{msg.timestamp}]</span>
            <span className="font-semibold">{msg.sender}:</span>
            <span className={getMessageStyle(msg.type)}>{msg.text}</span>
          </div>
        ))}
      </ScrollArea>

      <div className="mt-2 flex gap-2">
        <Input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
          placeholder="Escribe un mensaje... (Enter para enviar)"
          className="flex-1 bg-black/70 border-white/10 text-white placeholder-gray-500"
        />
        <Button onClick={sendMessage} className="px-3">
          <Send size={16} />
        </Button>
      </div>
    </div>
  );
}