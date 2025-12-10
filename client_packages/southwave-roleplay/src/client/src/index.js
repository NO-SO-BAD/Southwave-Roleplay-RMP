"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./config");
require("./modules/hud");
require("./modules/chat");
require("./modules/vehicles");
mp.events.add('render', function () {
    // Render name tags (usa forEachInStreamRange de wiki)
    mp.players.forEachInStreamRange(function (player) {
        if (player !== mp.players.local) {
            // Corrige: usa drawText (wiki: text, [x,y], options)
            mp.game.graphics.drawText("".concat(player.name), [0.5, 0.5], // Posición screen (0-1)
            {
                font: 0, // e.g., ChaletLondon
                color: [255, 255, 255, 255], // RGBA blanco
                scale: [0.5, 0.5], // Tamaño
                outline: true,
            });
        }
    });
});
console.log('Client-side cargado con TypeScript.');
