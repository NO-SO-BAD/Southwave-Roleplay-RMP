"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InteractProgressBar = void 0;
const _api_1 = require("@api");
/**
 * Represents a progress bar that appears when a player interacts with an item.
 */
class InteractProgressBar {
    /**
     * Creates an instance of InteractProgressBar.
     * @param {PlayerMp} player - The player interacting with the item.
     * @param {string} description - The description of the progress bar.
     * @param {number} time - The duration of the progress bar in seconds.
     * @param {IUsingItemData} data - The data related to the item being used.
     * @param {() => void} onFinish - Callback function to execute when the progress bar finishes.
     */
    constructor(player, description, time, data, onFinish) {
        this.timeout = null;
        this.item = data.item;
        this.animDict = data.animDict;
        this.animName = data.animName;
        this.flag = data.flag;
        this.attachObject = data.attachObject;
        this.new(player, description, time, data, onFinish);
    }
    /**
     * Initializes and displays the progress bar for the player.
     * @param {PlayerMp} player - The player interacting with the item.
     * @param {string} description - The description of the progress bar.
     * @param {number} time - The duration of the progress bar in seconds.
     * @param {IUsingItemData} data - The data related to the item being used.
     * @param {() => void} onFinish - Callback function to execute when the progress bar finishes.
     */
    new(player, description, time, data, onFinish) {
        try {
            const buttonData = {
                button: "Esc",
                autoStart: true,
                time: time,
                count: -1,
                image: data.item.image.replace(".svg", ""),
                rarity: 1,
                header: data.item.name,
                description
            };
            _api_1.RAGERP.cef.emit(player, "hud", "showInteractionButton", buttonData);
            player.setOwnVariable("usingItem", true);
            if (data.animDict && data.animName && typeof data.flag !== "undefined") {
                player.playAnimation(data.animDict, data.animName, 2.0, data.flag);
            }
            if (data.attachObject) {
                player.attachObject(data.attachObject, true);
            }
            this.timeout = setTimeout(() => {
                if (!mp.players.exists(player) || !player.character || !player.character.inventory)
                    return;
                if (data.animDict && data.animName) {
                    player.stopAnimation();
                }
                if (data.attachObject) {
                    player.attachObject(data.attachObject, false);
                }
                player.call("client::control:disablePauseMenu", [false]);
                player.setOwnVariable("usingItem", false);
                if (!player.character.inventory.getItemByUUID(data.item.hash)) {
                    return;
                }
                onFinish();
                player.character.inventory.progressBar = null;
            }, time * 1000);
        }
        catch (err) {
            console.error("error at progressbar.new | ", err);
        }
    }
    /**
     * Cancels the progress bar and resets the player's state.
     * @param {PlayerMp} player - The player interacting with the item.
     */
    onCancel(player) {
        if (!mp.players.exists(player) || !player.character || !player.character.inventory)
            return;
        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }
        if (this.animDict && this.animName) {
            player.stopAnimation();
        }
        if (this.attachObject) {
            player.attachObject(this.attachObject, false);
        }
        _api_1.RAGERP.cef.emit(player, "hud", "showInteractionButton", null);
        player.setOwnVariable("usingItem", false);
        player.character.inventory.progressBar = null;
    }
}
exports.InteractProgressBar = InteractProgressBar;
