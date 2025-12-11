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
        player.position = SPAWN_POSITION;
        player.heading = SPAWN_HEADING;
        player.armour = 100;
        player.health = 200;
        mp.game.invoke('0xE3AD2BDBAEE269AC', player.handle, 1, 0);
        player.freezePosition(false);
        mp.game.cam.doScreenFadeIn(800);
    }, 600);
}
