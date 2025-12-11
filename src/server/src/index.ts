import './config';
import './modules/auth';
import './modules/commands';
import './modules/events';

import "./PlayerSpawn";
// src/server/src/index.ts



mp.events.add('playerJoin', (player: PlayerMp) => {

  player.outputChatBox('¡Bienvenido a MyGamemode!');
});

console.log('Server-side cargado con TypeScript.');