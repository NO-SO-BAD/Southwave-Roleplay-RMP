"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./config");
require("./modules/auth");
require("./modules/commands");
require("./modules/events");
// src/server/src/index.ts

// Inicialización server
mp.events.add('playerJoin', function (player) {
    logger_1.logger.info("Jugador ".concat(player.name, " se uni\u00F3."));
    player.outputChatBox('¡Bienvenido a MyGamemode!');
});
console.log('Server-side cargado con TypeScript.');
