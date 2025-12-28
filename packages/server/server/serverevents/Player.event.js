"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _api_1 = require("@api");
const Ban_entity_1 = require("@entities/Ban.entity");
const Character_entity_1 = require("@entities/Character.entity");
const Attachments_module_1 = require("@modules/Attachments.module");
const blips_1 = require("@map/blips"); // <- tu módulo de blips
async function onPlayerJoin(player) {
    try {
        const banData = await _api_1.RAGERP.database.getRepository(Ban_entity_1.BanEntity).findOne({
            where: [{ serial: player.serial }, { ip: player.ip }, { username: player.name }, { rsgId: player.rgscId }]
        });
        if (banData) {
            if (_api_1.RAGERP.utils.hasDatePassedTimestamp(parseInt(banData.lifttime))) {
                await _api_1.RAGERP.database.getRepository(Ban_entity_1.BanEntity).delete({ id: banData.id });
            }
            else {
                player.kick(`Banned: ${banData.reason}`);
                return;
            }
        }
        player.account = null;
        player.character = null;
        player.lastPosition = null;
        player.emoteTimeout = null;
        player.setVariable("loggedin", false);
        player.setVariable("isSpectating", false);
        player.setVariable("adminLevel", 0);
        player.setVariable("emoteText", null);
        player.cdata = {};
        (0, blips_1.createAllBlipsForPlayer)(player);
    }
    catch (err) {
        console.error(err);
    }
}
async function onPlayerQuit(player) {
    const character = player.character;
    if (!character)
        return;
    const lastPosition = { ...player.position };
    await _api_1.RAGERP.database.getRepository(Character_entity_1.CharacterEntity).update(character.id, {
        position: { x: lastPosition.x, y: lastPosition.y, z: lastPosition.z, heading: player.heading },
        lastlogin: character.lastlogin,
        deathState: character.deathState,
        cash: character.cash
    });
}
mp.events.add({
    "playerQuit": onPlayerQuit,
    "playerJoin": onPlayerJoin
});
mp.events.add("server::spectate:stop", async (player) => {
    if (!player || !mp.players.exists(player))
        return;
    player.setVariable("isSpectating", false);
    player.call("client::spectate:stop");
});
mp.events.add("server::player:noclip", (player, status) => {
    player.setVariable("noclip", status);
    mp.players.forEachInRange(player.position, mp.config["stream-distance"], (nearbyPlayer) => {
        nearbyPlayer.call("client::player:noclip", [player.id, status]);
    });
});
mp.events.add("entityCreated", (entity) => {
    if (["vehicle", "player"].includes(entity.type)) {
        Attachments_module_1.entityAttachments.initFunctions(entity);
    }
});
_api_1.RAGERP.cef.register("settings", "changePassword", (player) => { });
