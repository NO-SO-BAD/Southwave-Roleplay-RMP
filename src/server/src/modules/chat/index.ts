// src/server/src/modules/chat/index.ts
const CHAT_RANGE = 20.0; // Rango normal
const ME_DO_RANGE = 20.0;


// src/server/src/modules/chat/index.ts
mp.events.add('playerChat', (player: PlayerMp, message: string) => {
  message = message.trim();
  if (message.length === 0) return;

  if (message.startsWith('/')) {
    console.log(`[Comando] ${player.name}: ${message}`);
    return;
  }

  // Mensaje IC normal
  mp.players.broadcast(`!{#FFFFFF}${player.name} dice: ${message}`);
  console.log(`[Chat IC] ${player.name}: ${message}`);
});

// Comando /ooc
mp.events.addCommand('ooc', (player: PlayerMp, _, fullMessage: string) => {
  if (!fullMessage || fullMessage.trim() === '') {
    player.outputChatBox('!{#ff0000}Uso: /ooc [mensaje]');
    return;
  }

  const message = fullMessage.trim();
  mp.players.broadcast(`!{#AAAAAA}(( OOC | ${player.name}: ${message} ))`);
  console.log(`[OOC] ${player.name}: ${message}`);
});

// Bienvenida
mp.events.add('playerJoin', (player: PlayerMp) => {
  player.outputChatBox('!{#00ffaa}Bienvenido a Southwave Roleplay');
  player.outputChatBox('!{#00ff00}Chat IC normal – /ooc para out-of-character');
});