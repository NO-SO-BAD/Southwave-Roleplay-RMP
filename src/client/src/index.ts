import './player';
import './discord';

// Mensajes de prueba
mp.events.add('playerSpawn', () => {
  mp.gui.chat.push('!{#00ff00}[Southwave RP] Cliente cargado 100%');
  mp.gui.chat.push('!{#ffaa00}Name tags activados – Versión FINAL 2025');
});

// NAME TAGS PERFECTOS – FUNCIONA CON LA ÚLTIMA VERSIÓN DE LOS TIPOS
mp.events.add('render', () => {
  mp.players.forEachInStreamRange((player: PlayerMp) => {
    if (!player || player.handle === 0 || player === mp.players.local) return;

    // Posición exacta encima de la cabeza
    const headPos = player.getBoneCoords(12844, 0, 0, 0);

    // API CORRECTA: pasa un Vector3 real
    const screen = mp.game.graphics.world3dToScreen2d(
      new mp.Vector3(headPos.x, headPos.y, headPos.z + 0.22)
    );

    if (screen) {
      // API CORRECTA: 3 argumentos normales (texto, posición array, options)
      mp.game.graphics.drawText(
        player.name,
        [screen.x, screen.y],
        {
          font: 4,
          color: [255, 255, 255, 255],
          scale: [0.38, 0.38],
          outline: true,
          centre: true
        }
      );
    }
  });
});