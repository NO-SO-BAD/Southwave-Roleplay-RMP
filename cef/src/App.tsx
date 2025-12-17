// src/App.tsx
import { useState, useEffect } from 'react';
import { HUD } from './components/HUD';
import { MainMenu } from './components/MainMenu';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [playerStats, setPlayerStats] = useState({
    health: 100,
    armor: 0,
    thirst: 100,
    hunger: 100,
  });

  useEffect(() => {
    // Expone funciones para client-side
    (window as any).ui = {
      mainMenu: {
        show: () => setIsMenuOpen(true),
        hide: () => setIsMenuOpen(false),
        toggle: () => setIsMenuOpen(prev => !prev),
      },
      // Expone función para actualizar HUD
      updateStats: (stats: any) => {
        setPlayerStats(stats);
      },
    };

    return () => {
      delete (window as any).ui;
    };
  }, []);

  
return (
    <div className="w-full h-screen bg-transparent overflow-hidden relative">
      {/* Fondo sutil para ver GTA detrás */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-black/40 pointer-events-none" />

      {/* HUD siempre visible */}
      <HUD stats={playerStats} />

      {/* Main Menu */}
      <MainMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {/* Hint tecla M */}
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