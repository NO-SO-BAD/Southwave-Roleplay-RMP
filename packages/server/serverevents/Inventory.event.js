"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _api_1 = require("@api");
//-------------------------------------------------------//
_api_1.RAGERP.cef.register("inventory", "onMoveItem", async (player, data) => {
    if (!mp.players.exists(player) || !player.character || !player.character.inventory)
        return;
    await player.character.inventory.moveItem(player, data);
});
//-------------------------------------------------------//
_api_1.RAGERP.cef.register("inventory", "onUseItem", (player, data) => {
    if (!mp.players.exists(player) || !player.character || !player.character.inventory)
        return;
    player.character.inventory.useItem(player, data);
});
//-------------------------------------------------------//
_api_1.RAGERP.cef.register("inventory", "onSplitItem", (player, data) => {
    if (!mp.players.exists(player) || !player.character || !player.character.inventory)
        return;
    player.character.inventory.splitStack(player, data);
});
//-------------------------------------------------------//
_api_1.RAGERP.cef.register("inventory", "onDropItem", async (player, itemData) => {
    if (!mp.players.exists(player) || !player.character || !player.character.inventory)
        return;
    await player.character.inventory.dropItem(player, itemData);
});
//-------------------------------------------------------//
_api_1.RAGERP.cef.register("inventory", "deleteItem", (player, itemData) => {
    if (!mp.players.exists(player) || !player.character || !player.character.inventory)
        return;
    player.character.inventory.deleteItem(player, itemData);
});
//-------------------------------------------------------//
mp.events.add("server::player:loadInventory", (player) => {
    if (!mp.players.exists(player) || !player.character || !player.character.inventory)
        return;
    player.character.inventory.setInventory(player);
});
//-------------------------------------------------------//
_api_1.RAGERP.cef.register("inventory", "onGiveItemAway", (player) => player.call("client::inventory:deletePedScreen"));
//-------------------------------------------------------//
_api_1.RAGERP.cef.register("inventory", "confirmItemDrop", (player) => player.call("client::inventory:deletePedScreen"));
//-------------------------------------------------------//
_api_1.RAGERP.cef.register("inventory", "openItem", (player, data) => {
    if (!mp.players.exists(player) || !player.character || !player.character.inventory)
        return;
    player.character.inventory.openItem(player, data);
});
//-------------------------------------------------------//
mp.events.add("server::inventory:quickUse", async (player, event) => {
    if (!mp.players.exists(player) || !player.character || !player.character.inventory)
        return;
    await player.character.inventory.manageFastSlots(player, event);
});
//-------------------------------------------------------//
_api_1.RAGERP.cef.register("inventory", "cancelAction", (player) => {
    if (!mp.players.exists(player) || !player.character || !player.character.inventory || !player.character.inventory.progressBar)
        return;
    player.character.inventory.progressBar.onCancel(player);
});
//-------------------------------------------------------//
mp.events.add("server::player:weaponShot", async (player) => {
    try {
        if (!player || !mp.players.exists(player) || !player.character || !player.character.inventory)
            return;
        let ammoHash = player.getVariable("ammoHash");
        let loadedin = player.getVariable("itemAsAmmo");
        if (!ammoHash || !loadedin)
            return;
        let findAmmoItem = player.character.inventory.getItemByUUID(loadedin);
        if (!findAmmoItem)
            return;
        findAmmoItem.count--;
        if (findAmmoItem.count === 0) {
            let finditem = await player.character.inventory.getItemSlotComponentByHashKey(loadedin);
            if (finditem) {
                player.character.inventory.items[finditem.component][finditem.slot] = null;
                player.character.inventory.setInventory(player);
            }
            ammoHash.items.splice(ammoHash.items.indexOf(loadedin), 1);
            if (ammoHash.items.length) {
                player.setVariable("itemAsAmmo", ammoHash.items[0]);
                player.setVariable("ammoHash", ammoHash);
            }
            else {
                player.setVariable("itemAsAmmo", null);
                player.setVariable("ammoHash", null);
            }
        }
    }
    catch (err) {
        console.error("server::player:weaponShot: err", err);
    }
});
