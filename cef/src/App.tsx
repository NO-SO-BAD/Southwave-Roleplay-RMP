// src/App.tsx
import { useState, useEffect } from 'react';
import { HUD } from './components/HUD';
import { MainMenu } from './components/MainMenu';
import { GameChat } from './components/Chat';  // Chat custom

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [playerStats, setPlayerStats] = useState({
    health: 100,
    armor: 0,
    thirst: 100,
    hunger: 100,
  });

  useEffect(() => {
    console.log('[CEF] App.tsx montado – exponiendo window.ui');

    // Expone funciones
    (window as any).ui = {
      mainMenu: {
        show: () => {
          console.log('[CEF] mainMenu.show() recibido');
          setIsMenuOpen(true);
        },
        hide: () => {
          console.log('[CEF] mainMenu.hide() recibido');
          setIsMenuOpen(false);
        },
        toggle: () => {
          console.log('[CEF] mainMenu.toggle() recibido');
          setIsMenuOpen(prev => !prev);
        },
      },
      updateStats: (stats: any) => {
        console.log('[CEF] updateStats recibido', stats);
        setPlayerStats(stats);
      },
      addChatMessage: (sender: string, text: string, type: 'ic' | 'ooc' | 'system') => {
        console.log('[CEF] addChatMessage recibido', sender, text, type);
        // Tu lógica de chat aquí
      },
    };

    // Fallback si client-side llama antes
    window.dispatchEvent(new Event('uiReady'));

    return () => {
      delete (window as any).ui;
    };
  }, []);

  return (
    <div className="w-full h-screen bg-transparent overflow-hidden relative">
      {/* Fondo */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-black/40 pointer-events-none" />

      {/* HUD */}
      <HUD stats={playerStats} />

      {/* Chat Custom */}
      <GameChat />

      {/* Main Menu */}
      <MainMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {/* Hint M */}
      {!isMenuOpen && (
        <div className="absolute bottom-8 right-8 text-white/70 text-sm flex items-center gap-3 pointer-events-none select-none">
          <kbd className="px-4 py-2 bg-black/70 backdrop-blur-md border border-white/20 rounded-lg text-white font-semibold">
            M
          </kbd>
          <span>Abrir menú</span>
        </div>
      )}
    </div>
  );
}