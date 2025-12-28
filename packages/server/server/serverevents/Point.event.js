"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Point_class_1 = require("@classes/Point.class");
mp.events.add("server::player:pressE", async (player) => {
    try {
        if (!mp.players.exists(player))
            return;
        const point = Point_class_1.DynamicPoint.getNearestPoint(player);
        if (!point)
            return;
        point.onKeyPress.constructor.name === "AsyncFunction" ? await point.onKeyPress(player) : point.onKeyPress(player);
    }
    catch (err) {
        console.error("dynamic point event err: ", err);
    }
});
mp.events.add("playerEnterColshape", (player, shape) => {
    if (typeof shape.enterHandler !== "undefined")
        shape.enterHandler(player);
});
mp.events.add("playerExitColshape", (player, shape) => {
    if (typeof shape.exitHandler !== "undefined")
        shape.exitHandler(player);
});
