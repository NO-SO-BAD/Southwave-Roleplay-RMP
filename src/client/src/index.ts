

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
  'dlc_mansions_tongva_estate',
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



mp.events.add('playerReady', () => {
  mp.gui.cursor.show(true, true);
  mp.gui.chat.show(false);  // Oculta chat default si quieres
  mp.gui.execute(`location.href = 'package://cef/index.html';`);
});