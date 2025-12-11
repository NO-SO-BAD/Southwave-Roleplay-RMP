"use strict";
require('./config');
require('./modules/auth');
require('./modules/commands');
require('./modules/events');
var logger = require('./shared/utils/logger').logger; // Ruta relativa
mp.events.add('playerJoin', function (player) {
    logger.info("Jugador ".concat(player.name, " se uni\u00F3."));
    player.outputChatBox('¡Bienvenido a Southwave Roleplay!'); // outputChatBox solo server
});
console.log('Server-side cargado con TypeScript.');
