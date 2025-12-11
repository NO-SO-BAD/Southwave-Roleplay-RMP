require('./config');
require('./modules/auth');
require('./modules/commands');
require('./modules/events');

const { logger } = require('./shared/utils/logger');  // FIX: Ruta relativa desde src/server/src → ./shared/utils/logger

mp.events.add('playerJoin', (player: PlayerMp) => {
  logger.info(`Jugador ${player.name} se unió.`);
  player.outputChatBox('¡Bienvenido a Southwave Roleplay!');
});

console.log('Server-side cargado con TypeScript.');