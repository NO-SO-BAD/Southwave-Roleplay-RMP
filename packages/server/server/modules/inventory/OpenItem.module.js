"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.openInventoryItem = void 0;
const openInventoryItem = (player, data) => {
    try {
        let { item } = JSON.parse(data);
        if (!item)
            return;
        switch (item.type) {
            //backpack?...
            default:
                return;
        }
    }
    catch (err) {
        console.log("openInventoryItem err: ", err);
    }
};
exports.openInventoryItem = openInventoryItem;
