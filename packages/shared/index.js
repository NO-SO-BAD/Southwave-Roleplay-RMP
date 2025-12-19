"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RageShared = void 0;
var RageShared;
(function (RageShared) {
    let Inventory;
    (function (Inventory) {
        let Enums;
        (function (Enums) {
            Enums.INVENTORY_EQUIPMENTS = {
                hat: "0",
                mask: "1",
                glasses: "2",
                earRings: "3",
                chain: "4",
                tShirt: "5",
                top: "6",
                backpack: "7",
                wallet: "8",
                armour: "9",
                watch: "10",
                gloves: "11",
                pants: "12",
                shoes: "13"
            };
            let INVENTORY_CATEGORIES;
            (function (INVENTORY_CATEGORIES) {
                INVENTORY_CATEGORIES["CLOTHES"] = "clothes";
                INVENTORY_CATEGORIES["POCKETS"] = "pockets";
            })(INVENTORY_CATEGORIES = Enums.INVENTORY_CATEGORIES || (Enums.INVENTORY_CATEGORIES = {}));
        })(Enums = Inventory.Enums || (Inventory.Enums = {}));
    })(Inventory = RageShared.Inventory || (RageShared.Inventory = {}));
})(RageShared || (exports.RageShared = RageShared = {}));
