"use strict";
// src/shared/utils/logger.ts
// Logger compartido y seguro para server (Node.js) y client (RAGE MP)
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = exports.logger = exports.LogLevel = void 0;
var LogLevel;
(function (LogLevel) {
    LogLevel["ERROR"] = "error";
    LogLevel["WARN"] = "warn";
    LogLevel["INFO"] = "info";
    LogLevel["DEBUG"] = "debug";
})(LogLevel || (exports.LogLevel = LogLevel = {}));
var isServer = typeof process !== 'undefined' && ((_a = process.release) === null || _a === void 0 ? void 0 : _a.name) === 'node';
exports.logger = {
    log: function (level, message, options) {
        if (options === void 0) { options = {}; }
        var _a = options.prefix, prefix = _a === void 0 ? '[Southwave-RP]' : _a, _b = options.timestamp, timestamp = _b === void 0 ? true : _b;
        var time = timestamp ? new Date().toISOString().replace('T', ' ').substr(0, 19) : '';
        var formatted = timestamp
            ? "[".concat(time, "] ").concat(prefix, " [").concat(level.toUpperCase(), "] ").concat(message)
            : "".concat(prefix, " [").concat(level.toUpperCase(), "] ").concat(message);
        // En client no existe console.debug, usamos log
        if (level === LogLevel.ERROR) {
            console.error(formatted);
        }
        else if (level === LogLevel.WARN) {
            console.warn(formatted);
        }
        else if (level === LogLevel.DEBUG) {
            // Solo debug en server o si está activado manualmente
            if (isServer) {
                console.debug(formatted);
            }
            else {
                console.log("[DEBUG] ".concat(formatted));
            }
        }
        else {
            console.log(formatted);
        }
    },
    error: function (message, options) {
        this.log(LogLevel.ERROR, message, options);
    },
    warn: function (message, options) {
        this.log(LogLevel.WARN, message, options);
    },
    info: function (message, options) {
        this.log(LogLevel.INFO, message, options);
    },
    debug: function (message, options) {
        this.log(LogLevel.DEBUG, message, options);
    }
};
// Alias rápido
exports.log = exports.logger.log;
