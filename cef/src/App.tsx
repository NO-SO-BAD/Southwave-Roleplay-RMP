import { useState, useEffect } from 'react';
import { HUD } from './components/HUD';
import { MainMenu } from './components/MainMenu';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [playerStats, setPlayerStats] = useState({
    health: 85,
    armor: 60,
    thirst: 45,
    hunger: 70,
  });

useEffect(() => {
  const handler = (show: boolean) => {
    setIsMenuOpen(show);
  };

  mp.events.add('cef:showMainMenu', handler);

  return () => {
    mp.events.remove('cef:showMainMenu', handler);
  };
}, []);

  return (
    <div className="w-full h-screen bg-transparent overflow-hidden relative">
      {/* Fondo semi-transparente para ver GTA detrás */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-transparent to-black/50 pointer-events-none" />

      {/* HUD siempre visible */}
      <HUD stats={playerStats} />

      {/* Menú principal */}
      <MainMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {/* Indicador de tecla M */}
      {!isMenuOpen && (
        <div className="absolute bottom-8 right-8 text-white/70 text-sm flex items-center gap-3 pointer-events-none select-none">
          <kbd className="px-4 py-2 bg-black/70 backdrop-blur-md border border-white/20 rounded-lg text-white font-semibold">
            M
          </kbd>
          <span className="drop-shadow-2xl">Abrir menú</span>
        </div>
      )}
    </div>
  );
}