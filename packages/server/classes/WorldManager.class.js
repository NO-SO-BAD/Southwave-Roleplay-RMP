"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorldManager = void 0;
class _WorldManager {
    constructor() {
        this.dateNow = new Date();
        // this.secondTimerInterval = setInterval(this.secondTimer.bind(this), 1_000);
        // this.minuteTimerInterval = setInterval(this.secondTimer.bind(this), 60 * 1000);
        // this.hourTimerInterval = setInterval(this.secondTimer.bind(this), 1_000);
    }
    secondTimer() {
        const date = this.dateNow;
        const [hours, minute, second] = [date.getHours(), date.getMinutes(), date.getSeconds()];
        mp.world.time.set(hours, minute, second);
    }
    minuteTimer() { }
    hourTimer() { }
}
exports.WorldManager = new _WorldManager();
