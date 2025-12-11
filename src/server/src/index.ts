require('./config');
require('./modules/auth');
require('./modules/commands');
require('./modules/events');
const { logger } = require('./shared/utils/logger');  // Ruta relativa

mp.events.add('playerJoin', (player: PlayerMp) => {
  logger.info(`Jugador ${player.name} se unió.`);
  player.outputChatBox('¡Bienvenido a Southwave Roleplay!');  // outputChatBox solo server
});

console.log('Server-side cargado con TypeScript.');