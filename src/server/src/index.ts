import './config';
import './modules/auth';
import './modules/commands';
import './modules/events';
import './PlayerSpawn';
import './modules/chat';
import { createAllBlipsForPlayer } from './map-blips';  // Importa tu función de blips

mp.events.add('playerJoin', (player: PlayerMp) => {
  player.outputChatBox('¡Bienvenido a Southwave Roleplay!');
});

mp.events.add('playerSpawn', (player: PlayerMp) => {
  // Carga blips automáticamente después de spawn (delay para estabilidad)
  setTimeout(() => {
    createAllBlipsForPlayer(player);
  }, 1000);
});

mp.events.addCommand('blips', (player: PlayerMp) => {
  // Verifica jugador válido (sin 'handle' – usa id !== -1)
  if (!player || player.id === -1) return;

  // Limpia blips antiguos
  mp.blips.forEach((blip) => {
    if (blip.getVariable('southwave_blip') && blip.dimension === player.dimension) {
      blip.destroy();
    }
  });

  createAllBlipsForPlayer(player);
  player.outputChatBox('¡Blips recargados!');
});

// Si quieres lógica de proximidad en server (e.g., notificar jugadores cercanos en join)
mp.events.add('playerJoin', (player: PlayerMp) => {
  // Usa forEachInRange para jugadores cercanos (server-side válido)
  mp.players.forEachInRange(player.position, 50.0, (nearPlayer: PlayerMp) => {
    if (nearPlayer !== player) {
      nearPlayer.outputChatBox(`!{#ffaa00}Jugador ${player.name} se unió cerca tuyo.`);
    }
  });
});

console.log('Server-side cargado con TypeScript.');