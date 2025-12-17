"use strict";
// src/server/src/modules/chat/index.ts
var CHAT_RANGE = 20.0; // Rango normal
var ME_DO_RANGE = 20.0;
// src/server/src/modules/chat/index.ts
mp.events.add('playerChat', function (player, message) {
    message = message.trim();
    if (message.length === 0)
        return;
    if (message.startsWith('/')) {
        console.log("[Comando] ".concat(player.name, ": ").concat(message));
        return;
    }
    // Mensaje IC normal
    mp.players.broadcast("!{#FFFFFF}".concat(player.name, " dice: ").concat(message));
    console.log("[Chat IC] ".concat(player.name, ": ").concat(message));
});
// Comando /ooc
mp.events.addCommand('ooc', function (player, _, fullMessage) {
    if (!fullMessage || fullMessage.trim() === '') {
        player.outputChatBox('!{#ff0000}Uso: /ooc [mensaje]');
        return;
    }
    var message = fullMessage.trim();
    mp.players.broadcast("!{#AAAAAA}(( OOC | ".concat(player.name, ": ").concat(message, " ))"));
    console.log("[OOC] ".concat(player.name, ": ").concat(message));
});
// Bienvenida
mp.events.add('playerJoin', function (player) {
    player.outputChatBox('!{#00ffaa}Bienvenido a Southwave Roleplay');
    player.outputChatBox('!{#00ff00}Chat IC normal – /ooc para out-of-character');
});
