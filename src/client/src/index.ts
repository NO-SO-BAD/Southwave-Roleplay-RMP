import './config';
import './modules/hud';
import './modules/chat';
import './modules/vehicles';
import './player'


mp.events.add('render', () => {
  // Render name tags (usa forEachInStreamRange de wiki)
  mp.players.forEachInStreamRange((player: PlayerMp) => {  // Tipo explícito
    if (player !== mp.players.local) {
      // Corrige: usa drawText (wiki: text, [x,y], options)
      mp.game.graphics.drawText(
        `${player.name}`,
        [0.5, 0.5],  // Posición screen (0-1)
        {
          font: 0,  // e.g., ChaletLondon
          color: [255, 255, 255, 255],  // RGBA blanco
          scale: [0.5, 0.5],  // Tamaño
          outline: true,
        }
      );
    }
  });
});

console.log('Client-side cargado con TypeScript.');