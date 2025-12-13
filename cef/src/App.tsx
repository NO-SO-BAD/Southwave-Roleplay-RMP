import { useState, useEffect } from 'react';
import { HUD } from './components/HUD';
import { MainMenu } from './components/MainMenu';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [playerStats, setPlayerStats] = useState({
    health: 85,
    armor: 60,
    thirst: 45,
    hunger: 70
  });

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'm') {
        setIsMenuOpen(prev => !prev);
      }
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isMenuOpen]);

  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Background simulando vista del juego */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1511882150382-421056c481d6?w=1920')] bg-cover bg-center" />
      </div>

      {/* HUD siempre visible */}
      <HUD stats={playerStats} />

      {/* Menú principal */}
      <MainMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {/* Indicador de tecla */}
      {!isMenuOpen && (
        <div className="absolute bottom-8 right-8 text-white/60 text-sm flex items-center gap-2">
          <kbd className="px-3 py-1.5 bg-black/40 backdrop-blur-sm border border-white/20 rounded">M</kbd>
          <span>Abrir menú</span>
        </div>
      )}
    </div>
  );
}
