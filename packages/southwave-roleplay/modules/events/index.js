"use strict";
mp.events.add('playerDeath', function (player, reason, killer) {
    player.outputChatBox("Has muerto. Raz\u00F3n: ".concat(reason));
});
