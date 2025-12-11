

const SPAWN_POSITION = new mp.Vector3(-1034.6, -2733.6, 13.8);
const SPAWN_HEADING = 330.0;

mp.events.add("playerJoin", (player) => {
    player.spawn(SPAWN_POSITION);
    player.heading = SPAWN_HEADING;

    // Esto evita que RAGE te mueva al spawn por defecto
    player.dimension = 0;

    // Opcional: dar vida/armor
    player.health = 200;
    player.armour = 100;

    // Avisar al cliente
    player.call("playerReady");
});
