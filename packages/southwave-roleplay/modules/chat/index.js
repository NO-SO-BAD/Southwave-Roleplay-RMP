"use strict";
// src/server/src/modules/chat/index.ts
var CHAT_RANGE = 20.0; // Rango normal
var ME_DO_RANGE = 20.0;
mp.events.addCommand("me", function (player, fullText) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    var action = args.join(" ");
    if (!action)
        return player.outputChatBox("Uso: /me [acción]");
    mp.players.forEachInRange(player.position, ME_DO_RANGE, function (nearPlayer) {
        nearPlayer.outputChatBox("!{c8a2c8}* ".concat(player.name, " ").concat(action));
    });
});
mp.events.addCommand("do", function (player, fullText) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    var action = args.join(" ");
    if (!action)
        return player.outputChatBox("Uso: /do [acción]");
    mp.players.forEachInRange(player.position, ME_DO_RANGE, function (nearPlayer) {
        nearPlayer.outputChatBox("!{a8c8a2}* ".concat(action, " (( ").concat(player.name, " ))"));
    });
});
mp.events.addCommand("ooc", function (player, fullText) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    var text = args.join(" ");
    if (!text)
        return player.outputChatBox("Uso: /ooc [mensaje]");
    mp.players.broadcast("!{aaaaaa}(( OOC ".concat(player.name, ": ").concat(text, " ))"));
});
mp.events.add("playerChat", function (player, message) {
    if (!message || message.trim() === "")
        return;
    message = message.trim();
    mp.players.forEachInRange(player.position, CHAT_RANGE, function (nearPlayer) {
        nearPlayer.outputChatBox("".concat(player.name, ": ").concat(message));
    });
    console.log("[CHAT] ".concat(player.name, ": ").concat(message));
});
