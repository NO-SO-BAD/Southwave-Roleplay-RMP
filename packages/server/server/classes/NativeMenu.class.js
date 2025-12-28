"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NativeMenu = void 0;
const CEFEvent_class_1 = require("@classes/CEFEvent.class");
/**
 * Represents a native menu for a player.
 */
class NativeMenu {
    /**
     * Creates a new NativeMenu instance.
     *
     * @param player - The player who owns the menu.
     * @param id - The unique identifier for the menu.
     * @param header - The header title of the menu.
     * @param desc - The description of the menu.
     * @param items - The items displayed in the menu.
     */
    constructor(player, id, header, desc, items) {
        /** The items displayed in the menu. */
        this.items = [];
        /** The event triggered when an item is selected. */
        this.onSelectEvent = null;
        /** The event triggered when a checkbox item is changed. */
        this.onCheckboxEvent = null;
        /** The event triggered when a switch item is toggled. */
        this.onSwitchEvent = null;
        this.id = id;
        this.header = header;
        this.desc = desc;
        this.items = items;
        this.player = player;
        CEFEvent_class_1.CefEvent.emit(this.player, "nativemenu", "setData", { id: this.id, isActive: true, header: { title: this.header, desc: this.desc }, items: this.items });
        CEFEvent_class_1.CefEvent.startPage(this.player, "nativemenu");
    }
    /**
     * Handles the selection of an item in the menu.
     *
     * @param target - The player who selected the item.
     * @returns A promise that resolves with the selected item's data, or null if the player is not valid.
     */
    onItemSelected(target) {
        return new Promise((res) => {
            if (!this.player || !mp.players.exists(this.player) || this.player.id !== target.id) {
                return;
            }
            this.onSelectEvent = new mp.Event("server::nativemenu:onSelectItem", (player, data) => {
                if (!this.player || this.player.id !== player.id)
                    return;
                res(data);
                this.destroy(player);
            });
        });
    }
    /**
     * Destroys the menu and cleans up associated events.
     *
     * @param player - The player for whom the menu is being destroyed.
     */
    destroy(player) {
        this.onSelectEvent?.destroy();
        this.onCheckboxEvent?.destroy();
        this.onSwitchEvent?.destroy();
        CEFEvent_class_1.CefEvent.emit(player, "nativemenu", "setData", { id: -1, isActive: false, header: { title: "", desc: "" }, items: [] });
        player.call("client::cef:close");
        player.nativemenu = null;
    }
}
exports.NativeMenu = NativeMenu;
