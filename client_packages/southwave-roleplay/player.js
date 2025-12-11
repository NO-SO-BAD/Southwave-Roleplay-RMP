"use strict";
// src/client/src/player.ts
var SPAWN_POSITION = new mp.Vector3(-1034.6, -2733.6, 13.8);
var SPAWN_HEADING = 330.0;
mp.events.add("playerReady", function () {
    spawnPlayer();
});
function spawnPlayer() {
    var player = mp.players.local; // FIX: local en client
    mp.game.cam.doScreenFadeOut(500);
    setTimeout(function () {
        player.freezePosition(true);
        player.position = SPAWN_POSITION; // FIX: position en client (no setCoords)
        player.heading = SPAWN_HEADING; // FIX: heading en client
        player.armour = 100; // FIX: armour en client
        player.health = 200; // FIX: health en client
        mp.game.invoke('0xE3AD2BDBAEE269AC', player.handle, 1, 0); // FIX: SET_POLICE_IGNORE_PLAYER (native para ignore police)
        player.freezePosition(false);
        mp.game.cam.doScreenFadeIn(800);
    }, 600);
}
