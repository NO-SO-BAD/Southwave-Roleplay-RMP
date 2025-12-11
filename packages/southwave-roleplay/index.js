"use strict";
require('./config');
require('./modules/auth');
require('./modules/commands');
require('./modules/events');
require('./PlayerSpawn');
var logger = require('./utils/logger');
mp.events.add('playerJoin', function (player) {
    logger.info("Jugador ".concat(player.name, " se uni\u00F3."));
    player.outputChatBox('¡Bienvenido a Southwave Roleplay!');
});
console.log('Server-side cargado con TypeScript.');
