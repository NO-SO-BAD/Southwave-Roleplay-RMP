"use strict";
mp.events.add('showHud', function (visible) {
    mp.gui.chat.activate(visible); // Muestra/oculta chat
});
