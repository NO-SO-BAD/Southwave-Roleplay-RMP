import "reflect-metadata";
import { DataSource } from "typeorm";
import { AccountEntity } from "./entity/Account.entity";
import { CharacterEntity } from "./entity/Character.entity";
import { DatabaseLogger } from "./Logger.module";
import { BanEntity } from "./entity/Ban.entity";
import { InventoryItemsEntity } from "./entity/Inventory.entity";
import { VehicleEntity } from "./entity/Vehicle.entity";
import { BankAccountEntity } from "@entities/Bank.entity";

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
    user: "postgres",  // Usuario
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
export const MainDataSource = new DataSource({
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
        AccountEntity,
        CharacterEntity,
        BankAccountEntity,
        BanEntity,
        InventoryItemsEntity,
        VehicleEntity
    ],
    migrations: [],
    subscribers: [],
    logger: DatabaseLogger.getInstance(loggerConfig)
});

// ============================================
// INICIALIZACIÓN SEGURA DE LA DB
// ============================================
export async function initializeDatabase() {
    try {
        await MainDataSource.initialize();
        console.log("[DATABASE] Conectado correctamente!");
    } catch (err) {
        console.error("[DATABASE] Error al conectar:", err);
        process.exit(1); // Termina el servidor si no hay conexión
    }
}
