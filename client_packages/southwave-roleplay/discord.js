"use strict";
mp.events.add('setDiscordStatus', function (serverName, status) {
    mp.discord.update(serverName, status);
});
