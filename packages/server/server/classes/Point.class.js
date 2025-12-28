"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DynamicPoint = exports.dynamicPointPool = void 0;
const uuid_1 = require("uuid");
exports.dynamicPointPool = [];
class DynamicPoint {
    /**
     * Creates an instance of DynamicPoint.
     * @param {Vector3} position - The position of the dynamic point.
     * @param {number} range - The range of the point shape.
     * @param {number} dimension - The dimension of the point.
     * @param {IPointHandlers} handlers - The handlers for point events.
     * @param {ILabelData} [label] - Optional label data.
     */
    constructor(position, range, dimension, handlers, label) {
        this.pointShape = null;
        this.textLabel = null;
        this.blip = null;
        this.marker = null;
        this.id = (0, uuid_1.v4)();
        this.dimension = dimension || 0;
        this.position = position;
        this.pointShape = mp.colshapes.newSphere(position.x, position.y, position.z, range, this.dimension);
        if (label) {
            this.textLabel = mp.labels.new(label.text, label.position ? label.position : position, {
                ...label.options
            });
        }
        this.pointShape.enterHandler = handlers.enterHandler;
        this.pointShape.exitHandler = handlers.exitHandler;
        this.onKeyPress = handlers.onKeyPress;
        exports.dynamicPointPool.push(this);
    }
    /**
     * Creates a text label.
     * @param {string} text - The text for the label.
     * @param {Vector3} [position] - Optional, if no position is set then the point position will be used.
     * @param {object} [options] - Label options, such as font, color, los, etc.
     * @param {number} [options.font] - The font of the label.
     * @param {RGBA} [options.color] - The color of the label.
     * @param {number} [options.dimension] - The dimension of the label.
     * @param {number} [options.drawDistance] - The draw distance of the label.
     * @param {boolean} [options.los] - Line of sight for the label.
     * @returns {void}
     */
    createLabel(text, position, options) {
        if (this.textLabel && mp.labels.exists(this.textLabel)) {
            this.textLabel.text = text;
            if (position)
                this.textLabel.position = position;
            return;
        }
        this.textLabel = mp.labels.new(text, position ? position : this.position, {
            ...options
        });
    }
    /**
     * Updates the text of the label.
     * @param {string} text - The new text to update the label.
     */
    updateLabel(text) {
        if (this.textLabel && mp.labels.exists(this.textLabel))
            this.textLabel.text = text;
    }
    /**
     * Destroys the label.
     */
    destroyLabel() {
        if (!this.textLabel || !mp.labels.exists(this.textLabel))
            return;
        this.textLabel.destroy();
        this.textLabel = null;
    }
    /**
     * Checks if a dynamic point exists.
     * @param {DynamicPoint} point - The dynamic point to check.
     * @returns {DynamicPoint | undefined} - The found dynamic point or undefined.
     */
    exists(point) {
        return exports.dynamicPointPool.find((x) => x.id === point.id);
    }
    /**
     * Destroys the dynamic point.
     */
    destroy() {
        if (this.pointShape && mp.colshapes.exists(this.pointShape)) {
            this.pointShape.destroy();
            this.pointShape = null;
        }
        if (this.textLabel && mp.labels.exists(this.textLabel)) {
            this.textLabel.destroy();
            this.textLabel = null;
        }
        if (this.marker && mp.markers.exists(this.marker)) {
            this.marker.destroy();
            this.marker = null;
        }
        if (this.blip && mp.blips.exists(this.blip)) {
            this.blip.destroy();
            this.blip = null;
        }
        let point = exports.dynamicPointPool.find((x) => x.id === this.id);
        if (!point)
            return;
        exports.dynamicPointPool.splice(exports.dynamicPointPool.indexOf(point), 1);
    }
    /**
     * Creates a new blip based on the provided data.
     * @param {IBlipData} data - The data used to create the blip.
     */
    createBlip(data) {
        this.blip = mp.blips.new(data.sprite, data.position, data.options);
    }
    /**
     * Destroys the current blip if it exists.
     */
    destroyBlip() {
        if (this.blip && mp.blips.exists(this.blip)) {
            this.blip.destroy();
            this.blip = null;
        }
    }
    /**
     * Creates a new marker based on the provided data.
     * @param {IMarkerData} data - The data used to create the marker.
     */
    createMarker(data) {
        this.marker = mp.markers.new(data.type, data.position, data.scale, data.options);
    }
    /**
     * Destroys the current marker if it exists.
     */
    destroyMarker() {
        if (this.marker && mp.markers.exists(this.marker)) {
            this.marker.destroy();
            this.marker = null;
        }
    }
    /**
     * Gets the nearest dynamic point to a player.
     * @param {PlayerMp} player - The player to check proximity.
     * @returns {DynamicPoint | null} - The nearest dynamic point or null if none found.
     */
    static getNearestPoint(player) {
        let found_point = null;
        for (let i = 0; i < exports.dynamicPointPool.length; i++) {
            let point = exports.dynamicPointPool[i];
            if (!point.pointShape || !mp.colshapes.exists(point.pointShape))
                continue;
            if (player.dimension === point.dimension && point.pointShape.isPointWithin(player.position)) {
                found_point = point;
                break;
            }
        }
        return found_point;
    }
    /**
     * Creates a new dynamic point.
     * @param {Vector3} position - The position of the dynamic point.
     * @param {number} range - The range of the point shape.
     * @param {number} dimension - The dimension of the point.
     * @param {IPointHandlers} handlers - The handlers for point events.
     * @param {ILabelData} [label] - Optional label data.
     * @returns {DynamicPoint} - The created dynamic point.
     */
    static new(position, range, dimension, handlers, label) {
        return new DynamicPoint(position, range, dimension, handlers, label);
    }
}
exports.DynamicPoint = DynamicPoint;
