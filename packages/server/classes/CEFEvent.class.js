"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CefEvent = void 0;
class Cef_Event {
    constructor() {
        this.eventsInMemory = [];
        this.eventsInMemory = [];
        console.log("Cef event handler initialised!");
    }
    get poolSize() {
        return this.eventsInMemory.length;
    }
    register(page, pointer, handler // Allow any type for handler when page and pointer are provided as strings
    ) {
        if (!this.eventsInMemory.some((event) => event.target === page && event.name === pointer)) {
            const _event = new mp.Event(`server::${page}:${pointer}`, handler);
            this.eventsInMemory.push({ target: page, name: pointer, handler, _event });
            return _event;
        }
        else {
            console.log("------------------------------------------------------------");
            throw new Error(`Event: "${page}", "${pointer}" was found duplicated`);
        }
    }
    startPage(player, pageName) {
        player.call("client::cef:start", [pageName]);
    }
    /**
     * Removes page events that were registered using .register
     * @param page page which you'd like to remove events from
     * @returns void
     */
    remove(page) {
        const targetInEvent = this.eventsInMemory.find((x) => x.target === page);
        if (!targetInEvent)
            return;
        if (targetInEvent._event) {
            targetInEvent._event.destroy();
        }
        this.eventsInMemory.splice(this.eventsInMemory.indexOf(targetInEvent), 1);
    }
    /**
     * Updates page:pointer handler.
     * @param page page name which to update handler from
     * @param pointer page pointer which to update handle
     * @param handler new handle that you'd like to attach
     */
    updateHandler(page, pointer, handler) {
        const index = this.eventsInMemory.findIndex((event) => event.target === page && event.name === pointer);
        if (index !== -1) {
            this.eventsInMemory[index].handler = handler;
        }
    }
    /**
     * Emits a CEF(frontend) event, such as when sending data to a specified page given
     * @example
     * ```
     * Cef_Event.emit(mp.players.at(0), "hud", "setData", {level: 1});
     * ```
     * @param player The player to emit data to
     * @param page Which page to update
     * @param pointer Which pointer to call
     * @param data Data to send
     * @returns void
     */
    emit(player, page, pointer, data) {
        if (!mp.players.exists(player))
            return;
        const eventName = `cef::${page}:${String(pointer)}`;
        return player.call("client::eventManager", [eventName, data]);
    }
    /**
     * Emits a CEF(frontend) event, such as when sending data to a specified page given
     * Same as .emit but supports async
     * @example
     * ```
     * await Cef_Event.emitAsync(mp.players.at(0), "hud", "setData", {level: 1});
     * ```
     * @param player The player to emit data to
     * @param target Which page to update
     * @param pointer Which pointer to call
     * @param obj Data to send
     * @returns void
     */
    async emitAsync(player, target, pointer, obj) {
        if (!mp.players.exists(player))
            return;
        const eventName = `cef::${target}:${String(pointer)}`;
        return player.call("client::eventManager", [eventName, obj]);
    }
}
const CefEvent = new Cef_Event();
exports.CefEvent = CefEvent;
