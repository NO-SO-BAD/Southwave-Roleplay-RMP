"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _api_1 = require("@api");
const utils_module_1 = require("@shared/utils.module");
_api_1.RAGERP.commands.add({
    name: "me",
    run: (player, fulltext) => {
        if (!fulltext.length)
            return _api_1.RAGERP.chat.sendSyntaxError(player, "/me [action text]");
        player.setEmoteText([194, 162, 218, 255], `** ${fulltext}`, 7);
        _api_1.RAGERP.chat.sendNearbyMessage(player.position, 15, `!{#C2A2DA}** ${player.getRoleplayName()} ${fulltext}`);
    }
});
_api_1.RAGERP.commands.add({
    name: "w",
    aliases: ["whisper"],
    run: (player, fulltext, targetid, ...text) => {
        if (!fulltext.length || !targetid.length)
            return _api_1.RAGERP.chat.sendSyntaxError(player, "/w(hisper) [playerid] [message]");
        const target = mp.players.getPlayerByName(targetid);
        if (!target || !mp.players.exists(target) || !target.getVariable("loggedin"))
            return player.showNotify("error" /* RageShared.Enums.NotifyType.TYPE_ERROR */, "Invalid player specified.");
        if (target.id === player.id)
            return player.showNotify("error" /* RageShared.Enums.NotifyType.TYPE_ERROR */, "You can't whisper yourself.");
        if (utils_module_1.Utils.distanceToPos(player.position, target.position) > 2.5)
            return player.showNotify("error" /* RageShared.Enums.NotifyType.TYPE_ERROR */, "That player is far away from you.");
        player.setEmoteText([194, 162, 218, 255], `* mutters something to ${target.getRoleplayName()}`, 7);
        _api_1.RAGERP.chat.sendNearbyMessage(player.position, 15, `!{#C2A2DA}** ${player.getRoleplayName()} whispers something to ${target.getRoleplayName()}`);
        player.outputChatBox(`!{#FFFF00}Whisper to: ${target.getRoleplayName()}: ${text.join(" ")}`);
        target.outputChatBox(`!{#FFFF00}${player.getRoleplayName()} whispers: ${text.join(" ")}`);
    }
});
_api_1.RAGERP.commands.add({
    name: "do",
    run: (player, fulltext) => {
        if (!fulltext.length)
            return _api_1.RAGERP.chat.sendSyntaxError(player, "/do [describe action text]");
        player.setEmoteText([194, 162, 218, 255], `** ${fulltext}`, 7);
        _api_1.RAGERP.chat.sendNearbyMessage(player.position, 15, `!{#C2A2DA}** ${fulltext} ((${player.getRoleplayName()}))`);
    }
});
_api_1.RAGERP.commands.add({
    name: "b",
    description: "Local ooc chat",
    run: (player, fulltext) => {
        if (!fulltext.length)
            return _api_1.RAGERP.chat.sendSyntaxError(player, "/b [message]");
        _api_1.RAGERP.chat.sendNearbyMessage(player.position, 15, `!{#afafaf}(( ${player.name} [${player.id}]: ${fulltext} ))`);
    }
});
_api_1.RAGERP.commands.add({
    name: "shout",
    aliases: ["s"],
    description: "Shoutout a message",
    run: (player, fulltext) => {
        if (!fulltext.length)
            return _api_1.RAGERP.chat.sendSyntaxError(player, "/s(hout) [text]");
        player.setEmoteText([255, 255, 255, 255], `(Shouts) ${fulltext}!`, 5);
        _api_1.RAGERP.chat.sendNearbyMessage(player.position, 20.0, `${player.getRoleplayName()} shouts: ${fulltext}!`);
    }
});
