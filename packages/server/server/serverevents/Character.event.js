"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _api_1 = require("@api");
const Character_entity_1 = require("@entities/Character.entity");
const Inventory_entity_1 = require("@entities/Inventory.entity");
const Assets_module_1 = require("@modules/inventory/Assets.module");
const Core_class_1 = require("@modules/inventory/Core.class");
/**
 * When a player changes navigation in character creator, example going from general data to appearance
 */
_api_1.RAGERP.cef.register("creator", "navigation", async (player, name) => {
    name = JSON.parse(name);
    const cameraName = "creator_" + name;
    player.call("client::creator:changeCamera", [cameraName]);
    player.call("client::creator:changeCategory", [cameraName]);
});
/**
 * Executed when a player selects a character to spawn with
 */
_api_1.RAGERP.cef.register("character", "select", async (player, data) => {
    const id = JSON.parse(data);
    const character = await _api_1.RAGERP.database.getRepository(Character_entity_1.CharacterEntity).findOne({ where: { id }, relations: ["items", "bank"] });
    if (!character)
        return player.showNotify("error" /* RageShared.Enums.NotifyType.TYPE_ERROR */, "An error occurred selecting your character.");
    player.character = character;
    player.setVariable("loggedin", true);
    player.call("client::auth:destroyCamera");
    player.call("client::cef:close");
    player.model = character.gender === 0 ? mp.joaat("mp_m_freemode_01") : mp.joaat("mp_f_freemode_01");
    player.name = player.character.name;
    await player.character.spawn(player);
    player.showNotify("success" /* RageShared.Enums.NotifyType.TYPE_SUCCESS */, `Welcome, ${player.character.name}!`);
});
/**
 * Executes when a player choose to create a new character
 */
_api_1.RAGERP.cef.register("character", "create", async (player) => {
    player.call("client::auth:destroyCamera");
    player.call("client::creator:start");
    _api_1.RAGERP.cef.emit(player, "system", "setPage", "creator");
});
/**
 * Executes when a player finishes creating a character.
 */
_api_1.RAGERP.cef.register("creator", "create", async (player, data) => {
    if (!player.account)
        return player.kick("An error has occurred!");
    const parseData = _api_1.RAGERP.utils.parseObject(data);
    const fullname = `${parseData.name.firstname} ${parseData.name.lastname}`;
    const nameisTaken = await _api_1.RAGERP.database.getRepository(Character_entity_1.CharacterEntity).findOne({ where: { name: fullname } });
    if (nameisTaken)
        return player.showNotify("error" /* RageShared.Enums.NotifyType.TYPE_ERROR */, "We're sorry but that name is already taken, choose another one.");
    const { sex, parents, hair, face, color } = parseData;
    const characterLimit = await _api_1.RAGERP.database.getRepository(Character_entity_1.CharacterEntity).find({ where: { account: { id: player.account.id } }, take: 3 });
    if (characterLimit.length > 2)
        return player.showNotify("error" /* RageShared.Enums.NotifyType.TYPE_ERROR */, "We're sorry but you already have three characters, you cannot create anymore.");
    const characterData = new Character_entity_1.CharacterEntity();
    characterData.account = player.account;
    characterData.appearance = { color, face, hair, parents };
    characterData.name = fullname;
    characterData.gender = sex;
    characterData.position = {
        x: -541.0401611328125,
        y: -1287.0777587890625,
        z: 26.901586532592773,
        heading: -118.70496368408203
    };
    const inv = Assets_module_1.inventorydataPresset;
    characterData.inventory = new Core_class_1.Inventory(player, inv.clothes, inv.pockets, inv.quickUse);
    const inventoryItems = new Inventory_entity_1.InventoryItemsEntity();
    inventoryItems.clothes = characterData.inventory.items.clothes;
    inventoryItems.pockets = characterData.inventory.items.pockets;
    inventoryItems.quickUse = characterData.inventory.quickUse;
    inventoryItems.character = characterData;
    characterData.items = inventoryItems;
    const result = await _api_1.RAGERP.database.getRepository(Character_entity_1.CharacterEntity).save(characterData);
    if (!result)
        return;
    player.name = fullname;
    player.character = result;
    player.setVariable("loggedin", true);
    player.call("client::creator:destroycam");
    player.call("client::cef:close");
    await player.character.spawn(player);
});
