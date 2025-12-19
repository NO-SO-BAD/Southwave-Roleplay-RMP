"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _api_1 = require("@api");
const index_1 = require("@shared/index");
/**
 * Gets a player by their name or ID.
 * @param {string} stringornumber - The name or ID of the player.
 * @returns {PlayerMp | undefined} The player if found, otherwise undefined.
 */
mp.players.getPlayerByName = function (stringornumber) {
    if (!isNaN(parseInt(stringornumber))) {
        return mp.players.at(parseInt(stringornumber));
    }
    else {
        if (stringornumber.length < 3)
            return undefined;
        const players = mp.players.toArray();
        for (const player of players) {
            const [firstname] = player.name.split(" ");
            if (!firstname.toLowerCase().includes(stringornumber.toLowerCase()))
                continue;
            return player;
        }
    }
};
/**
 * Displays a notification to the player.
 * @param {RageShared.Enums.NotifyType} type - The type of notification.
 * @param {string} message - The message to display.
 * @param {"light" | "dark" | "colored"} [skin="dark"] - The skin style of the notification.
 */
mp.Player.prototype.showNotify = function (type, message, skin = "dark") {
    return _api_1.RAGERP.cef.emit(this, "notify", "show", { type, message, skin });
};
/**
 * Gets the admin level of the player.
 * @returns {number} The admin level of the player.
 */
mp.Player.prototype.getAdminLevel = function () {
    if (!this || !mp.players.exists(this) || !this.character)
        return 0;
    return this.character.adminlevel;
};
/**
 * Gives a weapon to the player.
 * @param {number} weapon - The weapon hash.
 * @param {number} totalAmmo - The total ammo for the weapon.
 * @param {number} [ammoInClip] - The ammo in the clip (optional).
 */
mp.Player.prototype.giveWeaponEx = function (weapon, totalAmmo, ammoInClip) {
    this.call("client::weapon:giveWeapon", [weapon, totalAmmo, ammoInClip]);
};
/**
 * Gets the player's roleplay name, optionally checking if they are wearing a mask.
 * @param {boolean} [checkmask=true] - Whether to check if the player is wearing a mask.
 * @returns {string} The roleplay name of the player.
 */
mp.Player.prototype.getRoleplayName = function (checkmask = true) {
    const player = this;
    if (!player || !mp.players.exists(player) || !player.character)
        return "Unknown";
    if (checkmask && player.character.inventory && player.character.inventory.isWearingClothingType(1 /* RageShared.Inventory.Enums.INVENTORY_CLOTHING.TYPE_MASK */)) {
        const itemData = player.character.inventory.items.clothes[1 /* RageShared.Inventory.Enums.INVENTORY_CLOTHING.TYPE_MASK */];
        if (!itemData)
            return player.name;
        return `Stranger ${itemData.hash.split("-")[0]}`;
    }
    return this.name;
};
/**
 * Requests collision at a specific location.
 * @param {number} x - The X coordinate.
 * @param {number} y - The Y coordinate.
 * @param {number} z - The Z coordinate.
 * @returns {Promise<void>} A promise that resolves when the collision is requested.
 */
mp.Player.prototype.requestCollisionAt = async function (x, y, z) {
    return await this.callProc("client::proc:requestCollisionAt", [x, y, z]);
};
/**
 * Starts a screen effect for the player.
 * @param {string} effectName - The name of the effect.
 * @param {number} [duration=3000] - The duration of the effect in milliseconds.
 * @param {boolean} [looped=true] - Whether the effect should be looped.
 */
mp.Player.prototype.startScreenEffect = function (effectName, duration = 3000, looped = true) {
    this.call("client::effects:startScreenEffect", [effectName, duration, looped]);
};
/**
 * Stops a screen effect for the player.
 * @param {string} effectName - The name of the effect.
 */
mp.Player.prototype.stopScreenEffect = function (effectName) {
    this.call("client::effects:stopScreenEffect", [effectName]);
};
/**
 * Sets the emote text for the player.
 * @param {Array4d} color - The color of the text.
 * @param {string} text - The emote text.
 * @param {number} [time=7] - The duration in seconds the text will be displayed.
 */
mp.Player.prototype.setEmoteText = function (color, text, time = 7) {
    this.setVariable("emoteTextData", JSON.stringify({ color, text }));
    if (this.emoteTimeout) {
        clearTimeout(this.emoteTimeout);
        this.emoteTimeout = null;
    }
    this.emoteTimeout = setTimeout(() => {
        this.setVariable("emoteTextData", null);
        clearTimeout(this.emoteTimeout);
        this.emoteTimeout = null;
    }, time * 1000);
};
/**
 * Gives money to the player.
 * @param {number} amount - The amount of money to give.
 * @param {string} [logMessage] - An optional log message.
 */
mp.Player.prototype.giveMoney = function (amount, logMessage) {
    if (!mp.players.exists(this) || !this.getVariable("loggedin") || !this.character)
        return;
    this.character.cash = this.character.cash + amount;
    this.character.setStoreData(this, "cash", this.character.cash);
};
mp.Player.prototype.attachObject = function (name, attached) {
    this.call("client::attachments:attach", [name, attached]);
};
