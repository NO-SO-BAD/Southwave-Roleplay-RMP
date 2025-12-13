mp.events.add('playerSpawn', function () {
    mp.gui.chat.push('!{#00ff00}[Southwave RP] Cliente cargado 100%');
    mp.gui.chat.push('!{#ffaa00}Name tags activados – Versión FINAL 2025');
});
mp.events.add('render', function () {
    mp.players.forEachInStreamRange(function (player) {
        if (!player || player.handle === 0 || player === mp.players.local)
            return;
        var headPos = player.getBoneCoords(12844, 0, 0, 0);
        var screen = mp.game.graphics.world3dToScreen2d(new mp.Vector3(headPos.x, headPos.y, headPos.z + 0.22));
        if (screen) {
            mp.game.graphics.drawText(player.name, [screen.x, screen.y], {
                font: 4,
                color: [255, 255, 255, 255],
                scale: [0.38, 0.38],
                outline: true,
                centre: true
            });
        }
    });
});
var INTERIOR_IPLS = [
    'apa_v_mp_h_01_a', 'apa_v_mp_h_01_b', 'apa_v_mp_h_01_c',
    'apa_v_mp_h_02_a', 'apa_v_mp_h_02_b', 'apa_v_mp_h_02_c',
    'apa_v_mp_h_03_a', 'apa_v_mp_h_03_b', 'apa_v_mp_h_03_c',
    'apa_v_mp_h_04_a', 'apa_v_mp_h_04_b', 'apa_v_mp_h_04_c',
    'apa_v_mp_h_08_a', 'apa_v_mp_h_08_b', 'apa_v_mp_h_08_c',
    'dlc_mansions_tongva_estate',
    'dlc_mansions_richman_villa',
    'dlc_mansions_vinewood_residence'
];
mp.events.add('playerReady', function () {
    INTERIOR_IPLS.forEach(function (ipl) {
        mp.game.streaming.requestIpl(ipl);
    });
    console.log('[Cliente] Interiores cargados: Eclipse Tower + Mansiones 2025');
});
mp.events.add('playerReady', function () {
    mp.discord.update('Southwave Roleplay – Development Pre-Alpha', "Steve Swarek | ID: ".concat(mp.players.local.id, " | Jugadores: ").concat(mp.players.length, "/100"));
    console.log('[Discord] Rich Presence activado');
});
setInterval(function () {
    if (mp.players.local) {
        mp.discord.update('Southwave Roleplay – En desarrollo', "Steve Swarek | ID: ".concat(mp.players.local.id, " | Online: ").concat(mp.players.length));
    }
}, 15000);
