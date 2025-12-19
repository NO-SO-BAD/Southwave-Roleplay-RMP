"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.manageInventoryFastSlot = void 0;
const index_1 = require("@shared/index");
const Weapons_assets_1 = require("@assets/Weapons.assets");
const Items_module_1 = require("./Items.module");
async function giveWeaponByType(player, item, weaponGroup, itemType) {
    if (!mp.players.exists(player) || !player.character || !player.character.inventory)
        return;
    if (item.type === null)
        return;
    const fullAmmo = player.character.inventory.getAllCountByItemType(itemType);
    if (fullAmmo && fullAmmo.items.length) {
        const ammoCount = fullAmmo.count;
        player.giveWeaponEx(mp.joaat(item.type), ammoCount, item.ammoInClip);
        player.setVariable("ammoHash", fullAmmo);
        player.setVariable("itemAsAmmo", fullAmmo.items[0]);
    }
    else {
        player.giveWeaponEx(mp.joaat(item.type), 0);
        player.setVariable("ammoHash", null);
        player.setVariable("itemAsAmmo", null);
    }
}
const manageInventoryFastSlot = async (player, event) => {
    try {
        if (!mp.players.exists(player) || !player.character || !player.character.inventory)
            return;
        if (event.indexOf("k_fastslot") === -1)
            return;
        const key = parseInt(event[event.length - 1]);
        const fastslot = player.character.inventory.quickUse[key - 1];
        if (!fastslot)
            return null;
        const item = player.character.inventory.items[fastslot.component][fastslot.id];
        if (!item)
            return;
        if (player.character.inventory.isWeapon(item) && item.type) {
            if (player.cdata.quckUseDelay === true)
                return;
            if (player.weapon !== mp.joaat(item.type)) {
                player.removeAllWeapons();
                const weaponGroup = await player.callProc("client::proc:getWeaponTypeGroup", [mp.joaat(item.type)]);
                player.fastSlotActive = key - 1;
                if (weaponGroup) {
                    switch (weaponGroup) {
                        case 3566412288 /* RageShared.Inventory.Enums.WEAPON_GROUP.UNKNOWN */: {
                            player.giveWeaponEx(mp.joaat(item.type), 0);
                            return;
                        }
                        case 416676503 /* RageShared.Inventory.Enums.WEAPON_GROUP.HANDGUNS */: {
                            await giveWeaponByType(player, item, weaponGroup, "pistol_ammo" /* RageShared.Inventory.Enums.ITEM_TYPES.ITEM_TYPE_PISTOLAMMO */);
                            break;
                        }
                        case 3337201152 /* RageShared.Inventory.Enums.WEAPON_GROUP.SUBMACHINE */: {
                            await giveWeaponByType(player, item, weaponGroup, "smg_ammo" /* RageShared.Inventory.Enums.ITEM_TYPES.ITEM_TYPE_SMGAMMO */);
                            break;
                        }
                        case 860033945 /* RageShared.Inventory.Enums.WEAPON_GROUP.SHOTGUN */: {
                            await giveWeaponByType(player, item, weaponGroup, "shotgun_ammo" /* RageShared.Inventory.Enums.ITEM_TYPES.ITEM_TYPE_SHOTGUNAMMO */);
                            break;
                        }
                        case 970310034 /* RageShared.Inventory.Enums.WEAPON_GROUP.ASSAULTRIFLE */: {
                            await giveWeaponByType(player, item, weaponGroup, "rifle_ammo" /* RageShared.Inventory.Enums.ITEM_TYPES.ITEM_TYPE_RIFLEAMMO */);
                            break;
                        }
                        case 1159398588 /* RageShared.Inventory.Enums.WEAPON_GROUP.LIGHTMACHINE */: {
                            await giveWeaponByType(player, item, weaponGroup, "mg_ammo" /* RageShared.Inventory.Enums.ITEM_TYPES.ITEM_TYPE_MGAMMO */);
                            break;
                        }
                        case 3082541095 /* RageShared.Inventory.Enums.WEAPON_GROUP.SNIPER */: {
                            await giveWeaponByType(player, item, weaponGroup, "rifle_ammo" /* RageShared.Inventory.Enums.ITEM_TYPES.ITEM_TYPE_RIFLEAMMO */);
                            break;
                        }
                        default:
                            return;
                    }
                }
                player.setVariable("ammoType", Items_module_1.inventoryAssets.items[item.type].ammoType || "pistol");
                player.cdata.quckUseDelay = true;
                player.cdata.qucikSlotTimeout = setTimeout(() => {
                    if (!mp.players.exists(player))
                        return;
                    player.cdata.quckUseDelay = false;
                    clearTimeout(player.cdata.qucikSlotTimeout);
                }, 3000);
            }
            else {
                const currentAmmoInClip = await player.callProc("client::proc:getAmmoInClip", [player.weapon]);
                if (currentAmmoInClip >= 0) {
                    item.ammoInClip = currentAmmoInClip;
                    console.log(`Ammo in clip for ${player.name} is ${currentAmmoInClip} || ${item.ammoInClip}`);
                }
                // player.removeAllWeaponComponents(item.type);
                player.removeAllWeapons();
                player.setVariable("ammoHash", null);
                player.fastSlotActive = null;
                player.giveWeapon(Weapons_assets_1.weaponHash["unarmed"], 0);
            }
            return;
        }
        player.character.inventory.useItem(player, JSON.stringify({ item: item, source: { component: fastslot.component, slot: fastslot.id } }));
    }
    catch (err) {
        console.log("manageInventoryFastSlot err: ", err);
    }
};
exports.manageInventoryFastSlot = manageInventoryFastSlot;
