import './config';
import './modules/auth';
import './modules/commands';
import './modules/events';
// src/server/src/index.ts

import { logger } from '../../../shared/utils/logger';  // 4 niveles arriba: src/server/src → src/shared

mp.events.add('playerJoin', (player: PlayerMp) => {
  logger.info(`Jugador ${player.name} se unió.`);
  player.outputChatBox('¡Bienvenido a MyGamemode!');
});

console.log('Server-side cargado con TypeScript.');