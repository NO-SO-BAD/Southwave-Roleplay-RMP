// QUITA EL IMPORT

mp.events.addCommand('heal', (player: PlayerMp) => {  // PlayerMp ya está disponible globalmente
  player.health = 100;
  player.outputChatBox('Vida restaurada');
});


