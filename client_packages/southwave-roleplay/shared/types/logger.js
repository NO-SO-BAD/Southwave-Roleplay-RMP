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
exports.logger = exports.LogLevel = void 0;
var LogLevel;
(function (LogLevel) {
    LogLevel["INFO"] = "INFO";
    LogLevel["WARN"] = "WARN";
    LogLevel["ERROR"] = "ERROR";
    LogLevel["DEBUG"] = "DEBUG";
})(LogLevel || (exports.LogLevel = LogLevel = {}));
exports.logger = {
    info: function (message) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this._print(LogLevel.INFO, message, args);
    },
    warn: function (message) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this._print(LogLevel.WARN, message, args);
    },
    error: function (message) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this._print(LogLevel.ERROR, message, args);
    },
    debug: function (message) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this._print(LogLevel.DEBUG, message, args);
    },
    _print: function (level, message, args) {
        var timestamp = new Date().toISOString();
        var formatted = "[".concat(timestamp, "] [").concat(level, "] ").concat(message);
        if (level === LogLevel.ERROR) {
            console.error.apply(console, __spreadArray([formatted], args, false));
        }
        else if (level === LogLevel.WARN) {
            console.warn.apply(console, __spreadArray([formatted], args, false));
        }
        else {
            console.log.apply(console, __spreadArray([formatted], args, false));
        }
    }
};
