// src/server/src/commands/interiors.ts
const INTERIORS = {
  // MANSIONES DEC 2025
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

  // ECLIPSE TOWER APARTMENTS (High-End + Penthouses)
  'eclipse1': {
    name: 'Eclipse Penthouse Suite 1',
    coords: new mp.Vector3(-785.2, 323.7, 217.6),  // Piso alto, vista oeste
  },
  'eclipse2': {
    name: 'Eclipse Penthouse Suite 2',
    coords: new mp.Vector3(-786.9, 315.6, 217.6),  // Vista norte
  },
  'eclipse3': {
    name: 'Eclipse Penthouse Suite 3 (Mejor Vista Ciudad)',
    coords: new mp.Vector3(-773.4, 341.8, 211.4),  // Vista sur directa a LS (más popular)
  },
  'eclipse_modern': {
    name: 'Eclipse Modern Apartment (Alta)',
    coords: new mp.Vector3(-774.0, 342.0, 196.7),  // Modern 3
  },
  'eclipse_moody': {
    name: 'Eclipse Moody Apartment',
    coords: new mp.Vector3(-774.1, 342.0, 196.7),  // Moody 3
  },
  'eclipse_sharp': {
    name: 'Eclipse Sharp Apartment',
    coords: new mp.Vector3(-773.9, 342.2, 196.7),  // Sharp 3
  },
};

mp.events.addCommand('interior', (player: PlayerMp, _, interiorName: string) => {
  if (!player || player.id === -1) return;

  const interior = INTERIORS[interiorName as keyof typeof INTERIORS];
  if (!interior) {
    player.outputChatBox('!{#ff0000}Uso: /interior [nombre]');
    player.outputChatBox('!{#ffaa00}Opciones: mansion1-3 | eclipse1-3 | eclipse_modern | eclipse_moody | eclipse_sharp');
    return;
  }

  player.position = interior.coords;
  player.dimension = player.id + 1;  // Privada por jugador
  player.heading = 180.0;

  player.outputChatBox(`!{#00ff00}Teleportado a ${interior.name}`);
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