// QUITA EL IMPORT

mp.events.addCommand('heal', (player: PlayerMp) => {  // PlayerMp ya está disponible globalmente
  player.health = 100;
  player.outputChatBox('Vida restaurada');
});


// src/server/src/modules/commands/index.ts (SERVER-SIDE)
mp.events.addCommand('car', (player: PlayerMp, _, modelName: string) => {
  if (!modelName) {
    player.outputChatBox('!{#ff0000}Uso: /car [nombre del auto]');
    player.outputChatBox('!{#ffaa00}Ejemplo: /car adder, /car sultan, /car police');
    return;
  }

  // Elimina vehículo anterior
  if (player.vehicle) {
    player.vehicle.destroy();
  }

  const modelHash = mp.joaat(modelName.toLowerCase());

  const pos = player.position;
  const vehicle = mp.vehicles.new(modelHash, new mp.Vector3(pos.x + 2, pos.y, pos.z), {
    heading: player.heading,
    dimension: player.dimension,
    numberPlate: 'SW' + player.id,
    engine: true
  });

  if (vehicle) {
    player.putIntoVehicle(vehicle, -1);  // Conductor
    player.outputChatBox(`!{#00ff00}Spawneado: ${modelName}`);
  } else {
    player.outputChatBox(`!{#ff0000}No se encontró el vehículo "${modelName}"`);
  }
});