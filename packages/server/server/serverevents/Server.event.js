"use strict";
mp.events.add("server::client:debug", (player, message, ...args) => {
    if (!process.env.DEBUG_MODE)
        return;
    console.log(message, ...args);
});
