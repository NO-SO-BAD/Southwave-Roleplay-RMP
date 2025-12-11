// QUITA: import type { Player } from '@ragempcommunity/types-server';  // FIX: Global, no import

mp.events.add('playerReady', (player: PlayerMp) => {  // FIX: PlayerMp
  player.outputChatBox('Autenticándote...');
});