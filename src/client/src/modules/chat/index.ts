// src/client/src/modules/chat/index.ts
const CHAT_INACTIVITY_TIME = 8000; // 8 segundos sin actividad → oculta chat

let inactivityTimer: number | null = null;

// Función para reiniciar el timer cada vez que hay actividad (mensaje nuevo)
function resetInactivityTimer() {
  if (inactivityTimer) clearTimeout(inactivityTimer);

  inactivityTimer = setTimeout(() => {
    mp.gui.chat.show(false); // Oculta el chat completamente
  }, CHAT_INACTIVITY_TIME);
}

// Muestra el chat y reinicia timer cuando hay un mensaje nuevo
mp.events.add("playerChatMessage", () => {
  mp.gui.chat.show(true); // Muestra chat si estaba oculto
  resetInactivityTimer();
});

// Reinicia timer cuando el jugador abre el chat (empieza a escribir T)
mp.keys.bind(0x54, true, () => { // Tecla T (chat)
  mp.gui.chat.show(true);
  resetInactivityTimer();
});

// Reinicia timer en cualquier mensaje del chat oficial (incluyendo sistema)
const originalPush = mp.gui.chat.push;
mp.gui.chat.push = function(message: string) {
  originalPush(message);
  mp.gui.chat.show(true);
  resetInactivityTimer();
};

// Inicia el timer al cargar
resetInactivityTimer();

// Mensaje de bienvenida
mp.gui.chat.push("!{00ff00}Bienvenido a Southwave Roleplay!");
mp.gui.chat.push("!{ffff00}El chat se oculta automáticamente después de 8 segundos de inactividad.");

console.log("Chat con fade out automático cargado");