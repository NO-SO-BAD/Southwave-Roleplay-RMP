//require('./modules/discord'); // carga directa sin loop
mp.events.add('setDiscordStatus', function (serverName, status) {
    mp.discord.update(serverName, status);
});

mp.gui.chat.push('Hello World');
console.log("Client module loaded");
mp.events.call('setDiscordStatus', 'Playing on Freeroam', 'Playing as a citizen');