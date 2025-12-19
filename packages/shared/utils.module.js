"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utils = void 0;
/**
 * Utility functions used throughout the client and server side
 */
exports.Utils = {
    /**
     * Delays execution for a specified number of milliseconds.
     * @param {number} ms - The number of milliseconds to sleep.
     * @returns {Promise<void>} A promise that resolves after the specified delay.
     */
    sleep: function (ms) {
        return new Promise((res) => setTimeout(res, ms));
    },
    /**
     * Checks if the current date has passed a given timestamp.
     * @param {number} timestamp - The timestamp to compare against the current date.
     * @returns {boolean} True if the current date has passed the timestamp, otherwise false.
     */
    hasDatePassedTimestamp: function (timestamp) {
        const currentTimestamp = Date.now();
        return currentTimestamp > timestamp;
    },
    /**
     * Attempts to parse a JSON string.
     * @param {any} obj - The object to parse.
     * @returns {any} The parsed object if successful, otherwise the original object.
     */
    tryParse: function (obj) {
        try {
            return JSON.parse(obj);
        }
        catch (_err) {
            return obj;
        }
    },
    /**
     * Merges two objects into one.
     * @template T
     * @param {T} obj1 - The first object.
     * @param {T} obj2 - The second object.
     * @returns {T} A new object containing properties from both input objects.
     */
    mergeObjects: function (obj1, obj2) {
        const newObj = {};
        Object.keys(obj1).forEach((key) => {
            newObj[key] = obj1[key];
        });
        let startIndex = Object.keys(obj1).length + 1;
        Object.keys(obj2).forEach((key) => {
            if (Object.prototype.hasOwnProperty.call(newObj, key)) {
                newObj[(startIndex++).toString()] = obj2[key];
            }
            else {
                newObj[key] = obj2[key];
            }
        });
        return newObj;
    },
    /**
     * Calculates the distance between two 3D points.
     * @param {Vector3} first - The first point.
     * @param {Vector3} second - The second point.
     * @returns {number} The distance between the two points.
     */
    distanceToPos: function (first, second) {
        return Math.abs(Math.sqrt(Math.pow(second.x - first.x, 2) + Math.pow(second.y - first.y, 2) + Math.pow(second.z - first.z, 2)));
    },
    /**
     * Converts an object to a JSON string.
     * @template T
     * @param {T} obj - The object to stringify.
     * @returns {StringifiedObject<T>} The JSON string representation of the object.
     */
    stringifyObject: function (obj) {
        return JSON.stringify(obj);
    },
    /**
     * Parses a JSON string back into an object.
     * @template T
     * @param {StringifiedObject<T>} str - The JSON string to parse.
     * @returns {T} The parsed object.
     */
    parseObject: function (str) {
        return JSON.parse(str);
    },
    /**
     * Sends a debug message to the server.
     * @param {string} message - The debug message.
     * @param {...any} args - Additional arguments to include with the message.
     */
    clientDebug: function (message, ...args) {
        //@ts-ignore
        mp.events.callRemote("server::client:debug", message, ...args);
    },
    /**
     * Returns a random element from an array.
     * @template T
     * @param {Array<T>} array - The array to sample from.
     * @returns {T} A random element from the array.
     */
    getRandomFromArray: function (array) {
        return array[Math.floor(Math.random() * array.length)];
    },
    /**
     * Converts a hexadecimal string representation of a floating-point number to a JavaScript float.
     *
     * @param {string} str - The hexadecimal string (without the "0x" prefix) representing the floating-point number.
     * @returns {number} - The corresponding floating-point number, or 0 if the input is invalid.
     */
    parseHexAsFloat: function (str) {
        let int = parseInt("0x" + str, 16);
        if (isNaN(int)) {
            return 0;
        }
        const sign = int >>> 31 ? -1 : 1;
        const exp = ((int >>> 23) & 0xff) - 127;
        const mantiss = (int & 0x7fffff) + 0x800000;
        return sign * mantiss * Math.pow(2, exp - 23);
    }
};
