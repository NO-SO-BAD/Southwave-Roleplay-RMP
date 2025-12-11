"use strict";
// client/player.ts
var SPAWN_POSITION = new mp.Vector3(-1034.6, -2733.6, 13.8);
var SPAWN_HEADING = 330.0;
mp.events.add("playerReady", function () {
    spawnPlayer();
});
function spawnPlayer() {
    var player = mp.players.local;
    mp.game.cam.doScreenFadeOut(500);
    setTimeout(function () {
        player.freezePosition(true);
        player.setCoords(SPAWN_POSITION.x, SPAWN_POSITION.y, SPAWN_POSITION.z, false, false, false, false);
        player.setHeading(SPAWN_HEADING);
        player.setMaxArmour(100);
        player.setArmour(100);
        player.setHealth(200);
        mp.game.player.setPoliceIgnore(true);
        player.freezePosition(false);
        mp.game.cam.doScreenFadeIn(800);
    }, 600);
}
