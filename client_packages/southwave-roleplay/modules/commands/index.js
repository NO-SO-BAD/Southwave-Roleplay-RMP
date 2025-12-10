"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
mp.events.addCommand('heal', function (player) {
    player.health = 100;
    player.outputChatBox('¡HP restaurado!');
});
