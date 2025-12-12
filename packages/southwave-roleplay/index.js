"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./config");
require("./modules/auth");
require("./modules/commands");
require("./modules/events");
require("./PlayerSpawn");
require("./modules/chat");
var map_blips_1 = require("./map-blips"); // Importa tu función de blips
mp.events.add('playerJoin', function (player) {
    player.outputChatBox('¡Bienvenido a Southwave Roleplay!');
});
mp.events.add('playerSpawn', function (player) {
    // Carga blips automáticamente después de spawn (delay para estabilidad)
    setTimeout(function () {
        (0, map_blips_1.createAllBlipsForPlayer)(player);
    }, 1000);
});
mp.events.addCommand('blips', function (player) {
    // Verifica jugador válido (sin 'handle' – usa id !== -1)
    if (!player || player.id === -1)
        return;
    // Limpia blips antiguos
    mp.blips.forEach(function (blip) {
        if (blip.getVariable('southwave_blip') && blip.dimension === player.dimension) {
            blip.destroy();
        }
    });
    (0, map_blips_1.createAllBlipsForPlayer)(player);
    player.outputChatBox('¡Blips recargados!');
});
// Si quieres lógica de proximidad en server (e.g., notificar jugadores cercanos en join)
mp.events.add('playerJoin', function (player) {
    // Usa forEachInRange para jugadores cercanos (server-side válido)
    mp.players.forEachInRange(player.position, 50.0, function (nearPlayer) {
        if (nearPlayer !== player) {
            nearPlayer.outputChatBox("!{#ffaa00}Jugador ".concat(player.name, " se uni\u00F3 cerca tuyo."));
        }
    });
});
console.log('Server-side cargado con TypeScript.');
