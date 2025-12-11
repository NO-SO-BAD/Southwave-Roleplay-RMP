var CHAT_INACTIVITY_TIME = 8000;
var inactivityTimer = null;
function resetInactivityTimer() {
    if (inactivityTimer)
        clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(function () {
        mp.gui.chat.show(false);
    }, CHAT_INACTIVITY_TIME);
}
mp.events.add("playerChatMessage", function () {
    mp.gui.chat.show(true);
    resetInactivityTimer();
});
mp.keys.bind(0x54, true, function () {
    mp.gui.chat.show(true);
    resetInactivityTimer();
});
var originalPush = mp.gui.chat.push;
mp.gui.chat.push = function (message) {
    originalPush(message);
    mp.gui.chat.show(true);
    resetInactivityTimer();
};
resetInactivityTimer();
mp.gui.chat.push("!{00ff00}Bienvenido a Southwave Roleplay!");
mp.gui.chat.push("!{ffff00}El chat se oculta automáticamente después de 8 segundos de inactividad.");
console.log("Chat con fade out automático cargado");
