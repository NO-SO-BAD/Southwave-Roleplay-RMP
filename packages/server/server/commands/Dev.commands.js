"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _api_1 = require("@api");
const Assets_module_1 = require("@modules/inventory/Assets.module");
const index_1 = require("@shared/index");
const NativeMenu_class_1 = require("@classes/NativeMenu.class");
_api_1.RAGERP.commands.add({
    name: "gotopos",
    description: "Teleport to a x y z",
    adminlevel: 6 /* RageShared.Enums.ADMIN_LEVELS.LEVEL_SIX */,
    run: (player, fulltext, x, y, z) => {
        if (!fulltext.length || !x.length || !y.length || !z.length)
            return player.outputChatBox("Usage: /gotopos [x] [y] [z]");
        player.position = new mp.Vector3(parseFloat(x), parseFloat(y), parseFloat(z));
    }
});
_api_1.RAGERP.commands.add({
    name: "savepos",
    aliases: ["getpos", "mypos"],
    adminlevel: 6 /* RageShared.Enums.ADMIN_LEVELS.LEVEL_SIX */,
    run: (player) => {
        const [{ x, y, z }, heading] = [player.position, player.heading];
        console.log(`Position: new mp.Vector3(${x}, ${y}, ${z})`);
        console.log(`Heading: ${heading}`);
    }
});
_api_1.RAGERP.commands.add({
    name: "settime",
    adminlevel: 6 /* RageShared.Enums.ADMIN_LEVELS.LEVEL_SIX */,
    run: (player, fulltext, time) => {
        mp.world.time.set(parseInt(time), 0, 0);
    }
});
_api_1.RAGERP.commands.add({
    name: "sethealth",
    adminlevel: 6 /* RageShared.Enums.ADMIN_LEVELS.LEVEL_SIX */,
    run: (player, fulltext, health) => {
        player.health = parseInt(health);
    }
});
_api_1.RAGERP.commands.add({
    name: "clearinventory",
    adminlevel: 6 /* RageShared.Enums.ADMIN_LEVELS.LEVEL_SIX */,
    run: (player, fulltext, targetid) => {
        if (!targetid.length)
            return _api_1.RAGERP.chat.sendSyntaxError(player, "/clearinventory [playerid]");
        let target = mp.players.at(parseInt(targetid));
        if (!target || !mp.players.exists(target) || !target.character || !target.character.inventory)
            return;
        target.character.inventory.items = {
            pockets: Assets_module_1.inventorydataPresset.pockets,
            clothes: Assets_module_1.inventorydataPresset.clothes
        };
        target.character.inventory.quickUse = Assets_module_1.inventorydataPresset.quickUse;
        target.character.inventory.reloadClothes(target);
    }
});
// RAGERP.commands.add({
//     name: "giveweapon",
//     adminlevel: RageShared.Enums.ADMIN_LEVELS.LEVEL_SIX,
//     run: (player: PlayerMp, fulltext, weapon: RageShared.Inventory.Enums.ITEM_TYPES) => {
//         if (!player.character || !player.character.inventory) return;
//         const itemData = player.character.inventory.addItem(weapon);
//         if (!itemData || itemData.typeCategory !== RageShared.Inventory.Enums.ITEM_TYPE_CATEGORY.TYPE_WEAPON) return;
//         player.showNotify(
//             itemData ? RageShared.Enums.NotifyType.TYPE_SUCCESS : RageShared.Enums.NotifyType.TYPE_ERROR,
//             itemData ? `You received a ${itemData.name}` : `An error occurred giving u the item.`
//         );
//     }
// });
_api_1.RAGERP.commands.add({
    name: "setpage",
    adminlevel: 6 /* RageShared.Enums.ADMIN_LEVELS.LEVEL_SIX */,
    run: (player, fulltext, pagename) => {
        _api_1.RAGERP.cef.emit(player, "system", "setPage", pagename);
    }
});
_api_1.RAGERP.commands.add({
    name: "reloadclientside",
    adminlevel: 6 /* RageShared.Enums.ADMIN_LEVELS.LEVEL_SIX */,
    run: (player) => {
        //@ts-ignore
        mp.players.reloadResources();
    }
});
_api_1.RAGERP.commands.add({
    name: "testbbb",
    adminlevel: 6 /* RageShared.Enums.ADMIN_LEVELS.LEVEL_SIX */,
    run: (player) => {
        //@ts-ignore
        player.call("testcambro");
    }
});
_api_1.RAGERP.commands.add({
    name: "testnativemenu",
    adminlevel: 6 /* RageShared.Enums.ADMIN_LEVELS.LEVEL_SIX */,
    run: async (player) => {
        player.nativemenu = new NativeMenu_class_1.NativeMenu(player, 0, "Hello World", "This is a description", [
            { name: "test", type: 0 /* RageShared.Enums.NATIVEMENU_TYPES.TYPE_DEFAULT */, uid: 123 },
            { name: "test 2", type: 0 /* RageShared.Enums.NATIVEMENU_TYPES.TYPE_DEFAULT */, uid: 1232 },
            { name: "test 3", type: 0 /* RageShared.Enums.NATIVEMENU_TYPES.TYPE_DEFAULT */, uid: 1232 }
        ]);
        player.nativemenu.onItemSelected(player).then((res) => {
            if (!res)
                return player.nativemenu?.destroy(player);
            const data = _api_1.RAGERP.utils.parseObject(res);
            console.log("onItemSelected called, with result: ", data);
            switch (data.listitem) {
                case 0: {
                    console.log("player selected the first item in native menu");
                    return;
                }
                default: {
                    return console.log(`player selected index ${data.listitem} | name: ${data.name} | uid: ${data.uid}`);
                }
            }
        });
    }
});
_api_1.RAGERP.commands.add({
    name: "testitem",
    adminlevel: 6 /* RageShared.Enums.ADMIN_LEVELS.LEVEL_SIX */,
    run: async (player) => {
        if (!player.character || !player.character.inventory)
            return;
        const items = player.character.inventory.getItemsInCategoryByType([index_1.RageShared.Inventory.Enums.INVENTORY_CATEGORIES.POCKETS], "weapon_pistol" /* RageShared.Inventory.Enums.ITEM_TYPES.ITEM_TYPE_PISTOL */);
        if (!items.length)
            return;
        player.character.inventory.startUsingItem(player, "Press ESC to cancel this action", 5, {
            item: items[0],
            animDict: "mini@repair",
            animName: "fixing_a_player",
            flag: 16,
            attachObject: "item_toolbox"
        }, async () => {
            console.log("Hello world!");
        });
    }
});
_api_1.RAGERP.commands.add({
    adminlevel: 6 /* RageShared.Enums.ADMIN_LEVELS.LEVEL_SIX */,
    name: "testattach",
    run: (player, fullText, item, isAttach) => {
        player.attachObject(item, parseInt(isAttach) !== 0);
    }
});
