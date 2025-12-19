"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemObject = void 0;
/**
 * Class representing an item object in the game.
 */
class ItemObject {
    /**
     * Creates an instance of ItemObject.
     * @param data - The data to initialize the item object.
     */
    constructor(data) {
        /** The game object representing the item, if it exists. */
        this.object = null;
        /** Timeout for removing the item object after a certain period. */
        this.timeout = null;
        this.dimension = data.dimension || 0;
        this.coords = data.coords;
        this.rotation = data.rotation;
        this.collision = data.collision;
        this.range = data.range;
        this.itemData = data.itemData;
        this.hash = this.itemData.hash;
        this.object = mp.objects.new(mp.joaat(this.itemData.modelHash ?? "prop_food_bag1"), this.coords, {
            rotation: new mp.Vector3(data.rotation.x, data.rotation.y, data.rotation.z)
        });
        this.update();
        this.timeout = setTimeout(() => {
            if (ItemObject.List.has(this.hash)) {
                this.remove();
            }
        }, 300000);
        ItemObject.List.set(this.hash, this);
    }
    /**
     * Updates the item object properties in the game.
     */
    async update() {
        if (!this.object || !mp.objects.exists(this.object))
            return;
        this.object.setVariables({ is_item: true, itemData: JSON.stringify(this.itemData) });
    }
    /**
     * Removes the item object from the game and clears the timeout.
     */
    remove() {
        if (this.object && mp.objects.exists(this.object)) {
            this.object.destroy();
        }
        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }
        ItemObject.List.delete(this.hash);
    }
    /**
     * Fetches item objects within a certain range of a player.
     * @param player - The player to check the range from.
     * @param range - The range within which to fetch item objects. Defaults to 1.
     * @returns An array of item objects within the specified range.
     */
    static fetchInRange(player, range = 1) {
        const result = [];
        for (const item of ItemObject.List.values()) {
            if (player.dist(item.coords) <= range) {
                result.push(item.itemData);
            }
        }
        return result;
    }
    /**
     * Retrieves an item object by its hash.
     * @param hash - The hash of the item object to retrieve.
     * @returns The item object with the specified hash, or null if not found.
     */
    static getItem(hash) {
        const item = ItemObject.List.get(hash);
        return item ? item.itemData : null;
    }
    /**
     * Deletes a dropped item object by its hash.
     * @param hash - The hash of the item object to delete.
     */
    static deleteDroppedItemByHash(hash) {
        const item = ItemObject.List.get(hash);
        if (item)
            item.remove();
    }
}
exports.ItemObject = ItemObject;
/** Map to store all item objects by their hash. */
ItemObject.List = new Map();
