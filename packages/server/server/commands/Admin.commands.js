"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _api_1 = require("@api");
const Character_entity_1 = require("@entities/Character.entity");
const Items_module_1 = require("@modules/inventory/Items.module");
const index_1 = require("@shared/index");
const Admin_asset_1 = require("@assets/Admin.asset");
const NativeMenu_class_1 = require("@classes/NativeMenu.class");
_api_1.RAGERP.commands.add({
    name: "goto",
    adminlevel: 1 /* RageShared.Enums.ADMIN_LEVELS.LEVEL_ONE */,
    run: (player, fulltext, targetorpos) => {
        const showAvailableLocations = () => {
            _api_1.RAGERP.chat.sendSyntaxError(player, "/goto [player/location]");
            const keys = Object.keys(Admin_asset_1.adminTeleports);
            for (let i = 0; i < keys.length; i += 8) {
                const chunk = keys.slice(i, i + 8);
                player.outputChatBox(`${"!{#ffd200}" /* RageShared.Enums.STRINGCOLORS.YELLOW */}Available locations: ${"!{#afafaf}" /* RageShared.Enums.STRINGCOLORS.GREY */} ${chunk.join(", ")}`);
            }
        };
        if (!fulltext.length || !targetorpos.length) {
            showAvailableLocations();
            return;
        }
        const targetplayer = mp.players.getPlayerByName(targetorpos);
        if (targetplayer && mp.players.exists(targetplayer)) {
            player.position = targetplayer.position;
            player.dimension = targetplayer.dimension;
            player.showNotify("info" /* RageShared.Enums.NotifyType.TYPE_INFO */, `You teleported to ${targetplayer.name}`);
        }
        else {
            const targetpos = Admin_asset_1.adminTeleports[targetorpos];
            if (targetpos) {
                player.position = targetpos;
                player.showNotify("info" /* RageShared.Enums.NotifyType.TYPE_INFO */, `You teleported to ${targetorpos}`);
            }
            else {
                showAvailableLocations();
            }
        }
    }
});
_api_1.RAGERP.commands.add({
    name: "gethere",
    adminlevel: 1 /* RageShared.Enums.ADMIN_LEVELS.LEVEL_ONE */,
    run: (player, fulltext, target) => {
        if (!fulltext.length || !target.length) {
            return _api_1.RAGERP.chat.sendSyntaxError(player, "/gethere [player]");
        }
        const targetplayer = mp.players.getPlayerByName(target);
        if (!targetplayer || !mp.players.exists(targetplayer) || !targetplayer.character) {
            return player.showNotify("error" /* RageShared.Enums.NotifyType.TYPE_ERROR */, "Invalid player specified.");
        }
        if (targetplayer.vehicle) {
            targetplayer.vehicle.position = player.position;
            targetplayer.vehicle.dimension = player.dimension;
        }
        targetplayer.position = player.position;
        targetplayer.dimension = player.dimension;
        targetplayer.showNotify("info" /* RageShared.Enums.NotifyType.TYPE_INFO */, `Admin ${player.name} has teleported you to their position.`);
        player.showNotify("info" /* RageShared.Enums.NotifyType.TYPE_INFO */, `You teleported ${targetplayer.name} to your position.`);
    }
});
_api_1.RAGERP.commands.add({
    name: "ah",
    aliases: ["adminhelp", "admincmds", "acmds"],
    adminlevel: 1,
    run: (player) => {
        const adminCommandsByLevel = {};
        const adminLevels = {
            1: "!{#14AA0B}LEVEL 1",
            2: "!{#14AA0B}LEVEL 2",
            3: "!{#14AA0B}LEVEL 3",
            4: "!{#0C66D8}LEVEL 4",
            5: "!{#0C66D8}LEVEL 5",
            6: "!{#fa0339}LEVEL 6"
        };
        _api_1.RAGERP.commands
            .getallCommands()
            .filter((cmd) => {
            return player.character && typeof cmd.adminlevel === "number" && cmd.adminlevel > 0 && cmd.adminlevel <= player.character.adminlevel;
        })
            .forEach((cmd) => {
            if (!cmd.adminlevel)
                return;
            if (!adminCommandsByLevel[cmd.adminlevel]) {
                adminCommandsByLevel[cmd.adminlevel] = [];
            }
            adminCommandsByLevel[cmd.adminlevel].push(`/${cmd.name}`);
        });
        player.outputChatBox("!{red}____________[ADMIN COMMANDS]____________");
        for (const level in adminCommandsByLevel) {
            if (adminCommandsByLevel.hasOwnProperty(level)) {
                const commands = adminCommandsByLevel[level];
                const itemsPerLog = 5;
                for (let i = 0; i < commands.length; i += itemsPerLog) {
                    const endIndex = Math.min(i + itemsPerLog, commands.length);
                    const currentItems = commands.slice(i, endIndex);
                    player.outputChatBox(`${adminLevels[level]}!{white}: ${currentItems.join(", ")}`);
                }
            }
        }
    }
});
_api_1.RAGERP.commands.add({
    name: "a",
    aliases: ["adminchat"],
    adminlevel: 1 /* RageShared.Enums.ADMIN_LEVELS.LEVEL_ONE */,
    run: (player, fulltext) => {
        if (!fulltext.length)
            return _api_1.RAGERP.chat.sendSyntaxError(player, "/a [text]");
        const admins = mp.players.toArray().filter((x) => x.character && x.character.adminlevel > 0);
        admins.forEach((admin) => {
            admin.outputChatBox(`!{#ffff00}[A] ${player.name}: ${fulltext}`);
        });
    }
});
_api_1.RAGERP.commands.add({
    name: "admins",
    adminlevel: 1 /* RageShared.Enums.ADMIN_LEVELS.LEVEL_ONE */,
    run: (player) => {
        player.outputChatBox(`${"!{#32cd32}" /* RageShared.Enums.STRINGCOLORS.GREEN */}____________[ONLINE ADMINS]____________`);
        mp.players.forEach((target) => {
            if (target && target.character && target.character.adminlevel) {
                player.outputChatBox(`${target.name} as level ${target.character.adminlevel} admin.`);
            }
        });
    }
});
_api_1.RAGERP.commands.add({
    name: "veh",
    aliases: ["vehicle", "spawnveh", "spawncar"],
    adminlevel: 1 /* RageShared.Enums.ADMIN_LEVELS.LEVEL_ONE */,
    run: (player, fullText, vehicleModel) => {
        if (!fullText.length || !vehicleModel.length)
            return _api_1.RAGERP.chat.sendSyntaxError(player, "/veh [vehiclemodel]");
        const vehicle = new _api_1.RAGERP.entities.vehicles.new(5 /* RageShared.Vehicles.Enums.VEHICLETYPES.ADMIN */, vehicleModel, player.position, player.heading, player.dimension);
        player.showNotify("success" /* RageShared.Enums.NotifyType.TYPE_SUCCESS */, `Successfully spawned ${vehicleModel} (${vehicle.getId()})`);
        _api_1.RAGERP.chat.sendAdminWarning(4284696575 /* RageShared.Enums.HEXCOLORS.LIGHTRED */, `AdmWarn: ${player.name} (${player.id}) has spawned a vehicle (Model: ${vehicleModel} | ID: ${vehicle.getId()}).`);
    }
});
_api_1.RAGERP.commands.add({
    name: "dim",
    aliases: ["setdimension", "setdim"],
    adminlevel: 1 /* RageShared.Enums.ADMIN_LEVELS.LEVEL_ONE */,
    run: (player, fullText, target, dimension) => {
        if (!fullText.length || !target.length || !dimension.length)
            return _api_1.RAGERP.chat.sendSyntaxError(player, "/setdimension [target] [dimension]");
        const parseTarget = parseInt(target);
        if (isNaN(parseTarget))
            return _api_1.RAGERP.chat.sendSyntaxError(player, "/setdimension [target] [dimension]");
        const parseDimension = parseInt(dimension);
        if (isNaN(parseDimension))
            return _api_1.RAGERP.chat.sendSyntaxError(player, "/setdimension [target] [dimension]");
        const targetPlayer = mp.players.at(parseTarget);
        if (!targetPlayer || !mp.players.exists(targetPlayer))
            return _api_1.RAGERP.chat.sendSyntaxError(player, "/setdimension [target] [dimension]");
        targetPlayer.dimension = parseDimension;
        player.showNotify("success" /* RageShared.Enums.NotifyType.TYPE_SUCCESS */, `You've successfully changed ${targetPlayer.name} dimension to ${parseDimension}`);
        targetPlayer.showNotify("info" /* RageShared.Enums.NotifyType.TYPE_INFO */, `Administrator ${player.name} changed your dimension to ${parseDimension}`);
    }
});
_api_1.RAGERP.commands.add({
    name: "makeadmin",
    aliases: ["setadmin"],
    adminlevel: 6 /* RageShared.Enums.ADMIN_LEVELS.LEVEL_SIX */,
    description: "Make a player admin",
    run: async (player, fullText, target, level) => {
        if (!fullText.length || !target.length || !level.length)
            return _api_1.RAGERP.chat.sendSyntaxError(player, "/makeadmin [target] [level]");
        const targetId = parseInt(target);
        const adminLevel = parseInt(level);
        if (adminLevel < 0 || adminLevel > 6)
            return player.showNotify("error" /* RageShared.Enums.NotifyType.TYPE_ERROR */, "Admin level must be between 0 and 6");
        const targetPlayer = mp.players.at(targetId);
        if (!targetPlayer || !mp.players.exists(targetPlayer) || !targetPlayer.character)
            return player.showNotify("error" /* RageShared.Enums.NotifyType.TYPE_ERROR */, "Invalid player specified.");
        targetPlayer.character.adminlevel = adminLevel;
        targetPlayer.setVariable("adminLevel", targetPlayer.character.adminlevel);
        await _api_1.RAGERP.database.getRepository(Character_entity_1.CharacterEntity).update(targetPlayer.character.id, { adminlevel: adminLevel });
        player.showNotify("success" /* RageShared.Enums.NotifyType.TYPE_SUCCESS */, `You've successfully made ${targetPlayer.name} an admin level ${adminLevel}`);
        targetPlayer.showNotify("info" /* RageShared.Enums.NotifyType.TYPE_INFO */, `${player.name} has made you an admin level ${adminLevel}`);
        _api_1.RAGERP.chat.sendAdminWarning(4284696575 /* RageShared.Enums.HEXCOLORS.LIGHTRED */, adminLevel > 0
            ? `AdmWarn: ${player.name} (${player.id}) has made ${targetPlayer.name} (${targetPlayer.id}) a level ${adminLevel} admin.`
            : `AdmWarn: ${player.name} (${player.id}) has removed ${targetPlayer.name} admin level.`);
        _api_1.RAGERP.commands.reloadCommands(targetPlayer);
    }
});
_api_1.RAGERP.commands.add({
    name: "spectate",
    aliases: ["spec"],
    adminlevel: 1 /* RageShared.Enums.ADMIN_LEVELS.LEVEL_ONE */,
    description: "Spectate a player",
    run: (player, fullText, target) => {
        if (fullText.length === 0)
            return player.outputChatBox("Usage: /spectate [target/off]");
        const parsedTarget = parseInt(target);
        if (isNaN(parsedTarget) && target === "off") {
            player.call("client::spectate:stop");
            player.setVariable("isSpectating", false);
            if (player.lastPosition)
                player.position = player.lastPosition;
            return;
        }
        const targetPlayer = mp.players.at(parsedTarget);
        if (!targetPlayer || !mp.players.exists(targetPlayer))
            return;
        if (targetPlayer.id === player.id)
            return player.outputChatBox("You can't spectate yourself.");
        if (!player || !mp.players.exists(player))
            return;
        if (player.getVariable("isSpectating")) {
            player.call("client::spectate:stop");
            if (player.lastPosition)
                player.position = player.lastPosition;
        }
        else {
            player.lastPosition = player.position;
            player.position = new mp.Vector3(targetPlayer.position.x, targetPlayer.position.y, targetPlayer.position.z - 15);
            if (!player || !mp.players.exists(player) || !targetPlayer || !mp.players.exists(targetPlayer))
                return;
            player.call("client::spectate:start", [target]);
        }
        player.setVariable("isSpectating", !player.getVariable("isSpectating"));
    }
});
_api_1.RAGERP.commands.add({
    name: "destroyveh",
    aliases: ["destroyvehicles", "destroycar", "destroycars"],
    description: "Destroy admin spawned vehicles",
    adminlevel: 1 /* RageShared.Enums.ADMIN_LEVELS.LEVEL_ONE */,
    run: (player) => {
        if (player.vehicle) {
            const vehicleData = _api_1.RAGERP.entities.vehicles.manager.at(player.vehicle.id);
            if (!vehicleData)
                return;
            vehicleData.destroy();
            return;
        }
        const adminVehicles = _api_1.RAGERP.entities.vehicles.pool.filter((x) => x.type === 5 /* RageShared.Vehicles.Enums.VEHICLETYPES.ADMIN */);
        adminVehicles.forEach((vehicle) => vehicle.destroy());
        player.showNotify("success" /* RageShared.Enums.NotifyType.TYPE_SUCCESS */, `You've successfully deleted all admin spawned vehicles.`);
        _api_1.RAGERP.chat.sendAdminWarning(4284696575 /* RageShared.Enums.HEXCOLORS.LIGHTRED */, `AdmWarn: ${player.name} (${player.id}) has destroyed all admin spawned vehicles.`);
    }
});
_api_1.RAGERP.commands.add({
    name: "revive",
    adminlevel: 1 /* RageShared.Enums.ADMIN_LEVELS.LEVEL_ONE */,
    description: "Revive a player",
    run: async (player, fulltext, target) => {
        if (!fulltext.length || !target.length)
            return player.outputChatBox("Usage: /revive [targetplayer]");
        const parseTarget = parseInt(target);
        if (isNaN(parseTarget))
            return player.outputChatBox("Usage: /revive [targetplayer]");
        const targetPlayer = mp.players.getPlayerByName(target);
        if (!targetPlayer || !mp.players.exists(targetPlayer) || !targetPlayer.character)
            return player.showNotify("error" /* RageShared.Enums.NotifyType.TYPE_ERROR */, "Invalid player specified.");
        if (targetPlayer.character.deathState !== 1 /* RageShared.Players.Enums.DEATH_STATES.STATE_INJURED */)
            return player.showNotify("error" /* RageShared.Enums.NotifyType.TYPE_ERROR */, "That player is not injured.");
        targetPlayer.spawn(targetPlayer.position);
        targetPlayer.character.deathState = 0 /* RageShared.Players.Enums.DEATH_STATES.STATE_NONE */;
        targetPlayer.character.setStoreData(player, "isDead", false);
        targetPlayer.setVariable("isDead", false);
        targetPlayer.stopScreenEffect("DeathFailMPIn");
        targetPlayer.stopAnimation();
        await targetPlayer.character.save(targetPlayer);
        player.showNotify("success" /* RageShared.Enums.NotifyType.TYPE_SUCCESS */, `You successfully revived ${targetPlayer.name}`);
        targetPlayer.showNotify("success" /* RageShared.Enums.NotifyType.TYPE_SUCCESS */, `You were revived by admin ${player.name}`);
        _api_1.RAGERP.chat.sendAdminWarning(4284696575 /* RageShared.Enums.HEXCOLORS.LIGHTRED */, `AdmWarn: ${player.name} (${player.id}) has revived player ${targetPlayer.name} (${targetPlayer.id}).`);
    }
});
_api_1.RAGERP.commands.add({
    name: "givemoney",
    aliases: ["givecash"],
    adminlevel: 6 /* RageShared.Enums.ADMIN_LEVELS.LEVEL_SIX */,
    run: (player, fulltext, target, amount) => {
        if (!fulltext.length || !target.length || !amount.length)
            return _api_1.RAGERP.chat.sendSyntaxError(player, "/givemoney [player] [amount]");
        const targetPlayer = mp.players.getPlayerByName(target);
        if (!targetPlayer || !mp.players.exists(targetPlayer) || !targetPlayer.character)
            return player.showNotify("error" /* RageShared.Enums.NotifyType.TYPE_ERROR */, "Invalid player specified.");
        const money = parseInt(amount);
        if (isNaN(money) || money > 50000000)
            return player.showNotify("error" /* RageShared.Enums.NotifyType.TYPE_ERROR */, "Invalid amount of money specified.");
        targetPlayer.giveMoney(money);
        targetPlayer.showNotify("info" /* RageShared.Enums.NotifyType.TYPE_INFO */, `You received ${money} cash from admin ${player.name}`);
        _api_1.RAGERP.chat.sendAdminWarning(4284696575 /* RageShared.Enums.HEXCOLORS.LIGHTRED */, `AdmWarn: ${player.name} (${player.id}) has given ${targetPlayer.name} (${targetPlayer.id}) $${money}.`);
    }
});
_api_1.RAGERP.commands.add({
    name: "giveclothes",
    adminlevel: 6 /* RageShared.Enums.ADMIN_LEVELS.LEVEL_SIX */,
    run: (player, fulltext, target, item, comp, drawable, texture) => {
        if (!fulltext.length || !target.length || !item.length || !comp.length || !drawable.length || !texture.length) {
            player.outputChatBox(`Usage: /giveclothes [player] [cloth_name] [component] [drawable] [texture]`);
            player.outputChatBox(`Clothing Names: ${Object.values(Items_module_1.inventoryAssets.items)
                .filter((x) => x.typeCategory === 0 /* RageShared.Inventory.Enums.ITEM_TYPE_CATEGORY.TYPE_CLOTHING */)
                .map((e) => e.type.toLowerCase())
                .join(", ")}`);
            return;
        }
        const targetplayer = mp.players.getPlayerByName(target);
        if (!targetplayer || !mp.players.exists(targetplayer) || !targetplayer.character || !targetplayer.character.inventory)
            return player.showNotify("error" /* RageShared.Enums.NotifyType.TYPE_ERROR */, "Invalid player specified.");
        const itemData = targetplayer.character.inventory.addClothingItem(item, { component: parseInt(comp), drawable: parseInt(drawable), texture: parseInt(texture) });
        targetplayer.showNotify(itemData ? "success" /* RageShared.Enums.NotifyType.TYPE_SUCCESS */ : "error" /* RageShared.Enums.NotifyType.TYPE_ERROR */, itemData ? `You received a ${itemData.name}` : `An error occurred giving u the item.`);
        player.showNotify(itemData ? "success" /* RageShared.Enums.NotifyType.TYPE_SUCCESS */ : "error" /* RageShared.Enums.NotifyType.TYPE_ERROR */, itemData ? `You gave a ${itemData.name} to ${targetplayer.name} (${targetplayer.id})` : `An error occurred giving the item to ${targetplayer.name}.`);
    }
});
_api_1.RAGERP.commands.add({
    name: "giveitem",
    adminlevel: 6 /* RageShared.Enums.ADMIN_LEVELS.LEVEL_SIX */,
    run: (player, fulltext, target, item, count) => {
        if (!fulltext.length || !target.length || !item.length)
            return player.outputChatBox("Usage: /giveitem [player] [item type] [count]");
        const targetplayer = mp.players.getPlayerByName(target);
        if (!targetplayer || !mp.players.exists(targetplayer) || !targetplayer.character || !targetplayer.character.inventory) {
            return player.showNotify("error" /* RageShared.Enums.NotifyType.TYPE_ERROR */, "Invalid player specified.");
        }
        const itemData = targetplayer.character.inventory.addItem(item);
        if (itemData) {
            itemData.count = isNaN(parseInt(count)) ? 0 : parseInt(count);
            if (!itemData.options.includes("split") && itemData.count > 1)
                itemData.options.push("split");
        }
        targetplayer.showNotify(itemData ? "success" /* RageShared.Enums.NotifyType.TYPE_SUCCESS */ : "error" /* RageShared.Enums.NotifyType.TYPE_ERROR */, itemData ? `You received a ${itemData.name} (x${itemData.count}) from admin ${player.name}` : `An error occurred giving u the item.`);
        player.showNotify(itemData ? "success" /* RageShared.Enums.NotifyType.TYPE_SUCCESS */ : "error" /* RageShared.Enums.NotifyType.TYPE_ERROR */, itemData ? `You spawned a ${itemData.name} (x${itemData.count}) to ${targetplayer.name} (${targetplayer.id})` : `An error occurred giving the item.`);
    }
});
_api_1.RAGERP.commands.add({
    name: "spawnitem",
    adminlevel: 6 /* RageShared.Enums.ADMIN_LEVELS.LEVEL_SIX */,
    run: async (player) => {
        const filteredItems = Object.values(Items_module_1.inventoryAssets.items).filter(item => item.typeCategory !== 0 /* RageShared.Inventory.Enums.ITEM_TYPE_CATEGORY.TYPE_CLOTHING */ &&
            item.typeCategory !== 1 /* RageShared.Inventory.Enums.ITEM_TYPE_CATEGORY.TYPE_PROP */);
        const menuItems = filteredItems.map((item, index) => ({
            uid: index,
            type: 0 /* RageShared.Enums.NATIVEMENU_TYPES.TYPE_DEFAULT */,
            name: item.name,
        }));
        player.nativemenu = new NativeMenu_class_1.NativeMenu(player, 1, "Item Spawn", "Select an item to spawn", menuItems);
        try {
            const selectedData = await player.nativemenu.onItemSelected(player);
            if (!selectedData) {
                player.nativemenu?.destroy(player);
                return;
            }
            const selectedItemData = _api_1.RAGERP.utils.parseObject(selectedData);
            const selectedItem = filteredItems.find(item => item.name === selectedItemData.name);
            if (!selectedItem) {
                player.nativemenu?.destroy(player);
                return;
            }
            player.character?.inventory?.addItem(selectedItem.type);
            player.nativemenu?.destroy(player);
            _api_1.RAGERP.chat.sendAdminWarning(4284696575 /* RageShared.Enums.HEXCOLORS.LIGHTRED */, `${player.name} has spawned a ${selectedItemData.name}`);
        }
        catch (error) {
            console.error("Error handling menu selection:", error);
            player.nativemenu?.destroy(player);
        }
    }
});
