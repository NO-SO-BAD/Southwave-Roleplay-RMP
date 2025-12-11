
mp.events.add('playerDeath', (player: PlayerMp, reason: string, killer: PlayerMp) => {  // FIX: PlayerMp
  player.outputChatBox(`Has muerto. Razón: ${reason}`);
});