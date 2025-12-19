"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InteractionMenu = void 0;
const _api_1 = require("@api");
class InteractionMenu {
    constructor() {
        this.player = null;
        this.acceptEvent = null;
        this.refuseEvent = null;
        this.player = null;
        this.acceptEvent = null;
        this.refuseEvent = null;
        this.clearPromiseEvents();
    }
    /**
     * Display interaction menu to a player.
     * @param player the player which to show the interaction menu to
     * @param data Interaction menu data
     * @returns 'id' from the item player selected
     */
    new(player, data) {
        this.player = player;
        player.call("client::cef:start", ["interactionMenu"]);
        _api_1.RAGERP.cef.emit(player, "hud", "setInteraction", data);
        return new Promise((resolve) => {
            if (this.player?.id !== player.id)
                return;
            const onAccept = (player, answer) => {
                if (this.player && this.player.id === player.id) {
                    answer = JSON.parse(answer);
                    this.clearPromiseEvents();
                    resolve(parseInt(answer));
                }
            };
            const onReject = (player, _cef) => {
                console.log("rejected");
                if (!this.player || this.player.id !== player.id)
                    return;
                this.closeMenu(player);
                resolve(null);
            };
            this.setPromiseEvents(onAccept, onReject);
        });
    }
    /**
     * Set events which alter on will be triggered depending what player selects in the interaction menu.
     * @param accept
     * @param reject
     */
    setPromiseEvents(accept, reject) {
        this.acceptEvent = new mp.Event("server::hud:interactResult", accept);
        this.refuseEvent = new mp.Event("client::cef:close", reject);
    }
    /**
     *
     */
    clearPromiseEvents() {
        if (this.acceptEvent)
            this.acceptEvent.destroy();
        if (this.refuseEvent)
            this.refuseEvent.destroy();
    }
    /**
     * Close interaction menu for local player.
     * @returns void
     */
    closeMenu(player) {
        if (!mp.players.exists(player))
            return;
        this.clearPromiseEvents();
        player.call("client::cef:close");
    }
}
exports.InteractionMenu = InteractionMenu;
