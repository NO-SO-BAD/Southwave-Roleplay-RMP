"use strict";
// QUITA EL IMPORT
mp.events.addCommand('heal', function (player) {
    player.health = 100;
    player.outputChatBox('Vida restaurada');
});
