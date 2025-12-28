"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Inventory = void 0;
const uuid_1 = require("uuid");
const _api_1 = require("@api");
const index_1 = require("@shared/index");
const SplitItem_module_1 = require("./SplitItem.module");
const MoveItem_module_1 = require("./MoveItem.module");
const UseItem_module_1 = require("./UseItem.module");
const Quickuse_module_1 = require("./Quickuse.module");
const Assets_module_1 = require("./Assets.module");
const Items_module_1 = require("./Items.module");
const Inventory_entity_1 = require("@entities/Inventory.entity");
const utils_module_1 = require("@shared/utils.module");
const DropItem_module_1 = require("./DropItem.module");
const ItemObject_class_1 = require("./ItemObject.class");
const maleClothes = __importStar(require("@shared/json/maleTorso.json"));
const femaleClothes = __importStar(require("@shared/json/femaleTorso.json"));
const InteractionProgress_class_1 = require("@classes/InteractionProgress.class");
const torsoDataMale = maleClothes;
const femaleTorsos = femaleClothes;
class InventoryBase {
    constructor(p, clothes, pockets, quickUse) {
        this.items = { clothes: {}, pockets: {} };
        this.weight = 40.0;
        this.equippedWeapons = {};
        this.progressBar = null;
        this._player = p;
        this.items.clothes = clothes;
        this.items.pockets = pockets;
        this.quickUse = quickUse;
        this.weight = 40.0;
    }
    get player() {
        return this._player;
    }
}
class InventoryItem extends InventoryBase {
    /**
     * Sets a inventory item slot to empty
     * @param component which component to reset the item data to
     * @param slotid slot id to reset the data
     */
    resetItemData(component, slotid) {
        this.items[component][slotid] = null;
    }
    /**
     * Resets a clothing slot back to its default state.
     * @param slot Clothing slot (0-13)
     */
    resetClothingItemData(slot) {
        this.items.clothes[slot] = null;
    }
    /**
     * Get a free available inventory item slot
     * @returns itemIndex (slot index) && type: category type
     */
    getFreeSlot() {
        let type = index_1.RageShared.Inventory.Enums.INVENTORY_CATEGORIES.POCKETS;
        let itemIndex = Object.values(this.items.pockets).findIndex((e) => !e);
        return { itemIndex, type };
    }
    getTotalFreeSlots() {
        return Object.values(this.items.pockets).filter((e) => !e).length;
    }
    getClothingIndex(type) {
        const clothingList = {
            ["hat" /* RageShared.Inventory.Enums.ITEM_TYPES.ITEM_TYPE_HAT */]: 0,
            ["mask" /* RageShared.Inventory.Enums.ITEM_TYPES.ITEM_TYPE_MASK */]: 1,
            ["glasses" /* RageShared.Inventory.Enums.ITEM_TYPES.ITEM_TYPE_GLASSES */]: 2,
            ["earRings" /* RageShared.Inventory.Enums.ITEM_TYPES.ITEM_TYPE_EARRINGS */]: 3,
            ["chain" /* RageShared.Inventory.Enums.ITEM_TYPES.ITEM_TYPE_CHAIN */]: 4,
            ["tShirt" /* RageShared.Inventory.Enums.ITEM_TYPES.ITEM_TYPE_TSHIRT */]: 5,
            ["top" /* RageShared.Inventory.Enums.ITEM_TYPES.ITEM_TYPE_TOP */]: 6,
            ["backpack" /* RageShared.Inventory.Enums.ITEM_TYPES.ITEM_TYPE_BACKPACK */]: 7,
            ["wallet" /* RageShared.Inventory.Enums.ITEM_TYPES.ITEM_TYPE_WALLET */]: 8,
            ["armour" /* RageShared.Inventory.Enums.ITEM_TYPES.ITEM_TYPE_ARMOUR */]: 9,
            ["watch" /* RageShared.Inventory.Enums.ITEM_TYPES.ITEM_TYPE_WATCH */]: 10,
            ["gloves" /* RageShared.Inventory.Enums.ITEM_TYPES.ITEM_TYPE_GLOVES */]: 11,
            ["pants" /* RageShared.Inventory.Enums.ITEM_TYPES.ITEM_TYPE_PANTS */]: 12,
            ["shoes" /* RageShared.Inventory.Enums.ITEM_TYPES.ITEM_TYPE_SHOES */]: 13
        };
        return clothingList[type] ?? -1;
    }
    addItem(type) {
        const itemData = Items_module_1.inventoryAssets.items[type];
        const { itemIndex } = this.getFreeSlot();
        if (!itemData || itemIndex < 0)
            return null;
        this.items.pockets[itemIndex] = { ...itemData, quality: 4, hash: (0, uuid_1.v4)(), count: 1 };
        return this.items.pockets[itemIndex];
    }
    /**
     * Adds a clothing item to player's inventory with the option to equip it right away
     * @param type Clothing type
     * @param data Clothing data, such as component, drawable and texture
     * @param equipNow Whether to equip it right away or not (rewrites current item if any)
     * @returns InventoryItem | null
     */
    addClothingItem(type, data, equipNow = false) {
        const [itemData, itemIndex] = [Items_module_1.inventoryAssets.items[type], equipNow ? this.getFreeSlot().itemIndex : this.getClothingIndex(type)];
        if (!itemData || itemIndex < 0)
            return null;
        const items = equipNow ? this.items.clothes : this.items.pockets;
        items[itemIndex] = { ...itemData, key: `${type} ${JSON.stringify({ ...data })}`, hash: (0, uuid_1.v4)() };
        return items[itemIndex];
    }
    async addPlayerItem(item) {
        try {
            let { itemIndex, type } = this.getFreeSlot();
            if (itemIndex === -1)
                return false;
            this.items[type][itemIndex] = item;
            return true;
        }
        catch (err) {
            console.log(err);
            return false;
        }
    }
    async addPlayerItemEx(item, category, slot) {
        try {
            if (this.items[category][slot] !== null)
                return false;
            this.items[category][slot] = item;
            return true;
        }
        catch (err) {
            return false;
        }
    }
    async addMultipleItems(items) {
        try {
            let itemCount = items.length;
            let { itemIndex, type } = this.getFreeSlot();
            if (itemIndex === -1)
                return false;
            for (let i = 0; i < itemCount; i++) {
                this.items[type][itemIndex] = items[i];
                itemIndex++;
            }
            return true;
        }
        catch (err) {
            console.log(err);
        }
    }
}
class QuickUse extends InventoryItem {
    clearQuickUseSlot() { }
    /**
     * Checks if an item is in quick use by component and id.
     *
     * @param {string} component - The component to check.
     * @param {number} id - The id to check.
     * @returns {number} - The index of the item in quick use or -1 if not found.
     */
    isItemInQuickUse(component, id) {
        for (const index in this.quickUse) {
            const item = this.quickUse[index];
            if (item && item.component === component && item.id === id) {
                return Number(index);
            }
        }
        return -1;
    }
}
class InventoryClothes extends QuickUse {
    /**
     * Returns whether a player is wearing a specified clothing index or not.
     * @param type Clothing Index
     * @returns {boolean}
     */
    isWearingClothingType(type) {
        return this.items.clothes[type]?.isPlaced ?? false;
    }
    /**
     * Updates on-screen ped for a specified player.
     * @param type
     * @param componentid clothing component id
     * @param drawableid clothing drawable id
     * @param texture clothing texture id
     * @param palette clothing palette id
     * @returns void
     */
    updateOnScreenPed(type, componentid, drawableid, texture, palette = 2) {
        if (!this.player || !mp.players.exists(this.player))
            return;
        return this.player.call(type === "prop" ? "client:inventory:updatePedProp" : "client:inventory:updatePedComponent", [componentid, drawableid, texture, palette]);
    }
    /**
     * 'Fixes' player body undershirts (gaps and showing body part issues), special thanks to rootcause for v-besttorso
     * @param player Player to update torso to
     * @param drawable clothing drawable id
     * @param texture clothing texture id
     * @returns void
     */
    updatePlayerTorso(player, drawable, texture) {
        try {
            const freemodeModels = [mp.joaat("mp_m_freemode_01"), mp.joaat("mp_f_freemode_01")];
            const isMaleModel = player.model === freemodeModels[0];
            const torsoData = isMaleModel ? torsoDataMale : femaleTorsos;
            if (torsoData[drawable]?.[texture]) {
                const { BestTorsoDrawable, BestTorsoTexture } = torsoData[drawable][texture];
                if (BestTorsoDrawable !== undefined && BestTorsoTexture !== undefined && BestTorsoDrawable !== -1) {
                    player.setClothes(3 /* RageEnums.ClothesComponent.TORSO */, BestTorsoDrawable, BestTorsoTexture, 2);
                    this.updateOnScreenPed("clothes", 3 /* RageEnums.ClothesComponent.TORSO */, BestTorsoDrawable, BestTorsoTexture);
                }
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    /**
     * Remove props or clothes from given player.
     * @param player the player to remove clothes from
     * @param slotnumber slot number based on INVENTORY_CLOTHING
     * @returns void
     */
    removeClothes(player, slotnumber) {
        if (!player || !mp.players.exists(player) || !player.character || slotnumber === 8 /* RageShared.Inventory.Enums.INVENTORY_CLOTHING.TYPE_WALLET */)
            return;
        const sex = player.character.gender;
        const default_clothes = Assets_module_1.defaultClothes[slotnumber][sex];
        const { type, component, drawable, texture } = default_clothes;
        if (type === "props") {
            player.setProp(component, drawable, texture);
            this.updateOnScreenPed("prop", component, drawable, texture);
        }
        else {
            player.setClothes(component, drawable, texture, 2);
            this.updateOnScreenPed("clothes", component, drawable, texture);
        }
    }
    convertUndershirtToShirt(undershirtid) {
        return -1;
    }
    /**
     * Loads clothes or removes clothes based on the provided data.
     * @param {PlayerMp} player The player to load or remove clothes for.
     * @param {number} slotnumber The slot number indicating the type of clothing.
     * @param {{ component: number; drawable: number; texture: number } | null} data The data containing component, drawable, and texture information, or null to remove clothes.
     * @returns {void}
     */
    loadClothes(player, slotnumber, data) {
        data === null ? this.removeClothes(player, slotnumber) : this.setClothes(player, slotnumber, data);
    }
    /**
     * Sets clothes or props for a player based on the slot number and provided data.
     * @param {PlayerMp} player The player to set clothes or props for.
     * @param {number} slotnumber The slot number indicating the type of clothing or prop.
     * @param {{ component: number; drawable: number; texture: number }} data The data containing component, drawable, and texture information.
     * @returns {void}
     */
    setClothes(player, slotnumber, data) {
        if (!mp.players.exists(player) || !player.getVariable("loggedin") || !player.character || !player.character.inventory)
            return;
        if (typeof data.component == "undefined" || isNaN(data.component) || isNaN(data.drawable) || isNaN(data.texture))
            return;
        const itemData = player.character.inventory.items.clothes[slotnumber];
        if (!itemData)
            return;
        if (itemData.typeCategory === 1 /* RageShared.Inventory.Enums.ITEM_TYPE_CATEGORY.TYPE_PROP */) {
            player.setProp(data.component, data.drawable, data.texture);
            this.updateOnScreenPed("prop", data.component, data.drawable, data.texture);
            return;
        }
        switch (slotnumber) {
            case 5 /* RageShared.Inventory.Enums.INVENTORY_CLOTHING.TYPE_TSHIRT */: {
                if (this.items.clothes[6 /* RageShared.Inventory.Enums.INVENTORY_CLOTHING.TYPE_JACKET */]?.isPlaced) {
                    data = { ...data, drawable: data.drawable, texture: data.texture };
                    player.setClothes(8, data.drawable, data.texture, 2);
                    return;
                }
                let converted = this.convertUndershirtToShirt(data.drawable);
                data = { ...data, drawable: converted, texture: data.texture };
                player.setClothes(11, data.drawable, data.texture, 2);
                this.updatePlayerTorso(player, data.drawable, data.texture);
                this.updateOnScreenPed("clothes", data.component, data.drawable, data.texture, 0);
                return;
            }
            case 6 /* RageShared.Inventory.Enums.INVENTORY_CLOTHING.TYPE_JACKET */: {
                if (itemData.isPlaced) {
                    const shirtData = itemData.key.replace("top" /* RageShared.Inventory.Enums.ITEM_TYPES.ITEM_TYPE_TOP */, "");
                    const undershirtDrawable = JSON.parse(shirtData);
                    if (typeof undershirtDrawable == "undefined" || typeof undershirtDrawable.drawable == "undefined") {
                        return;
                    }
                    player.setClothes(8, undershirtDrawable.drawable, undershirtDrawable.texture, 2);
                    player.setClothes(data.component, data.drawable, data.texture, 2);
                    this.updatePlayerTorso(player, data.drawable, data.texture);
                    return;
                }
                data = { ...data, component: 11, drawable: data.drawable, texture: data.texture };
                if (typeof data.component == "undefined" || typeof data.drawable == "undefined" || isNaN(data.drawable) || isNaN(data.texture)) {
                    return;
                }
                player.setClothes(3, 15, 0, 0);
                player.setClothes(8, 0, -1, 2);
                player.setClothes(data.component, data.drawable, data.texture, 2);
                this.updatePlayerTorso(player, data.drawable, data.texture);
                this.updateOnScreenPed("clothes", data.component, data.drawable, data.texture, 0);
                return;
            }
            case 7 /* RageShared.Inventory.Enums.INVENTORY_CLOTHING.TYPE_BACKPACK */: {
                player.setClothes(data.component, data.drawable, data.texture, 2);
                this.updateOnScreenPed("clothes", data.component, data.drawable, data.texture, 0);
                return;
            }
            case 9 /* RageShared.Inventory.Enums.INVENTORY_CLOTHING.TYPE_ARMOUR */: {
                if (this.items.clothes[9 /* RageShared.Inventory.Enums.INVENTORY_CLOTHING.TYPE_ARMOUR */]?.isPlaced) {
                    let item = this.items.clothes[9 /* RageShared.Inventory.Enums.INVENTORY_CLOTHING.TYPE_ARMOUR */];
                    player.armour = item.amount ?? 0;
                }
                player.setClothes(data.component, data.drawable, data.texture, 2);
                this.updateOnScreenPed("clothes", data.component, data.drawable, data.texture, 0);
                return;
            }
            default: {
                player.setClothes(data.component, data.drawable, data.texture, 2);
                this.updateOnScreenPed("clothes", data.component, data.drawable, data.texture, 0);
                return;
            }
        }
    }
    /**
     * Reloads clothes for the player based on the items stored in the inventory.
     * @param {PlayerMp} player The player whose clothes need to be reloaded.
     * @returns {void}
     */
    reloadClothes(player) {
        Object.entries(this.items.clothes).forEach(([index, clothing]) => {
            if (!clothing)
                return this.removeClothes(player, parseInt(index));
            const clothingKey = clothing.key?.replace(clothing.type, "");
            const parsedKey = clothingKey ? utils_module_1.Utils.tryParse(clothingKey) : null;
            this.loadClothes(player, parseInt(index), clothing.isPlaced ? parsedKey : null);
        });
    }
    /**
     * Resets all clothes for the player, removing all equipped clothes.
     * @param {PlayerMp} player The player whose clothes need to be reset.
     * @returns {void}
     */
    resetClothes(player) {
        Object.values(this.items.clothes).forEach((e, i) => {
            this.removeClothes(player, i);
        });
    }
    /**
     * Resets all props for the player, removing all equipped props.
     * @param {PlayerMp} player The player whose props need to be reset.
     * @returns {void}
     */
    resetProps(player) {
        Object.values(this.items.clothes)
            .filter((x) => x && x.typeCategory === 1 /* RageShared.Inventory.Enums.ITEM_TYPE_CATEGORY.TYPE_PROP */)
            .forEach((e, i) => {
            this.removeClothes(player, i);
        });
    }
}
class InventoryAction extends InventoryClothes {
    async moveItem(player, data) {
        await (0, MoveItem_module_1.moveInventoryItem)(player, data);
    }
    openItem(player, data) {
        try {
        }
        catch (err) {
            console.log("openInventoryItem err: ", err);
        }
    }
    async useItem(player, data) {
        await (0, UseItem_module_1.useInventoryItem)(player, data);
    }
    deleteItemStack(player, data) {
        if (!player.character || !mp.players.exists(player) || !player.character.inventory)
            return;
        try {
            const { item } = JSON.parse(data);
            const source = player.character.inventory.getItemSlotComponentByHash(item.hash);
            if (!source || !source.component || source.slot === null)
                return;
            const itemData = player.character.inventory.items[source.component][source.slot];
            if (!itemData)
                return;
            const count = itemData.count;
            if (count > 1) {
                player.character.inventory.items[source.component][source.slot] = { ...item, count: count - 1 };
                player.character.inventory.setInventory(player);
            }
            else {
                const fastSlotIndex = Object.values(player.character.inventory.quickUse).findIndex((e) => e && e.component === source.component && utils_module_1.Utils.tryParse(e.id) === source.slot);
                if (fastSlotIndex !== -1) {
                    player.character.inventory.quickUse[fastSlotIndex] = null;
                }
                player.character.inventory.deleteItem(player, item.hash);
            }
            if (source.component === "clothes") {
                player.character.inventory.loadInventory(player);
            }
        }
        catch (err) {
            console.error("deleteInventoryItemStack err: ", err);
        }
    }
    deleteItem(player, uuid) {
        if (!player.character || !mp.players.exists(player) || !player.character.inventory)
            return;
        try {
            const { items, quickUse } = player.character.inventory;
            for (const category in items) {
                if (Object.prototype.hasOwnProperty.call(items, category)) {
                    const categoryItems = items[category];
                    for (const [slot, item] of Object.entries(categoryItems)) {
                        if (!item)
                            continue;
                        if (item.hash === uuid) {
                            const parsedSlot = utils_module_1.Utils.tryParse(slot);
                            const fastSlotIndex = Object.values(quickUse).findIndex((e) => e && e.component === category && utils_module_1.Utils.tryParse(e.id) === parsedSlot);
                            if (fastSlotIndex !== -1) {
                                quickUse[fastSlotIndex] = null;
                            }
                            items[category][parsedSlot] = null;
                            player.character.inventory.setInventory(player);
                            if (category === "clothes") {
                                player.character.inventory.loadInventory(player);
                            }
                            return;
                        }
                    }
                }
            }
        }
        catch (err) {
            console.error("deleteInventoryItem err: ", err);
        }
    }
}
class Inventory extends InventoryAction {
    getItemModel(itemType) {
        const item = Items_module_1.inventoryAssets.items[itemType];
        if (!item)
            return null;
        return item.modelHash;
    }
    getItemAndStack(itemType) {
        return this.getItemsInCategoryByType([index_1.RageShared.Inventory.Enums.INVENTORY_CATEGORIES.POCKETS], itemType);
    }
    /**
     * Get items by hash name.
     * @warning This function will also check if the item count is not maxed out.
     * @param {string} itemHash -> Item hash name
     * @returns -> An array of items.
     */
    getItemsByHashName(itemHash) {
        let foundItems = [];
        for (const getcategory in this.items) {
            let category = getcategory;
            for (const item of Object.values(this.items[category])) {
                if (!item)
                    continue;
                if (item.type !== null && item.count !== item.maxStack && item.type === itemHash) {
                    foundItems.push(item);
                }
            }
        }
        return foundItems;
    }
    /**
     * Get items in the specified categories by their type name.
     *
     * @param {inventoryAssets.INVENTORY_CATEGORIES[]} category - The categories to search within.
     * @param {RageShared.Inventory.Enums.ITEM_TYPES} type - The item type to search for.
     * @returns {RageShared.Inventory.Interfaces.IBaseItem[]} An array of found items.
     */
    getItemsInCategoryByType(category, type) {
        const foundItems = [];
        for (const [categoryName, items] of Object.entries(this.items)) {
            if (!category.includes(categoryName)) {
                continue;
            }
            for (const item of Object.values(items)) {
                if (item && item.type === type) {
                    foundItems.push(item);
                }
            }
        }
        return foundItems;
    }
    /**
     * Get an item by UUID
     * This method also looks for the item in clothes
     * @param hashKey Item hash key (.hash)
     * @returns RageShared.Inventory.Interfaces.IBaseItem | null
     */
    getItemByUUID(hashKey) {
        let item = Object.values(this.items.pockets).find((x) => x && x.hash === hashKey);
        if (!item)
            item = Object.values(this.items.clothes).find((x) => x && x.hash === hashKey);
        return item ?? null;
    }
    /**
     *
     * @param backpackHash backpack hash which the item will be looked on to
     * @param uuid item hash
     * @returns RageShared.Inventory.Interfaces.IBaseItem | null
     */
    getBackpackItemByUUID(backpackHash, uuid) {
        const itemData = this.getItemByUUID(backpackHash);
        if (!itemData || !itemData.items)
            return null;
        const itemInBackpack = Object.values(itemData.items).find((x) => x && x.hash === uuid);
        return itemInBackpack ?? null;
    }
    /**
     * Get the total count of items by the specified item type.
     *
     * @param {RageShared.Inventory.Enums.ITEM_TYPES} itemType - The type of item to count.
     * @returns {{ items: string[], count: number }} An object containing an array of item hashes involved and the total count of the items.
     */
    getAllCountByItemType(itemType) {
        let foundCount = 0;
        let itemsInvolved = [];
        for (const [key, value] of Object.entries(this.items)) {
            if (key === "clothes" || key === "quickUse")
                continue;
            const entryValue = Object.values(value);
            for (let i = 0; i < entryValue.length; i++) {
                const item = entryValue[i];
                if (item && item.type === itemType) {
                    foundCount += item.count;
                    itemsInvolved.push(item.hash);
                }
            }
        }
        return { items: itemsInvolved, count: foundCount };
    }
    getItemSlotComponentByHash(hashKey) {
        let foundItem = null;
        for (const [key, value] of Object.entries(this.items)) {
            for (let i = 0; i < Object.values(value).length; i++) {
                const itemData = value[i];
                if (!itemData)
                    continue;
                if (!itemData.hash)
                    continue;
                if (itemData.hash === hashKey) {
                    foundItem = { component: key, slot: i };
                    break;
                }
            }
        }
        return foundItem;
    }
    async getItemSlotComponentByHashKey(hashKey) {
        for (const [key, value] of Object.entries(this.items)) {
            for (let i = 0; i < Object.values(value).length; i++) {
                const item = value[i];
                if (!item)
                    continue;
                if (item.hash === hashKey) {
                    return { component: key, slot: i };
                }
            }
        }
        return null;
    }
    getCountStack(item) {
        if (item.type === null)
            return -1;
        let presset = Items_module_1.inventoryAssets.items[item.type];
        let count = item.count;
        let result = [];
        let length = Math.ceil(count / presset.maxStack);
        if (length <= 1)
            return [item];
        else
            for (let index = 0; index < length; index++) {
                count -= presset.maxStack;
                if (count > 0)
                    result.push({ ...item, count: presset.maxStack });
                else
                    result.push({ ...item, count: presset.maxStack + count });
            }
        return result;
    }
    loadInventory(player) {
        if (!player || !player.character || !this.items)
            return;
        for (let i = 0; i <= 13; i++) {
            if (this.items.clothes[i]) {
                const playerClothes = this.items.clothes[i];
                if (playerClothes && playerClothes.key && playerClothes.isPlaced && playerClothes.type !== null) {
                    const data = playerClothes.key.replace(playerClothes.type, "");
                    this.loadClothes(player, i, utils_module_1.Utils.tryParse(data));
                }
            }
            else {
                this.removeClothes(player, i);
            }
        }
    }
    setInventory(player) {
        try {
            let data = { pockets: this.items.pockets };
            _api_1.RAGERP.cef.emit(player, "inventory", "setMaxWeight", this.getWeight());
            _api_1.RAGERP.cef.emit(player, "inventory", "setInventory", data);
            _api_1.RAGERP.cef.emit(player, "inventory", "setQuickUseItems", this.quickUse);
            _api_1.RAGERP.cef.emit(player, "inventory", "setClothes", this.items.clothes);
            const droppedItems = ItemObject_class_1.ItemObject.fetchInRange(player, 2);
            const groundItems = {};
            for (let i = 0; i < 24; i++) {
                groundItems[i] = droppedItems[i] ?? null;
            }
            _api_1.RAGERP.cef.emit(player, "inventory", "setDroppedItems", groundItems);
            this.save(player);
        }
        catch (err) {
            console.error("error at inventory.setInventory | ", err);
        }
    }
    async save(player) {
        if (!player.character)
            return;
        await _api_1.RAGERP.database
            .getRepository(Inventory_entity_1.InventoryItemsEntity)
            .update({ id: player.character.items.id }, { pockets: this.items.pockets, clothes: this.items.clothes, quickUse: this.quickUse })
            .catch((err) => console.log(err.message));
    }
    //#region Weapon
    isWeapon(item) {
        return item.typeCategory === 2 /* RageShared.Inventory.Enums.ITEM_TYPE_CATEGORY.TYPE_WEAPON */;
    }
    isAmmoItem(item) {
        return item.typeCategory === 3 /* RageShared.Inventory.Enums.ITEM_TYPE_CATEGORY.TYPE_AMMO */;
    }
    async reloadWeaponAmmo(player, itemHash) {
        try {
            if (player.fastSlotActive === null || player.fastSlotActive < 0)
                return;
            let ammoHash = player.getVariable("ammoHash");
            const weaponGroup = await player.callProc("client::proc:getWeaponTypeGroup", [player.weapon]);
            if (!weaponGroup || weaponGroup === 3566412288 /* RageShared.Inventory.Enums.WEAPON_GROUP.UNKNOWN */)
                return;
            const ammoTypeMap = {
                [416676503 /* RageShared.Inventory.Enums.WEAPON_GROUP.HANDGUNS */]: "pistol_ammo" /* RageShared.Inventory.Enums.ITEM_TYPES.ITEM_TYPE_PISTOLAMMO */,
                [3337201152 /* RageShared.Inventory.Enums.WEAPON_GROUP.SUBMACHINE */]: "smg_ammo" /* RageShared.Inventory.Enums.ITEM_TYPES.ITEM_TYPE_SMGAMMO */,
                [860033945 /* RageShared.Inventory.Enums.WEAPON_GROUP.SHOTGUN */]: "shotgun_ammo" /* RageShared.Inventory.Enums.ITEM_TYPES.ITEM_TYPE_SHOTGUNAMMO */,
                [970310034 /* RageShared.Inventory.Enums.WEAPON_GROUP.ASSAULTRIFLE */]: "rifle_ammo" /* RageShared.Inventory.Enums.ITEM_TYPES.ITEM_TYPE_RIFLEAMMO */,
                [1159398588 /* RageShared.Inventory.Enums.WEAPON_GROUP.LIGHTMACHINE */]: "mg_ammo" /* RageShared.Inventory.Enums.ITEM_TYPES.ITEM_TYPE_MGAMMO */,
                [3082541095 /* RageShared.Inventory.Enums.WEAPON_GROUP.SNIPER */]: "rifle_ammo" /* RageShared.Inventory.Enums.ITEM_TYPES.ITEM_TYPE_RIFLEAMMO */
            };
            const expectedItemHash = ammoTypeMap[weaponGroup];
            if (itemHash !== expectedItemHash)
                return;
            const fullAmmo = this.getAllCountByItemType(itemHash);
            if (!fullAmmo || !fullAmmo.items || !fullAmmo.items.length)
                return;
            if (ammoHash) {
                ammoHash.items = fullAmmo.items;
                ammoHash.count = fullAmmo.count;
            }
            else {
                ammoHash = fullAmmo;
            }
            player.setVariable("ammoHash", ammoHash);
            player.setVariable("itemAsAmmo", fullAmmo.items[0]);
            player.setWeaponAmmo(player.weapon, fullAmmo.count);
        }
        catch (err) {
            console.error("error at inventory.reloadWeaponAmmo | ", err);
        }
    }
    hasPistolItem() {
        let pistols = new Set([
            "weapon_pistol",
            "weapon_pistol_mk2",
            "weapon_combatpistol",
            "weapon_appistol",
            "weapon_stungun",
            "weapon_pistol50",
            "weapon_snspistol",
            "weapon_snspistol_mk2",
            "weapon_heavypistol",
            "weapon_vintagepistol",
            "weapon_flaregun",
            "weapon_marksmanpistol",
            "weapon_revolver",
            "weapon_revolvermk2",
            "weapon_doubleaction",
            "weapon_raypistol",
            "weapon_ceramicpistol",
            "weapon_navyrevolver",
            "weapon_gadgetpistol"
        ]);
        for (const [category, categoryItems] of Object.entries(this.items)) {
            if (category === "clothes" || category === "quickUse")
                continue;
            for (const item of Object.values(categoryItems)) {
                if (item === null)
                    continue;
                if (pistols.has(item.type)) {
                    return true;
                }
            }
        }
        return false;
    }
    hasShotgun() {
        let shotguns = new Set([
            "weapon_pumpshotgun",
            "weapon_pumpshotgun_mk2",
            "weapon_sawnoffshotgun",
            "weapon_assaultshotgun",
            "weapon_bullpupshotgun",
            "weapon_mukset",
            "weapon_heavyshotgun",
            "weapon_doublebarrelshotgun",
            "weapon_autoshotgun",
            "weapon_combatshotgun"
        ]);
        for (const [category, categoryItems] of Object.entries(this.items)) {
            if (category === "clothes" || category === "quickUse")
                continue;
            for (const item of Object.values(categoryItems)) {
                if (item === null)
                    continue;
                if (shotguns.has(item.type)) {
                    return true;
                }
            }
        }
        return false;
    }
    hasAssault() {
        const assaultrifles = new Set([
            "weapon_assaultrifle",
            "weapon_assaultrifle_mk2",
            "weapon_carbinerifle",
            "weapon_carbinerifle_mk2",
            "weapon_advancedrifle",
            "weapon_specialcarbine",
            "weapon_specialcarbine_mk2",
            "weapon_bullpuprifle",
            "weapon_bullpuprifle_mk2",
            "weapon_compactrifle"
        ]);
        let foundAssaultRifle = false;
        for (const [category, categoryItems] of Object.entries(this.items)) {
            if (category === "clothes" || category === "quickUse")
                continue;
            for (const itemValue of Object.values(categoryItems)) {
                if (itemValue === null)
                    continue;
                if (assaultrifles.has(itemValue.type)) {
                    foundAssaultRifle = true;
                    break;
                }
            }
        }
        return foundAssaultRifle;
    }
    hasSMG() {
        const smg = new Set(["weapon_microsmg", "weapon_smg", "weapon_smg_mk2", "weapon_assaultsmg", "weapon_combatpdw", "weapon_machinepistol", "weapon_minismg", "weapon_raycarbine"]);
        let foundPistol = false;
        for (const [category, categoryItems] of Object.entries(this.items)) {
            if (category === "clothes" || category === "quickUse")
                continue;
            for (const itemValue of Object.values(categoryItems)) {
                if (itemValue === null)
                    continue;
                if (smg.has(itemValue.type)) {
                    foundPistol = true;
                    break;
                }
            }
        }
        return foundPistol;
    }
    hasWeaponInFastSlot(type) {
        for (const itemInFastSlot of Object.values(this.quickUse)) {
            if (!itemInFastSlot) {
                return false;
            }
            const item = this.items[itemInFastSlot.component][itemInFastSlot.id];
            if (item && item.type === type) {
                return true;
            }
        }
        return false;
    }
    //#endregion
    getWeight() {
        let weight = this.weight;
        if (this.items.clothes[7 /* RageShared.Inventory.Enums.INVENTORY_CLOTHING.TYPE_BACKPACK */]?.isPlaced) {
            weight += Assets_module_1.backpackWeight[this.items.clothes[7 /* RageShared.Inventory.Enums.INVENTORY_CLOTHING.TYPE_BACKPACK */].quality];
        }
        return weight;
    }
    getItemsWeight() {
        let weight = 0;
        let pocketItems = Object.values(this.items["pockets"]);
        for (let i = 0; i < pocketItems.length; i++) {
            const item = pocketItems[i];
            if (item !== null) {
                weight += item.weight;
            }
        }
        return weight;
    }
    checkWeight(newaddition) {
        let totalweight = this.getWeight();
        let takenweight = this.getItemsWeight();
        let difference = totalweight - takenweight;
        if (difference < newaddition)
            return true;
        return false;
    }
    async dropItem(player, itemData) {
        return await (0, DropItem_module_1.dropInventoryItem)(player, itemData).catch((err) => console.log("dropItem: ", err));
    }
    splitStack(player, data) {
        return (0, SplitItem_module_1.splitInventoryItem)(player, data);
    }
    async addCountToPlayerItem(player, item, count) {
        try {
            if (item.type === null)
                return;
            const findItem = this.getItemAndStack(item.type);
            if (findItem && findItem.length) {
                const playerItem = findItem.find((e) => e.count < e.maxStack) || findItem[0];
                const currentCount = playerItem.count;
                const maxStack = playerItem.maxStack;
                const remainingCount = Math.max(0, currentCount + count - maxStack);
                const newCount = Math.min(currentCount + count, maxStack);
                playerItem.count = newCount;
                if (remainingCount > 0) {
                    const newItem = { ...item, hash: (0, uuid_1.v4)(), count: remainingCount };
                    await this.addPlayerItem(newItem);
                }
            }
            else {
                item = { ...item, hash: (0, uuid_1.v4)(), count: count };
                const result = await this.addPlayerItem(item);
                if (!result)
                    return false;
            }
            this.setInventory(player);
            return true;
        }
        catch (err) {
            console.error("An error occurred at inventory.addPlayerItemCount: ", err);
            return false;
        }
    }
    async manageFastSlots(player, event) {
        await (0, Quickuse_module_1.manageInventoryFastSlot)(player, event);
    }
    checkQuickUse(component, slot) {
        let fastSlot = -1;
        for (let [index, e] of Object.entries(this.quickUse)) {
            if (!e)
                continue;
            if (e.component === component && e.id === slot) {
                fastSlot = parseInt(index);
                break;
            }
        }
        return fastSlot;
    }
    startUsingItem(player, description, time, data, handler) {
        this.progressBar = new InteractionProgress_class_1.InteractProgressBar(player, description, time, data, handler);
    }
}
exports.Inventory = Inventory;
