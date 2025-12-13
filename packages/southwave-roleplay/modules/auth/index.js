"use strict";
// QUITA: import type { Player } from '@ragempcommunity/types-server';  // FIX: Global, no import
mp.events.add('playerReady', function (player) {
    player.outputChatBox('Autenticándote...');
});
