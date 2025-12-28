"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

/* ===============================
   ALIASES (OBLIGATORIO PRIMERO)
   =============================== */

const path = require("path");
const moduleAlias = require("module-alias");

// __dirname === packages/server
const root = __dirname;
moduleAlias.addAliases({
  "@api": path.join(root, "api"),
  "@assets": path.join(root, "assets"),
  "@classes": path.join(root, "classes"),
  "@events": path.join(root, "serverevents"),
  "@modules": path.join(root, "modules"),
  "@entities": path.join(root, "database/entity"),
  "@commands": path.join(root, "commands"),
  "@prototype": path.join(root, "prototype"),
  "@shared": path.join(root, "../shared"),
  "@map": path.join(root, "map"),
 
});

/* ===============================
   CORE REQUIRES
   =============================== */

require("reflect-metadata");

/*

        Author: shr0x
        ~How beasts do it~

*/

/* ===============================
   LOAD GAME SYSTEMS
   =============================== */

// Commands
require("@commands"); // index.js se resuelve solo

// Prototypes
require("@prototype/Player.prototype");

// Core classes
require("@classes/WorldManager.class");

// Events
require("@events/Auth.event");
require("@events/Chat.event");
require("@events/Server.event");
require("@events/Character.event");
require("@events/Player.event");
require("@events/Inventory.event");
require("@events/Death.event");
require("@events/Vehicle.event");
require("@events/Point.event");


const _api_1 = require("@api");
//---------------------------------------//
const colorette_1 = require("colorette");
const { map } = require("lodash");
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
