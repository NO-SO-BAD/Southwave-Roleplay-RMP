// src/server/src/commands/interiors.ts
const MANSION_INTERIORS = {
  'mansion1': {
    name: 'Tongva Estate (Moderna con Piscina)',
    coords: new mp.Vector3(2016.5, 1584.2, 78.6),
  },
  'mansion2': {
    name: 'Richman Villa (Clásica con Jardín)',
    coords: new mp.Vector3(-1280.3, 270.8, 70.1),
  },
  'mansion3': {
    name: 'Vinewood Residence (Hollywoodense con Cine)',
    coords: new mp.Vector3(1352.8, 1142.1, 88.3),
  },
};

mp.events.addCommand('interior', (player: PlayerMp, _, mansionName: string) => {
  if (!player || player.id === -1) return;

  const mansion = MANSION_INTERIORS[mansionName as keyof typeof MANSION_INTERIORS];
  if (!mansion) {
    player.outputChatBox('!{#ff0000}Uso: /interior mansion1 | mansion2 | mansion3');
    return;
  }

  player.position = mansion.coords;
  player.dimension = player.id + 1;  // Privada
  player.heading = 180.0;

  player.outputChatBox(`!{#00ff00}Teleportado a ${mansion.name}`);
  player.outputChatBox('!{#ffaa00}Usa /exit para salir');
});

mp.events.addCommand('exit', (player: PlayerMp) => {
  if (player.dimension === 0) {
    player.outputChatBox('!{#ff0000}Ya estás en el mundo público.');
    return;
  }

  player.position = new mp.Vector3(-1034.6, -2733.6, 13.8);
  player.dimension = 0;
  player.outputChatBox('!{#00ff00}Saliste del interior');
});