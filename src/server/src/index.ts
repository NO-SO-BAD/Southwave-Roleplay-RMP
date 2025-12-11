import './config';
import './modules/auth';
import './modules/commands';
import './modules/events';
import { logger } from '../shared/utils/logger';  // Ruta relativa desde src/server/src

mp.events.add('playerJoin', (player: PlayerMp) => {
  logger.info(`Jugador ${player.name} se unió.`);
  player.outputChatBox('¡Bienvenido a Southwave Roleplay!');
});

console.log('Server-side cargado con TypeScript.');