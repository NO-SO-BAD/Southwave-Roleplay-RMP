import './config';
import './modules/auth';
import './modules/commands';
import './modules/events';
import './PlayerSpawn';  // Si existe
import { logger } from '../../shared/utils/logger';  // FIX: Ruta relativa

mp.events.add('playerJoin', (player: PlayerMp) => {  // FIX: PlayerMp
  logger.info(`Jugador ${player.name} se unió.`);
  player.outputChatBox('¡Bienvenido a Southwave Roleplay!');
});

console.log('Server-side cargado con TypeScript.');