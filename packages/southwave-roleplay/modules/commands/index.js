"use strict";
// QUITA EL IMPORT
mp.events.addCommand('heal', function (player) {
    player.health = 100;
    player.outputChatBox('Vida restaurada');
});
// src/server/src/modules/commands/index.ts (SERVER-SIDE)
mp.events.addCommand('car', function (player, _, modelName) {
    if (!modelName) {
        player.outputChatBox('!{#ff0000}Uso: /car [nombre del auto]');
        player.outputChatBox('!{#ffaa00}Ejemplo: /car adder, /car sultan, /car police');
        return;
    }
    // Elimina vehículo anterior
    if (player.vehicle) {
        player.vehicle.destroy();
    }
    var modelHash = mp.joaat(modelName.toLowerCase());
    var pos = player.position;
    var vehicle = mp.vehicles.new(modelHash, new mp.Vector3(pos.x + 2, pos.y, pos.z), {
        heading: player.heading,
        dimension: player.dimension,
        numberPlate: 'SW' + player.id,
        engine: true
    });
    if (vehicle) {
        player.putIntoVehicle(vehicle, -1); // Conductor
        player.outputChatBox("!{#00ff00}Spawneado: ".concat(modelName));
    }
    else {
        player.outputChatBox("!{#ff0000}No se encontr\u00F3 el veh\u00EDculo \"".concat(modelName, "\""));
    }
});
