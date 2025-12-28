"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*

        ██████╗  █████╗  ██████╗ ███████╗███╗   ███╗██████╗     ██████╗ ██████╗      ██████╗  █████╗ ███╗   ███╗███████╗███╗   ███╗ ██████╗ ██████╗ ███████╗
        ██╔══██╗██╔══██╗██╔════╝ ██╔════╝████╗ ████║██╔══██╗    ██╔══██╗██╔══██╗    ██╔════╝ ██╔══██╗████╗ ████║██╔════╝████╗ ████║██╔═══██╗██╔══██╗██╔════╝
        ██████╔╝███████║██║  ███╗█████╗  ██╔████╔██║██████╔╝    ██████╔╝██████╔╝    ██║  ███╗███████║██╔████╔██║█████╗  ██╔████╔██║██║   ██║██║  ██║█████╗
        ██╔══██╗██╔══██║██║   ██║██╔══╝  ██║╚██╔╝██║██╔═══╝     ██╔══██╗██╔═══╝     ██║   ██║██╔══██║██║╚██╔╝██║██╔══╝  ██║╚██╔╝██║██║   ██║██║  ██║██╔══╝
        ██║  ██║██║  ██║╚██████╔╝███████╗██║ ╚═╝ ██║██║         ██║  ██║██║         ╚██████╔╝██║  ██║██║ ╚═╝ ██║███████╗██║ ╚═╝ ██║╚██████╔╝██████╔╝███████╗
        ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚═╝     ╚═╝╚═╝         ╚═╝  ╚═╝╚═╝          ╚═════╝ ╚═╝  ╚═╝╚═╝     ╚═╝╚══════╝╚═╝     ╚═╝ ╚═════╝ ╚═════╝ ╚══════╝
                                                                        Author: shr0x
                                                                      ~How beasts do it~

*/
const _api_1 = require("@api");
//---------------------------------------//
require("@commands/index");
//---------------------------------------//
require("@prototype/Player.prototype");
//---------------------------------------//
require("@classes/WorldManager.class");
//---------------------------------------//
require("@events/Auth.event");
require("@events/Chat.event");
require("@events/Server.event");
require("@events/Character.event");
require("@events/Player.event");
require("@events/Inventory.event");
require("@events/Death.event");
require("@events/Vehicle.event");
require("@events/Point.event");
require('module-alias/register');
require("reflect-metadata");
//---------------------------------------//
const colorette_1 = require("colorette");
//---------------------------------------//
async function initGamemode() {
    mp.events.delayInitialization = true;
    await _api_1.RAGERP.database
        .initialize()
        .then(() => console.log("Database connected!"))
        .catch((err) => {
        throw new Error(err);
    });
    console.log((0, colorette_1.yellow)("======================================================================================================"));
    console.log((0, colorette_1.green)(" ██████╗  █████╗ ███╗   ███╗███████╗███╗   ███╗ ██████╗ ██████╗ ███████╗    ██╗███╗   ██╗██╗████████╗"));
    console.log((0, colorette_1.green)("██╔════╝ ██╔══██╗████╗ ████║██╔════╝████╗ ████║██╔═══██╗██╔══██╗██╔════╝    ██║████╗  ██║██║╚══██╔══╝"));
    console.log((0, colorette_1.green)("██║  ███╗███████║██╔████╔██║█████╗  ██╔████╔██║██║   ██║██║  ██║█████╗      ██║██╔██╗ ██║██║   ██║   "));
    console.log((0, colorette_1.green)("██║   ██║██╔══██║██║╚██╔╝██║██╔══╝  ██║╚██╔╝██║██║   ██║██║  ██║██╔══╝      ██║██║╚██╗██║██║   ██║   "));
    console.log((0, colorette_1.green)("╚██████╔╝██║  ██║██║ ╚═╝ ██║███████╗██║ ╚═╝ ██║╚██████╔╝██████╔╝███████╗    ██║██║ ╚████║██║   ██║   "));
    console.log((0, colorette_1.green)(" ╚═════╝ ╚═╝  ╚═╝╚═╝     ╚═╝╚══════╝╚═╝     ╚═╝ ╚═════╝ ╚═════╝ ╚══════╝    ╚═╝╚═╝  ╚═══╝╚═╝   ╚═╝   "));
    console.log((0, colorette_1.yellow)("======================================================================================================"));
    //@ts-ignore
    console.log((0, colorette_1.blue)(`Server Events: ${Object.values(mp.events.binded).length}`));
    console.log((0, colorette_1.blue)(`Cef Events: ${_api_1.RAGERP.cef.poolSize}`));
    console.log((0, colorette_1.blue)(`Total Commands: ${_api_1.RAGERP.commands._commands.size}`));
    mp.events.delayInitialization = false;
}
(async () => {
    await initGamemode().then(() => console.log("[SHROX FRAMEWORK] Gamemode Initialized"));
})();
