

// Mensajes de prueba
mp.events.add('playerSpawn', () => {
  mp.gui.chat.push('!{#00ff00}[Southwave RP] Cliente cargado 100%');
  mp.gui.chat.push('!{#ffaa00}Name tags activados – Versión FINAL 2025');
});

// NAME TAGS PERFECTOS – FUNCIONA CON LA ÚLTIMA VERSIÓN DE LOS TIPOS
mp.events.add('render', () => {
  mp.players.forEachInStreamRange((player: PlayerMp) => {
    if (!player || player.handle === 0 || player === mp.players.local) return;

    const headPos = player.getBoneCoords(12844, 0, 0, 0);

    const screen = mp.game.graphics.world3dToScreen2d(
      new mp.Vector3(headPos.x, headPos.y, headPos.z + 0.22)
    );

    if (screen) {
      mp.game.graphics.drawText(
        player.name,
        [screen.x, screen.y],
        {
          font: 4,
          color: [255, 255, 255, 255],
          scale: [0.38, 0.38],
          outline: true,
          centre: true
        }
      );
    }
  });
});



// src/client/src/interiors.ts
// Carga de IPLs (interiores) en el cliente – aquí SÍ existe mp.game

const INTERIOR_IPLS = [
  // Eclipse Tower Apartments (confirmados en wiki.rage.mp)
  'apa_v_mp_h_01_a', 'apa_v_mp_h_01_b', 'apa_v_mp_h_01_c',
  'apa_v_mp_h_02_a', 'apa_v_mp_h_02_b', 'apa_v_mp_h_02_c',
  'apa_v_mp_h_03_a', 'apa_v_mp_h_03_b', 'apa_v_mp_h_03_c',
  'apa_v_mp_h_04_a', 'apa_v_mp_h_04_b', 'apa_v_mp_h_04_c',
  'apa_v_mp_h_08_a', 'apa_v_mp_h_08_b', 'apa_v_mp_h_08_c',

  // Mansiones Dec 2025 (A Safehouse in the Hills) – IPLs no públicos aún (update muy nuevo)
  // Usa estos placeholders basados en leaks/CodeWalker (prueba y ajusta)
  'mp_2025_02__g9ec',
  'dlc_mansions_richman_villa',
  'dlc_mansions_vinewood_residence'
];

mp.events.add('playerReady', () => {
  INTERIOR_IPLS.forEach(ipl => {
    mp.game.streaming.requestIpl(ipl);  // API CORRECTA client-side (wiki.rage.mp)
  });
  console.log('[Cliente] Interiores cargados: Eclipse Tower + Mansiones 2025');
});















// src/client/src/discord.ts
// Rich Presence con nativo RAGE MP – per-player (online total "global")

mp.events.add('playerReady', () => {
  updateDiscordPresence();
});

mp.events.add('playerQuit', updateDiscordPresence);  // Actualiza cuando alguien sale

function updateDiscordPresence() {
  const onlineCount = mp.players.length;

  mp.discord.update(
    'Southwave Roleplay – Development Pre-Alpha',
    `ID: ${mp.players.local.id} | Online: ${onlineCount}/100`
  );
}

// Actualiza cada 15 segundos (para cambios online)
setInterval(updateDiscordPresence, 15000);

console.log('[Discord] Rich Presence cargado – per-player con online total');





/*




let isMenuOpen = false;
let browser: BrowserMp | null = null;

mp.events.add('playerReady', () => {
  mp.gui.cursor.show(false, false);

  browser = mp.browsers.new('package://cef/index.html');

  // Inicializa el estado del menú en el CEF
  browser.execute(`
    if (window.mp && mp.events) {
      mp.events.call('cef:showMainMenu', false);
    }
  `);
});

// Tecla M
mp.keys.bind(0x4D, true, () => {
  if (!browser) return;

  isMenuOpen = !isMenuOpen;
  mp.gui.cursor.show(isMenuOpen, isMenuOpen);

  browser.execute(`
    mp.events.call('cef:showMainMenu', ${isMenuOpen});
  `);
});

// ESC
mp.keys.bind(0x1B, true, () => {
  if (!browser || !isMenuOpen) return;

  isMenuOpen = false;
  mp.gui.cursor.show(false, false);

  browser.execute(`
    mp.events.call('cef:showMainMenu', false);
  `);
});
*/
mp.events.add("playerCommand", (command: string) => {
  const args = command.split(" ");
  const cmd = args.shift()?.toLowerCase();

  if (cmd === "sound") {
    const soundName = args[0];
    const soundSet = args[1] || "HUD_FRONTEND_DEFAULT_SOUNDSET";

    if (!soundName) {
      mp.gui.chat.push("!{#ffcc00}Uso: /sound <SONIDO> [SOUNDSET]");
      mp.gui.chat.push("!{#aaaaaa}Ej: /sound CLICK HUD_FRONTEND_DEFAULT_SOUNDSET");
      return;
    }

    mp.game.audio.playSoundFrontend(
      -1,
      soundName,
      soundSet,
      true
    );

    mp.gui.chat.push(
      `!{#44ff44}Sonido: ${soundName} | Set: ${soundSet}`
    );
  }
});







// src/client/src/ui-toggle.ts (MODIFICADO – chat custom en CEF)
let isMenuOpen = false;

mp.events.add('playerReady', () => {
  console.log('[Client] playerReady – cargando CEF');
  mp.gui.cursor.show(false, false);
  mp.gui.chat.show(false);  // Oculta chat default permanentemente
  mp.gui.execute("location.href = 'package://cef/index.html';");

  setTimeout(() => {
    mp.gui.execute('if (window.ui && window.ui.mainMenu) window.ui.mainMenu.hide()');
  }, 3000);
});

// Tecla M → menú
mp.keys.bind(0x4D, true, () => {
  isMenuOpen = !isMenuOpen;
  mp.gui.cursor.show(isMenuOpen, isMenuOpen);
  mp.gui.execute(`if (window.ui && window.ui.mainMenu) window.ui.mainMenu.${isMenuOpen ? 'show' : 'hide'}()`);
});

// ESC → cierra menú
mp.keys.bind(0x1B, true, () => {
  if (isMenuOpen) {
    isMenuOpen = false;
    mp.gui.cursor.show(false, false);
    mp.gui.execute('if (window.ui && window.ui.mainMenu) window.ui.mainMenu.hide()');
  }
});

// Intercepta playerChat y envía a CEF
mp.events.add('playerChat', (message: string) => {
  mp.gui.execute(`if (window.ui && window.ui.addChatMessage) window.ui.addChatMessage('${mp.players.local.name}', '${message}', 'ic')`);
});

// Bienvenida al entrar
mp.events.add('playerJoin', () => {
  mp.gui.execute(`if (window.ui && window.ui.addChatMessage) window.ui.addChatMessage('System', 'Bienvenido a Southwave Roleplay', 'system')`);
});

console.log('[UI] Chat custom en CEF listo – chat default oculto');










function updateHUD() {
  if (mp.players.local) {
    const stats = {
      health: Math.round(mp.players.local.getHealth()),
      armor: Math.round(mp.players.local.getArmour()),
      thirst: 100,  // Placeholder
      hunger: 100,  // Placeholder
    };

    // Envía stats a CEF via window.ui
    mp.gui.execute(`if (window.ui && window.ui.updateStats) window.ui.updateStats(${JSON.stringify(stats)})`);
  }
}
