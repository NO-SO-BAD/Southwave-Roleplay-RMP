"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./config");
require("./modules/hud");
require("./modules/chat");
require("./modules/vehicles");
require("./player");
mp.events.add('render', function () {
    mp.players.forEachInStreamRange(function (player) {
        if (player !== mp.players.local) {
            // Bone cabeza para posición precisa (mejor estabilidad)
            var headBone = 12844; // SKEL_Head
            var headPos = player.getBoneCoords(headBone, 0, 0, 0);
            // FIX: Un solo argumento: mp.Vector3(worldX, worldY, worldZ)
            var screenPos = mp.game.graphics.world3dToScreen2d(new mp.Vector3(headPos.x, headPos.y, headPos.z + 0.2) // +0.2 para arriba de la cabeza
            );
            if (screenPos) { // Retorna { x: number, y: number } o undefined
                mp.game.graphics.drawText(player.name, // Text
                [screenPos.x, screenPos.y], // Position [x, y] array
                {
                    font: 4, // Font legible (prueba 0-7)
                    color: [255, 255, 255, 255], // Blanco full alpha
                    scale: [0.4, 0.4], // Tamaño pequeño
                    outline: true,
                    centre: true // Centrado
                });
            }
        }
    });
});
console.log('Client-side cargado con TypeScript.');
