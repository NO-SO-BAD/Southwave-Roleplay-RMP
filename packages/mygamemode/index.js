"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./config");
require("./modules/auth");
require("./modules/commands");
require("./modules/events");

// Inicialización server
mp.events.add('playerJoin', function (player) {

    player.outputChatBox('¡Bienvenido a MyGamemode!');
});
console.log('Server-side cargado con TypeScript.');
