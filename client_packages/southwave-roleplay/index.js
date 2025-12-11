"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./modules/hud/index");
require("./modules/chat/index");
require("./modules/vehicles/index");
require("./player");
require("./discord");
require("./config/index");
mp.events.add('render', function () {
    mp.players.forEachInStreamRange(function (player) {
        if (player !== mp.players.local) {
            var headPos = player.getBoneCoords(12844, 0, 0, 0);
            var screenPos = mp.game.graphics.world3dToScreen2d(new mp.Vector3(headPos.x, headPos.y, headPos.z + 0.2) // +0.2 para arriba de la cabeza
            );
            if (screenPos) {
                mp.game.graphics.drawText(player.name, [screenPos.x, screenPos.y], {
                    font: 4,
                    color: [255, 255, 255, 255],
                    scale: [0.4, 0.4],
                    outline: true,
                    centre: true
                });
            }
        }
    });
});
console.log('Client-side cargado con TypeScript.');
