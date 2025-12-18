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
    'mp_2025_02__g9ec',
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
    updateDiscordPresence();
});
mp.events.add('playerQuit', updateDiscordPresence);
function updateDiscordPresence() {
    var onlineCount = mp.players.length;
    mp.discord.update('Southwave Roleplay – Development Pre-Alpha', "ID: ".concat(mp.players.local.id, " | Online: ").concat(onlineCount, "/100"));
}
setInterval(updateDiscordPresence, 15000);
console.log('[Discord] Rich Presence cargado – per-player con online total');
mp.events.add("playerCommand", function (command) {
    var _a;
    var args = command.split(" ");
    var cmd = (_a = args.shift()) === null || _a === void 0 ? void 0 : _a.toLowerCase();
    if (cmd === "sound") {
        var soundName = args[0];
        var soundSet = args[1] || "HUD_FRONTEND_DEFAULT_SOUNDSET";
        if (!soundName) {
            mp.gui.chat.push("!{#ffcc00}Uso: /sound <SONIDO> [SOUNDSET]");
            mp.gui.chat.push("!{#aaaaaa}Ej: /sound CLICK HUD_FRONTEND_DEFAULT_SOUNDSET");
            return;
        }
        mp.game.audio.playSoundFrontend(-1, soundName, soundSet, true);
        mp.gui.chat.push("!{#44ff44}Sonido: ".concat(soundName, " | Set: ").concat(soundSet));
    }
});
var isMenuOpen = false;
mp.events.add('playerReady', function () {
    console.log('[Client] playerReady – cargando CEF');
    mp.gui.cursor.show(false, false);
    mp.gui.chat.show(false);
    mp.gui.execute("location.href = 'package://cef/index.html';");
    var hideMenu = function () {
        mp.gui.execute('if (window.ui && window.ui.mainMenu) { window.ui.mainMenu.hide(); console.log("[Client] Menú oculto"); }');
    };
    setTimeout(hideMenu, 3000);
    setTimeout(hideMenu, 6000);
    setTimeout(hideMenu, 10000);
});
mp.keys.bind(0x4D, true, function () {
    isMenuOpen = !isMenuOpen;
    mp.gui.cursor.show(isMenuOpen, isMenuOpen);
    console.log("[Client] M presionado \u2013 men\u00FA ".concat(isMenuOpen ? 'abierto' : 'cerrado'));
    mp.gui.execute("if (window.ui && window.ui.mainMenu) window.ui.mainMenu.".concat(isMenuOpen ? 'show' : 'hide', "()"));
});
mp.keys.bind(0x1B, true, function () {
    if (isMenuOpen) {
        isMenuOpen = false;
        mp.gui.cursor.show(false, false);
        mp.gui.execute('if (window.ui && window.ui.mainMenu) window.ui.mainMenu.hide()');
    }
});
function updateHUD() {
    if (mp.players.local) {
        var stats = {
            health: Math.round(mp.players.local.getHealth()),
            armor: Math.round(mp.players.local.getArmour()),
            thirst: 100,
            hunger: 100,
        };
        mp.gui.execute("if (window.ui && window.ui.updateStats) window.ui.updateStats(".concat(JSON.stringify(stats), ")"));
    }
}
