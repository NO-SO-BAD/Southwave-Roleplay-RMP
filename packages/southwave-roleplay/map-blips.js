"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAllBlipsForPlayer = createAllBlipsForPlayer;
var allBlips = __spreadArray(__spreadArray(__spreadArray(__spreadArray([
    // ========= HOSPITALES (rojo, siempre visibles, un poco más chicos) =========
    { name: "Hospital Pillbox Hill", x: 307.2, y: -590.7, z: 43.3, sprite: 61, color: 1, scale: 0.9 },
    { name: "Hospital Sandy Shores", x: 1839.2, y: 3672.9, z: 34.3, sprite: 61, color: 1, scale: 0.9 },
    { name: "Hospital Paleto Bay", x: -247.8, y: 6332.7, z: 32.4, sprite: 61, color: 1, scale: 0.9 },
    { name: "Hospital Mount Zonah", x: -449.6, y: -340.5, z: 34.5, sprite: 61, color: 1, scale: 0.9 },
    { name: "Hospital Eclipse Medical", x: -676.8, y: 311.3, z: 83.1, sprite: 61, color: 1, scale: 0.9 },
    { name: "Hospital Central Los Santos", x: 359.3, y: -1412.3, z: 32.5, sprite: 61, color: 1, scale: 0.9 },
    { name: "Hospital Portola Trinity", x: -834.0, y: -1232.0, z: 7.3, sprite: 61, color: 1, scale: 0.9 }
], ([
    [-48.5, -1757.5, 29.4], [2580.0, 361.0, 108.5], [819.3, -1028.9, 26.1], [1208.4, -1402.4, 35.2],
    [1181.4, -330.1, 69.3], [620.8, 269.1, 103.1], [-1437.6, -276.7, 46.2], [-724.6, -935.2, 19.2],
    [-526.0, -1211.5, 18.5], [-70.2, -1761.0, 29.5], [265.6, -1261.3, 29.4], [170.0, 6601.0, 31.8],
    [1687.2, 4929.5, 42.1], [1701.3, 6415.9, 32.8], [179.9, 6602.2, 31.8], [1180.0, 2649.0, 37.8],
    [-2554.9, 2334.2, 33.1], [1039.4, 2671.1, 39.6], [2005.0, 3774.5, 32.2], [-94.5, 6419.6, 31.5]
].map(function (pos) { return ({
    name: "Gasolinera",
    x: pos[0], y: pos[1], z: pos[2],
    sprite: 361,
    color: 66,
    scale: 0.85,
    shortRange: true
}); })), true), ([
    [25.7, -1347.0, 29.5], [173.8, 228.0, 97.7], [2678.9, 3280.4, 55.2], [1961.5, 3740.7, 32.3],
    [547.8, 2671.0, 42.2], [1729.2, 6414.1, 35.0], [1135.8, -982.7, 46.4], [-1222.9, -906.9, 12.3],
    [-1487.5, -379.1, 40.2], [-2968.0, 390.9, 15.0], [1166.0, 2708.9, 38.2], [1392.5, 3604.7, 34.9],
    [-707.5, -914.2, 19.2], [1163.4, -323.8, 69.2], [-1820.5, 792.7, 138.1], [1698.0, 4924.0, 42.1],
    [-3040.7, 585.0, 7.9], [-3242.9, 1001.5, 12.8]
].map(function (pos) { return ({
    name: "24/7",
    x: pos[0], y: pos[1], z: pos[2],
    sprite: 52,
    color: 2,
    scale: 0.85,
    shortRange: true
}); })), true), ([
    [434.7, -980.6, 30.8]
].map(function (pos) { return ({
    name: "Estacion de policia",
    x: pos[0], y: pos[1], z: pos[2],
    sprite: 60,
    color: 2,
    scale: 0.85,
    shortRange: false
}); })), true), ([
    [-46.151, -1105.793, 30.8]
].map(function (pos) { return ({
    name: "Concesionario",
    x: pos[0], y: pos[1], z: pos[2],
    sprite: 810,
    color: 2,
    scale: 0.85,
    shortRange: false
}); })), true);
function createAllBlipsForPlayer(player) {
    // Limpiar blips antiguos
    mp.blips.forEach(function (blip) {
        if (blip.getVariable('southwave_blip') && blip.dimension === player.dimension) {
            blip.destroy();
        }
    });
    var count = 0;
    allBlips.forEach(function (data) {
        var _a, _b;
        var blip = mp.blips.new(data.sprite, new mp.Vector3(data.x, data.y, data.z), {
            name: data.name,
            color: data.color,
            scale: (_a = data.scale) !== null && _a !== void 0 ? _a : 1.0,
            shortRange: (_b = data.shortRange) !== null && _b !== void 0 ? _b : true,
            dimension: player.dimension,
            alpha: 255
        });
        // FIX: Quita setCategory o hazlo opcional – funciona sin él para minimapa básico
        // blip.setCategory(1);  // Comenta esta línea – no esencial para visibilidad
        blip.setVariable('southwave_blip', true);
        count++;
    });
    player.outputChatBox("\u00A1".concat(count, " blips cargados! (Hospitales + Gasolineras + 24/7)"));
    player.outputChatBox("Usa /blips para recargar");
}
console.log("map-blips.ts cargado");
