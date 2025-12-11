"use strict";
require('./config');
require('./modules/auth');
require('./modules/commands');
require('./modules/events');
require('./PlayerSpawn');
require('./modules/chat');
//const logger = require('./utils/logger');
mp.events.add('playerJoin', function (player) {
    //logger.info(`Jugador ${player.name} se unió.`);
    player.outputChatBox('¡Bienvenido a Southwave Roleplay!');
});
console.log('Server-side cargado con TypeScript.');
