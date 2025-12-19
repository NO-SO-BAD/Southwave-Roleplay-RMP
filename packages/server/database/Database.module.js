"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainDataSource = void 0;
exports.initializeDatabase = initializeDatabase;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const Account_entity_1 = require("./entity/Account.entity");
const Character_entity_1 = require("./entity/Character.entity");
const Logger_module_1 = require("./Logger.module");
const Ban_entity_1 = require("./entity/Ban.entity");
const Inventory_entity_1 = require("./entity/Inventory.entity");
const Vehicle_entity_1 = require("./entity/Vehicle.entity");
const Bank_entity_1 = require("@entities/Bank.entity");
// ============================================
// CONFIGURACIÓN DE BASE DE DATOS (CREDENCIALES DIRECTAS)
// ============================================
const beta = true; // Cambiar según la DB que quieras usar
const config = {
    connectionLimit: 100,
    connectTimeout: 60 * 60 * 1000,
    acquireTimeout: 60 * 60 * 1000,
    timeout: 60 * 60 * 1000,
    host: "localhost", // Dirección del servidor PostgreSQL
    user: "postgres", // Usuario
    password: beta ? "tacticalwired" : "contraseña_beta", // Password según DB
    database: "southwave", // Nombre de la base de datos
    port: 5432
};
// ============================================
// LOGGER OPCIONAL
// ============================================
const loggerConfig = {
    queryLogFilePath: "./dblogs/query-log.log",
    errorLogFilePath: "./dblogs/error.log",
    defaultLogFilePath: "./dblogs/default-log.log"
};
// ============================================
// DATASOURCE PRINCIPAL
// ============================================
exports.MainDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: config.host,
    port: config.port,
    username: config.user,
    password: config.password,
    database: config.database,
    synchronize: true,
    connectTimeoutMS: config.connectTimeout,
    logging: ["error"],
    entities: [
        Account_entity_1.AccountEntity,
        Character_entity_1.CharacterEntity,
        Bank_entity_1.BankAccountEntity,
        Ban_entity_1.BanEntity,
        Inventory_entity_1.InventoryItemsEntity,
        Vehicle_entity_1.VehicleEntity
    ],
    migrations: [],
    subscribers: [],
    logger: Logger_module_1.DatabaseLogger.getInstance(loggerConfig)
});
// ============================================
// INICIALIZACIÓN SEGURA DE LA DB
// ============================================
async function initializeDatabase() {
    try {
        await exports.MainDataSource.initialize();
        console.log("[DATABASE] Conectado correctamente!");
    }
    catch (err) {
        console.error("[DATABASE] Error al conectar:", err);
        process.exit(1); // Termina el servidor si no hay conexión
    }
}
