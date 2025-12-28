"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseLogger = void 0;
const fs = __importStar(require("fs"));
const createFile = (filename) => {
    fs.open(filename, "r", (err, fd) => {
        if (err) {
            fs.writeFile(filename, "", (err) => {
                if (err)
                    console.log(err);
                else
                    console.log("The file was saved!");
            });
        }
        else {
            console.log("The file exists!");
        }
    });
};
const saveFile = (name, log) => {
    fs.appendFile("" + name + ".log", `${log}\n`, (err) => {
        if (err) {
            createFile(name);
            return console.log(err);
        }
    });
};
class DatabaseLogger {
    constructor(config) {
        this.config = config;
    }
    static getInstance(config) {
        if (!DatabaseLogger.instance) {
            DatabaseLogger.instance = new DatabaseLogger(config);
        }
        return DatabaseLogger.instance;
    }
    logQuery(query, parameters, queryRunner) {
        const logMessage = `-------------------------------------------------------------------------\n\Query: ${query}\nParameters: ${parameters}\n-------------------------------------------------------------------------\n`;
        try {
            fs.appendFileSync(this.config.queryLogFilePath, logMessage);
        }
        catch (err) {
            createFile(this.config.queryLogFilePath);
        }
    }
    logQueryError(error, query, parameters, queryRunner) {
        const logMessage = `-------------------------------------------------------------------------\nDate: [${new Date()}]\nQuery: ${query}\nParameters: ${parameters}\n${error}\n-------------------------------------------------------------------------\n`;
        try {
            fs.appendFileSync(this.config.errorLogFilePath, logMessage);
        }
        catch (err) {
            createFile(this.config.errorLogFilePath);
        }
    }
    logQuerySlow(time, query, parameters, queryRunner) {
        // throw new Error('Method not implemented.');
    }
    logSchemaBuild(message, queryRunner) {
        // throw new Error('Method not implemented.');
    }
    logMigration(message, queryRunner) {
        // throw new Error('Method not implemented.');
    }
    log(level, message, queryRunner) {
        const logMessage = `${level} | ${message} | ${queryRunner}\n`;
        try {
            fs.appendFileSync(this.config.defaultLogFilePath, logMessage);
        }
        catch (err) {
            createFile(this.config.defaultLogFilePath);
        }
    }
}
exports.DatabaseLogger = DatabaseLogger;
