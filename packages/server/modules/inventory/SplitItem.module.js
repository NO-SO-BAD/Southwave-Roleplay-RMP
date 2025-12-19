"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.splitInventoryItem = void 0;
const uuid_1 = require("uuid");
const splitInventoryItem = (player, data) => {
    try {
        if (!mp.players.exists(player) || !player.character || !player.character.inventory)
            return;
        let { item, source, target } = JSON.parse(data);
        if (item.type === null)
            return;
        player.character.inventory.items[source.component][source.slot] = { ...item, type: item.type, count: item.count - target.count };
        player.character.inventory.items[target.component][target.slot] = { ...item, type: item.type, count: target.count, hash: (0, uuid_1.v4)() };
        if (player.character.inventory.isAmmoItem(item)) {
            player.character.inventory.reloadWeaponAmmo(player, item.type);
        }
        player.character.inventory.setInventory(player);
    }
    catch (err) {
        console.log("splitInventoryItem err: ", err);
    }
};
exports.splitInventoryItem = splitInventoryItem;
