"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.moveInventoryItem = void 0;
const uuid_1 = require("uuid");
const ItemObject_class_1 = require("./ItemObject.class");
const utils_module_1 = require("@shared/utils.module");
async function moveBackpackItem(player, data) {
    if (!mp.players.exists(player) || !player.character || !player.character.inventory)
        return;
    const { source, target, backpackHash } = utils_module_1.Utils.parseObject(data);
    const draggedFrom = source;
    const droppedTo = target;
    if (!backpackHash)
        return player.character.inventory.setInventory(player);
    const backpackData = player.character.inventory.getItemByUUID(backpackHash);
    if (!backpackData || !backpackData.items)
        return player.character.inventory.setInventory(player);
    const fromIndex = parseInt(draggedFrom.slot);
    const toIndex = parseInt(droppedTo.slot);
    if (droppedTo.component === "backpack") {
        const draggedFromItemData = draggedFrom.component === "backpack"
            ? backpackData.items[fromIndex]
            : player.character.inventory.items[draggedFrom.component][fromIndex];
        if (!draggedFromItemData) {
            player.showNotify("error" /* RageShared.Enums.NotifyType.TYPE_ERROR */, "You're trying to move an invalid item.");
            return player.character.inventory.setInventory(player);
        }
        const droptoItemData = backpackData.items[toIndex];
        if (draggedFrom.component === "backpack") {
            backpackData.items[toIndex] = draggedFromItemData;
            backpackData.items[fromIndex] = droptoItemData || null;
        }
        else {
            backpackData.items[toIndex] = { ...draggedFromItemData, isPlaced: false };
            player.character.inventory.items[draggedFrom.component][fromIndex] = droptoItemData || null;
            if (draggedFrom.component === "clothes") {
                player.character.inventory.reloadClothes(player);
            }
        }
        player.showNotify("success" /* RageShared.Enums.NotifyType.TYPE_SUCCESS */, droptoItemData ? "You swapped items." : "Item moved.");
        player.character.inventory.setInventory(player);
        return;
    }
    const droptoItemData = player.character.inventory.items[droppedTo.component][toIndex];
    const dragFromItemData = backpackData.items[fromIndex];
    player.character.inventory.items[droppedTo.component][toIndex] = dragFromItemData
        ? { ...dragFromItemData, isPlaced: droppedTo.component === "clothes" ? true : false }
        : null;
    backpackData.items[fromIndex] = droptoItemData || null;
    if (droppedTo.component === "clothes") {
        player.character.inventory.reloadClothes(player);
    }
    player.character.inventory.setInventory(player);
}
async function moveQuickuseItem(player, data) {
    if (!player.character || !player.character.inventory)
        return;
    const { item, source, target } = JSON.parse(data);
    const playerItem = player.character.inventory.getItemByUUID(item.hash);
    if (!playerItem) {
        player.character.inventory.setInventory(player);
        return;
    }
    const draggedFrom = source;
    const droppedTo = target;
    if (droppedTo.component === "quickUse" && draggedFrom.component === "quickUse") {
        const dropToItemData = player.character.inventory.quickUse[parseInt(droppedTo.slot)];
        const dragFromItemData = player.character.inventory.quickUse[parseInt(draggedFrom.slot)];
        if (!dragFromItemData)
            return;
        if (!dropToItemData) {
            player.character.inventory.quickUse[parseInt(droppedTo.slot)] = dragFromItemData;
            player.character.inventory.quickUse[parseInt(draggedFrom.slot)] = null;
            if (player.fastSlotActive == parseInt(draggedFrom.slot)) {
                player.fastSlotActive = parseInt(droppedTo.slot);
            }
            player.character.inventory.setInventory(player);
            return;
        }
        player.character.inventory.quickUse[parseInt(droppedTo.slot)] = { ...dragFromItemData };
        player.character.inventory.quickUse[parseInt(draggedFrom.slot)] = { ...dropToItemData };
        player.character.inventory.setInventory(player);
        return;
    }
    if (droppedTo.component === "quickUse") {
        if (player.character.inventory.isWeapon(playerItem)) {
            if (player.character.inventory.hasWeaponInFastSlot(playerItem.type)) {
                player.character.inventory.quickUse[parseInt(droppedTo.slot)] = null;
                player.character.inventory.setInventory(player);
                return;
            }
            player.character.inventory.equippedWeapons[parseInt(droppedTo.slot)] = {
                isActive: false,
                weaponhash: mp.joaat(item.type)
            };
            player.character.inventory.quickUse[parseInt(droppedTo.slot)] = { component: draggedFrom.component, id: parseInt(draggedFrom.slot) };
            player.character.inventory.setInventory(player);
            return;
        }
        player.character.inventory.quickUse[parseInt(droppedTo.slot)] = { component: draggedFrom.component, id: parseInt(draggedFrom.slot) };
        player.character.inventory.setInventory(player);
        return;
    }
    if (droppedTo.component === "pockets" && player.character.inventory.isWeapon(playerItem)) {
        player.removeAllWeapons();
        player.character.inventory.quickUse[parseInt(draggedFrom.slot)] = null;
        player.character.inventory.setInventory(player);
    }
}
async function moveClothingItem(player, data) {
    try {
        if (!mp.players.exists(player) || !player.character?.inventory)
            return;
        const { item, source, target } = JSON.parse(data);
        const draggedFrom = source;
        const droppedTo = target;
        const inventory = player.character.inventory;
        const notifyPlayer = (type, message) => {
            player.showNotify(type, message);
        };
        if (draggedFrom.component === "clothes" && droppedTo.component !== "clothes") {
            const draggedFromSlotData = inventory.items[draggedFrom.component][draggedFrom.slot];
            const droppedToSlotData = inventory.items[droppedTo.component][droppedTo.slot];
            if (!draggedFromSlotData)
                return;
            if (!droppedToSlotData) {
                inventory.items[droppedTo.component][droppedTo.slot] = { ...draggedFromSlotData, isPlaced: false };
                inventory.resetClothingItemData(draggedFrom.slot);
                inventory.loadClothes(player, draggedFrom.slot, null);
                inventory.setInventory(player);
                notifyPlayer("success" /* RageShared.Enums.NotifyType.TYPE_SUCCESS */, `You unequipped ${draggedFromSlotData.name}`);
                return;
            }
            notifyPlayer("info" /* RageShared.Enums.NotifyType.TYPE_INFO */, "There was an item at dropped slot, swapping them up!");
            const droppedToItem = { ...droppedToSlotData };
            inventory.items[droppedTo.component][droppedTo.slot] = { ...draggedFromSlotData, isPlaced: false };
            inventory.items[draggedFrom.component][draggedFrom.slot] = { ...droppedToItem, isPlaced: true };
            inventory.loadClothes(player, draggedFrom.slot, JSON.parse(droppedToItem.key.replace(droppedToItem.type, "")));
            inventory.setInventory(player);
            return;
        }
        if (droppedTo.component === "clothes" && draggedFrom.component !== "clothes") {
            const draggedFromData = draggedFrom.component === "groundItems" ? ItemObject_class_1.ItemObject.getItem(item.hash) : inventory.items[draggedFrom.component][draggedFrom.slot];
            if (!draggedFromData)
                return;
            const droppedToData = inventory.items[droppedTo.component][droppedTo.slot];
            if (draggedFrom.component === "groundItems") {
                console.log("what u want?", draggedFromData);
                inventory.items.clothes[droppedTo.slot] = { ...draggedFromData, isPlaced: true };
                ItemObject_class_1.ItemObject.deleteDroppedItemByHash(item.hash);
                inventory.loadClothes(player, droppedTo.slot, JSON.parse(draggedFromData.key.replace(draggedFromData.type, "")));
                notifyPlayer("success" /* RageShared.Enums.NotifyType.TYPE_SUCCESS */, `You equipped ${draggedFromData.name}`);
                inventory.setInventory(player);
                return;
            }
            if (droppedToData && droppedToData.isPlaced) {
                const oldClothes = { ...droppedToData, isPlaced: false };
                inventory.items[droppedTo.component][droppedTo.slot] = { ...draggedFromData, isPlaced: true };
                inventory.items[draggedFrom.component][draggedFrom.slot] = oldClothes;
                notifyPlayer("success" /* RageShared.Enums.NotifyType.TYPE_SUCCESS */, "You swapped clothes");
                inventory.loadClothes(player, droppedTo.slot, JSON.parse(draggedFromData.key.replace(draggedFromData.type, "")));
            }
            else {
                inventory.items[droppedTo.component][droppedTo.slot] = { ...draggedFromData, isPlaced: true };
                inventory.items[draggedFrom.component][draggedFrom.slot] = null;
                inventory.loadClothes(player, droppedTo.slot, JSON.parse(draggedFromData.key.replace(draggedFromData.type, "")));
                notifyPlayer("success" /* RageShared.Enums.NotifyType.TYPE_SUCCESS */, `You equipped ${draggedFromData.name}`);
            }
            inventory.setInventory(player);
        }
    }
    catch (err) {
        console.error("moveClothingItem error: ", err);
    }
}
const moveInventoryItem = async (player, data) => {
    try {
        if (!mp.players.exists(player) || !player.character || !player.character.inventory)
            return;
        const { item, source, target } = utils_module_1.Utils.parseObject(data);
        const draggedFrom = source;
        const droppedTo = target;
        switch (true) {
            case draggedFrom.component === "backpack" || droppedTo.component === "backpack": {
                await moveBackpackItem(player, data);
                return;
            }
            case draggedFrom.component === "groundItems" || droppedTo.component === "groundItems": {
                if (droppedTo.component === "groundItems")
                    return;
                const droppedItem = ItemObject_class_1.ItemObject.List.get(item.hash);
                if (!droppedItem)
                    return player.showNotify("error" /* RageShared.Enums.NotifyType.TYPE_ERROR */, "Couldnt find that item on the ground");
                droppedItem.remove();
                player.character.inventory.items[droppedTo.component][parseInt(droppedTo.slot)] = {
                    ...item,
                    isPlaced: droppedTo.component === "clothes" ? true : false,
                    hash: (0, uuid_1.v4)()
                };
                if (droppedTo.component === "clothes")
                    player.character.inventory.reloadClothes(player);
                player.character.inventory.setInventory(player);
                return;
            }
            case draggedFrom.component === "clothes" || droppedTo.component === "clothes": {
                await moveClothingItem(player, data);
                return;
            }
            case draggedFrom.component === "quickUse" || droppedTo.component === "quickUse": {
                await moveQuickuseItem(player, data);
                return;
            }
            case draggedFrom.component === droppedTo.component && droppedTo.item && item.type === droppedTo.item.type: {
                let difference = 0;
                let targetItem = player.character.inventory.items[droppedTo.component][parseInt(droppedTo.slot)];
                let sourceItem = player.character.inventory.items[draggedFrom.component][parseInt(draggedFrom.slot)];
                if (!targetItem || !sourceItem)
                    return;
                let targetItemCount = targetItem.count;
                let sourceItemCount = sourceItem.count;
                if (targetItemCount + sourceItemCount > targetItem.maxStack) {
                    difference = targetItem?.count + sourceItem.count - targetItem.maxStack;
                    targetItem.count = targetItem.maxStack;
                    if (sourceItem.count <= 0) {
                        sourceItem = null;
                    }
                    else {
                        sourceItem.count = difference;
                    }
                }
                else {
                    targetItem.count += sourceItem.count;
                    player.character.inventory.items[draggedFrom.component][parseInt(draggedFrom.slot)] = null;
                }
                if (droppedTo.item.type && player.character.inventory.isAmmoItem(droppedTo.item)) {
                    await player.character.inventory.reloadWeaponAmmo(player, droppedTo.item.type);
                }
                break;
            }
            default: {
                if (item.type && droppedTo.item && droppedTo.item.type === item.type) {
                    if (item.count + droppedTo.item.count <= item.maxStack) {
                        item.count = item.count + droppedTo.item.count;
                        player.character.inventory.items[droppedTo.component][parseInt(droppedTo.slot)] = item;
                        player.character.inventory.items[draggedFrom.component][parseInt(draggedFrom.slot)] = null;
                        if (player.character.inventory.isAmmoItem(item) || player.character.inventory.isAmmoItem(droppedTo.item)) {
                            player.character.inventory.reloadWeaponAmmo(player, item.type);
                        }
                    }
                }
                else {
                    const [draggedItemInQuickUse, dropToItemInQuickUse] = [
                        player.character.inventory.checkQuickUse(draggedFrom.component, parseInt(draggedFrom.slot)),
                        player.character.inventory.checkQuickUse(droppedTo.component, parseInt(droppedTo.slot))
                    ];
                    if (draggedItemInQuickUse !== -1) {
                        player.character.inventory.quickUse[draggedItemInQuickUse] = { component: droppedTo.component, id: parseInt(droppedTo.slot) };
                    }
                    if (dropToItemInQuickUse !== -1) {
                        player.character.inventory.quickUse[dropToItemInQuickUse] = { component: draggedFrom.component, id: parseInt(draggedFrom.slot) };
                    }
                    player.character.inventory.items[draggedFrom.component][parseInt(draggedFrom.slot)] = droppedTo.item;
                    player.character.inventory.items[droppedTo.component][parseInt(droppedTo.slot)] = item;
                }
                break;
            }
        }
        player.character.inventory.setInventory(player);
    }
    catch (err) {
        console.log("moveItemToTrunk err: ", err);
    }
};
exports.moveInventoryItem = moveInventoryItem;
