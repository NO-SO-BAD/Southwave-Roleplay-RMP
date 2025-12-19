"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vehicleManager = exports.Vehicle = exports.vehiclePool = void 0;
const uuid_1 = require("uuid");
const _api_1 = require("@api");
const Vehicle_assets_1 = require("@assets/Vehicle.assets");
const Vehicle_entity_1 = require("@entities/Vehicle.entity");
const defaultVehicleData = {
    locked: false,
    engine: false,
    numberplate: "",
    fuel: 50,
    keyhole: (0, uuid_1.v4)(),
    sqlid: null,
    faction: null,
    primaryColor: [255, 255, 255],
    secondaryColor: [255, 255, 255],
    owner: null,
    ownerName: null,
    trunkState: false,
    hoodState: false,
    price: 0,
    inventory: null,
    impoundState: 0
};
const defaultVehicleMods = {
    tunningMods: {},
    plateColor: 0,
    wheelType: -1,
    wheelMod: 0,
    neonColor: null,
    hasNeon: false,
    primaryColorType: 0,
    secondaryColorType: 0,
    smokecolor: { r: 255, g: 255, b: 255 },
    dashboardcolor: 0,
    interiorcolor: 0,
    dirtlevel: 0,
    windows: { 0: false, 1: false, 2: false, 3: false }
};
/** A list of all vehicles. */
const vehiclePool = [];
exports.vehiclePool = vehiclePool;
class Vehicle {
    /**
     * Creates an instance of Vehicle.
     * @param {RageShared.Vehicles.Enums.VEHICLETYPES} type - The type of the vehicle.
     * @param {string | number} model - The model of the vehicle.
     * @param {Vector3} position - The position where the vehicle spawns.
     * @param {number} heading - The heading (direction) the vehicle faces.
     * @param {number} dimension - The dimension in which the vehicle exists.
     * @param {RageShared.Vehicles.Interfaces.IVehicleData} [data=defaultVehicleData] - The data associated with the vehicle.
     * @param {RageShared.Vehicles.Interfaces.IVehicleMods | null} [mods=null] - The modifications applied to the vehicle.
     */
    constructor(type, model, position, heading, dimension, data = defaultVehicleData, mods = null) {
        /** Data associated with the vehicle. */
        this._data = defaultVehicleData;
        /** Modifications applied to the vehicle. */
        this._mods = defaultVehicleMods;
        /** Indicates if the vehicle is wanted by the police. */
        this.isWanted = false;
        this._vehicle = mp.vehicles.new(typeof model === "string" ? mp.joaat(model) : model, position, {
            dimension,
            numberPlate: data.numberplate ?? "",
            locked: data.locked,
            engine: data.engine,
            heading: heading,
            color: [data.primaryColor, data.secondaryColor]
        });
        this.type = type;
        this._data = data;
        this._mods = mods ? mods : defaultVehicleMods;
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                const value = data[key];
                this.setData(key, value);
            }
        }
        for (const key in this._mods) {
            if (this._mods.hasOwnProperty(key)) {
                const value = this._mods[key];
                this.setMod(key, value);
            }
        }
        if (this.isValid()) {
            this.createMods();
        }
        vehiclePool.push(this);
    }
    /**
     * Sets a modification on the vehicle.
     * @param {keyof RageShared.Vehicles.Interfaces.IVehicleMods} key - The key of the modification.
     * @param {RageShared.Vehicles.Interfaces.IVehicleMods[keyof RageShared.Vehicles.Interfaces.IVehicleMods]} value - The value of the modification.
     */
    setMod(key, value) {
        this._mods[key] = value;
        if (this._vehicle && mp.vehicles.exists(this._vehicle)) {
            if (key !== "tunningMods") {
                this._vehicle.setVariable(key, value);
            }
            if (key === "windows") {
                mp.players.callInRange(this._vehicle.position, mp.config["stream-distance"], "client::vehicle:setWindowState", [this._vehicle.id, value]);
            }
            if (key === "dirtlevel") {
                mp.players.callInRange(this._vehicle.position, mp.config["stream-distance"], "client::vehicle:setDirtLevel", [this._vehicle.id, value]);
            }
        }
    }
    /**
     * Gets a modification from the vehicle.
     * @param {keyof RageShared.Vehicles.Interfaces.IVehicleMods} key - The key of the modification.
     * @returns {RageShared.Vehicles.Interfaces.IVehicleMods[keyof RageShared.Vehicles.Interfaces.IVehicleMods]} - The value of the modification.
     */
    getMod(key) {
        return this._mods[key];
    }
    /**
     * Gets data from the vehicle.
     * @param {keyof RageShared.Vehicles.Interfaces.IVehicleData} key - The key of the data.
     * @returns {RageShared.Vehicles.Interfaces.IVehicleData[keyof RageShared.Vehicles.Interfaces.IVehicleData]} - The value of the data.
     */
    getData(key) {
        return this._data[key];
    }
    /**
     * Sets data on the vehicle.
     * @param {keyof RageShared.Vehicles.Interfaces.IVehicleData} key - The key of the data.
     * @param {RageShared.Vehicles.Interfaces.IVehicleData[keyof RageShared.Vehicles.Interfaces.IVehicleData]} value - The value of the data.
     */
    setData(key, value) {
        if (!this._vehicle || !mp.vehicles.exists(this._vehicle))
            return;
        console.log(`[VEHICLEDATA]:: ${this._vehicle.id} setting ${key} to ${value}`);
        this._data[key] = value;
        this._vehicle.setVariable(key, value);
        switch (key) {
            case "engine": {
                this._vehicle.engine = typeof value === "boolean" ? value : false;
                break;
            }
            case "locked": {
                this._vehicle.locked = typeof value === "boolean" ? value : false;
                break;
            }
            case "hoodState": {
                mp.players.callInRange(this._vehicle.position, mp.config["stream-distance"], "client::vehicle:setHoodState", [this._vehicle.id, value]);
                break;
            }
            case "trunkState": {
                mp.players.callInRange(this._vehicle.position, mp.config["stream-distance"], "client::vehicle:setTrunkState", [this._vehicle.id, value]);
                break;
            }
            case "primaryColor": {
                this._vehicle.setColorRGB(...this.getData("primaryColor"), ...this._vehicle.getColorRGB(1));
                break;
            }
            case "secondaryColor": {
                this._vehicle.setColorRGB(...this._vehicle.getColorRGB(0), ...this.getData("secondaryColor"));
                break;
            }
            case "numberplate": {
                this._vehicle.numberPlate = value;
                break;
            }
            default: {
                break;
            }
        }
    }
    /**
     * Gets the model of the vehicle.
     * @returns {number} - The model of the vehicle.
     */
    getId() {
        if (!this._vehicle || !mp.vehicles.exists(this._vehicle))
            return null;
        return this._vehicle.id;
    }
    /**
     * Gets the model of the vehicle.
     * @returns {number} - The model of the vehicle.
     */
    getModel() {
        if (!this._vehicle || !mp.vehicles.exists(this._vehicle))
            return 0;
        return this._vehicle.model;
    }
    /**
     * Gets the type of the vehicle.
     * @returns {RageShared.Vehicles.Enums.VEHICLETYPES} - The type of the vehicle.
     */
    getType() {
        return this.type;
    }
    /**
     * Gets the model name of the vehicle.
     * @param {PlayerMp} player - The player requesting the model name.
     * @returns {Promise<string | null>} - The model name of the vehicle.
     */
    async getModelName(player) {
        if (!this._vehicle || !mp.vehicles.exists(this._vehicle))
            return null;
        let result = await player.callProc("client::proc:getVehicleModelName", [this._vehicle.id]);
        return result;
    }
    /**
     * Gets the passengers of the vehicle.
     * @param {number} vehicleModelHash - The model hash requesting data.
     * @returns {number} - The number of passengers the vehicle can hold.
     */
    getPassengers(vehicleModelHash) {
        const vehicleData = Vehicle_assets_1.vehicleModelSeats.find((x) => x.vehicleHash === vehicleModelHash);
        return vehicleData?.seats ?? 0;
    }
    /**
     * Gets the faction of the vehicle.
     * @returns {string | null} - The faction of the vehicle.
     */
    getFaction() {
        if (!this._vehicle || !mp.vehicles.exists(this._vehicle))
            return null;
        if (this.type !== 2 /* RageShared.Vehicles.Enums.VEHICLETYPES.FACTION */)
            return null;
        return this._data.faction;
    }
    /**
     * Gets the owner name of vehicle.
     * @returns {string | null} - The owner of the vehicle.
     */
    getOwner() {
        if (!this._vehicle || !mp.vehicles.exists(this._vehicle))
            return null;
        if (this.type !== 1 /* RageShared.Vehicles.Enums.VEHICLETYPES.OWNED */)
            return null;
        return this._data.ownerName;
    }
    /**
     * Gets the SQL ID of the vehicle.
     * @returns {number | null} - The SQL ID of the vehicle.
     */
    getSQL() {
        if (!this._vehicle || !mp.vehicles.exists(this._vehicle))
            return null;
        return this._data.sqlid;
    }
    /**
     * Checks if the vehicle is valid.
     * @returns {boolean} - Whether the vehicle is valid.
     */
    isValid() {
        return ![
            5 /* RageShared.Vehicles.Enums.VEHICLETYPES.ADMIN */,
            3 /* RageShared.Vehicles.Enums.VEHICLETYPES.RENTAL */,
            4 /* RageShared.Vehicles.Enums.VEHICLETYPES.JOB */,
            0 /* RageShared.Vehicles.Enums.VEHICLETYPES.NONE */
        ].includes(this.type);
    }
    /**
     * Destroys the vehicle.
     */
    destroy() {
        if (this._vehicle && mp.vehicles.exists(this._vehicle)) {
            this._vehicle.destroy();
        }
        const findIndex = vehiclePool.indexOf(this);
        if (findIndex !== -1) {
            vehiclePool.splice(findIndex, 1);
        }
    }
    /**
     * Sets the modification color of the vehicle.
     */
    setModColor() {
        if (!this._vehicle || !mp.vehicles.exists(this._vehicle))
            return;
        mp.players.forEachInRange(this._vehicle.position, mp.config["stream-distance"], (entity) => {
            if (entity && mp.players.exists(entity) && entity.getVariable("loggedin")) {
                entity.call("client::vehicle:setModColor", [this._vehicle.id]);
            }
        });
    }
    /**
     * Applies vehicle modifications.
     */
    createMods() {
        try {
            if (!mp.vehicles.exists(this._vehicle))
                return;
            this._vehicle.neonEnabled = false;
            this._vehicle.windowTint = 0;
            for (let i = 0; i < 80; i++)
                this._vehicle.setMod(i, -1);
            if (this._mods.plateColor !== null && typeof this._mods.plateColor === "number") {
                this._vehicle.numberPlateType = this._mods.plateColor;
            }
            if (this._mods.wheelType !== null && typeof this._mods.wheelType === "number") {
                this._vehicle.wheelType = this._mods.wheelType;
            }
            if (this._mods.hasNeon && this._mods.neonColor) {
                this._vehicle.setNeonColor(...this._mods.neonColor);
            }
            if (this._data.primaryColor) {
                let [oldr, oldg, oldb] = this._vehicle.getColorRGB(1);
                this._vehicle.setColorRGB(this._data.primaryColor[0], this._data.primaryColor[1], this._data.primaryColor[2], oldr, oldg, oldb);
            }
            if (this._data.secondaryColor) {
                let [oldr, oldg, oldb] = this._vehicle.getColorRGB(0);
                this._vehicle.setColorRGB(oldr, oldg, oldb, this._data.secondaryColor[0], this._data.secondaryColor[1], this._data.secondaryColor[2]);
            }
            this.setModColor();
            if (this._mods.tunningMods) {
                let vehiclemods = this._mods.tunningMods;
                for (let tune in vehiclemods) {
                    const modIndex = parseInt(tune);
                    if (isNaN(modIndex))
                        continue;
                    if (modIndex >= 100)
                        continue;
                    if (modIndex === 18)
                        this._vehicle.setVariable("boost", 1.3);
                    if (modIndex === 55 /* RageShared.Vehicles.Enums.VEHICLEMODS.WINDOW_TINT */) {
                        this._vehicle.windowTint = vehiclemods[modIndex];
                    }
                    else
                        this._vehicle.setMod(parseInt(tune), vehiclemods[modIndex]);
                }
            }
        }
        catch (err) {
            console.log("createMods err: ", err);
        }
    }
    /**
     * Reloads the modifications on the vehicle.
     */
    reloadMods() {
        this.createMods();
    }
    /**
     * Gets an item slot component by its hash key.
     * @param {string} hashKey - The hash key of the item.
     * @returns {{ slot: number; item: any } | null} - The item slot component.
     */
    getItemSlotComponentByHash(hashKey) {
        const inventory = this.getData("inventory");
        if (!inventory)
            return null;
        let foundItem = null;
        for (const [key, value] of Object.entries(inventory)) {
            if (!value.hash)
                continue;
            if (value.hash === hashKey) {
                foundItem = { slot: parseInt(key), item: value };
                break;
            }
        }
        return foundItem;
    }
    /**
     * Inserts a vehicle into the database.
     * @param {VehicleMp} vehicle - The vehicle to insert.
     * @param {string} modelName - The model name of the vehicle.
     * @param {number} price - The price of the vehicle.
     */
    async insertVehicle(vehicle, modelName, price) {
        const serverVehicle = vehicleManager.at(vehicle.id);
        if (!serverVehicle)
            return;
        let vehicleEntity = new Vehicle_entity_1.VehicleEntity();
        vehicleEntity.modelname = modelName;
        vehicleEntity.class = Vehicle_assets_1.vehicleClasses.find((x) => x.vehicleHash === vehicle.model)?.vehicleClass ?? 0;
        vehicleEntity.fuel = serverVehicle.getData("fuel");
        vehicleEntity.price = price;
        vehicleEntity.primaryColor = vehicle.getColorRGB(0);
        vehicleEntity.secondaryColor = vehicle.getColorRGB(1);
        vehicleEntity.owner_id = serverVehicle.getData("owner");
        vehicleEntity.owner_name = serverVehicle.getData("ownerName");
        vehicleEntity.model = vehicle.model;
        vehicleEntity.plate = vehicle.numberPlate;
        vehicleEntity.is_locked = vehicle.locked ? 1 : 0;
        vehicleEntity.dimension = vehicle.dimension;
        vehicleEntity.isWanted = serverVehicle.isWanted ? 1 : 0;
        vehicleEntity.position = { x: vehicle.position.x, y: vehicle.position.y, z: vehicle.position.z, a: vehicle.heading };
        vehicleEntity.keyhole = serverVehicle.getData("keyhole");
        vehicleEntity.modifications = { 18: -1 };
        await _api_1.RAGERP.database.getRepository(Vehicle_entity_1.VehicleEntity).save(vehicleEntity);
    }
    /**
     * Checks if a vehicle class is a windowed vehicle.
     * @param {number} vehicleClass - The class of the vehicle.
     * @returns {boolean} - Whether the vehicle class is windowed.
     */
    isWindowedVehicle(vehicleClass) {
        return ![
            14 /* RageShared.Vehicles.Enums.VEHICLE_CLASS.BOATS */,
            13 /* RageShared.Vehicles.Enums.VEHICLE_CLASS.CYCLES */,
            11 /* RageShared.Vehicles.Enums.VEHICLE_CLASS.UTILITY */,
            8 /* RageShared.Vehicles.Enums.VEHICLE_CLASS.MOTORCYCLES */,
            22 /* RageShared.Vehicles.Enums.VEHICLE_CLASS.OPEN_WHEEL */
        ].includes(vehicleClass);
    }
}
exports.Vehicle = Vehicle;
const vehicleManager = {
    /**
     * Saves the vehicle to the database.
     * @param {VehicleMp} vehicle - The vehicle to save.
     */
    async saveVehicle(vehicle) {
        const serverVehicle = vehicleManager.at(vehicle.id);
        if (!serverVehicle || !serverVehicle.isValid() || !serverVehicle._vehicle || !mp.vehicles.exists(serverVehicle._vehicle))
            return;
        const vehicleSQL = serverVehicle.getData("sqlid");
        if (vehicleSQL === null)
            return;
        await _api_1.RAGERP.database.getRepository(Vehicle_entity_1.VehicleEntity).update({ id: vehicleSQL }, {
            owner_id: serverVehicle.getData("owner"),
            owner_name: serverVehicle.getData("ownerName"),
            model: serverVehicle._vehicle.model,
            fuel: serverVehicle.getData("fuel"),
            plate: serverVehicle.getData("numberplate"),
            neon: serverVehicle._mods.hasNeon ? 1 : 0,
            neonColor: serverVehicle._mods.neonColor ? serverVehicle._mods.neonColor : [255, 255, 255],
            primaryColor: serverVehicle.getData("primaryColor"),
            secondaryColor: serverVehicle.getData("secondaryColor"),
            plate_color: serverVehicle._mods.plateColor ?? 0,
            is_locked: serverVehicle.getData("locked") ? 1 : 0,
            dimension: vehicle.dimension,
            isWanted: serverVehicle.isWanted ? 1 : 0,
            position: { x: vehicle.position.x, y: vehicle.position.y, z: vehicle.position.z, a: vehicle.heading },
            wheelmods: {
                color: 0,
                mod: serverVehicle._mods.wheelMod,
                type: serverVehicle._mods.wheelType
            },
            modifications: serverVehicle.getMod("tunningMods"),
            primaryColorType: serverVehicle.getMod("primaryColorType"),
            secondaryColorType: serverVehicle.getMod("secondaryColorType"),
            keyhole: serverVehicle.getData("keyhole"),
            impoundState: serverVehicle.getData("impoundState")
        });
    },
    /**
     * Finds a vehicle by ragemp vehicle api ID.
     * @param {number} id - The ID of the vehicle.
     * @returns {Vehicle | null} - The found vehicle or null.
     */
    at(id) {
        let foundvehicle = null;
        for (const vehicle of vehiclePool) {
            if (vehicle._vehicle && mp.vehicles.exists(vehicle._vehicle) && vehicle._vehicle.id === id) {
                foundvehicle = vehicle;
                break;
            }
        }
        return foundvehicle;
    },
    /**
     * Finds a vehicle by its SQL ID.
     * @param {number} id - The SQL ID of the vehicle.
     * @returns {Vehicle | null} - The found vehicle or null.
     */
    atSQL(id) {
        let foundvehicle = null;
        for (const vehicle of vehiclePool) {
            if (vehicle._vehicle && mp.vehicles.exists(vehicle._vehicle) && vehicle.getData("sqlid") === id) {
                foundvehicle = vehicle;
                break;
            }
        }
        return foundvehicle;
    },
    /**
     * Checks if a vehicle is in the world.
     * @param {number} id - The ID of the vehicle.
     * @param {boolean} [isOwned=false] - Whether the vehicle is owned.
     * @returns {VehicleMp | null} - The found vehicle or null.
     */
    isInWorld(id, isOwned = false) {
        const vehicle = vehicleManager.atSQL(id);
        if (vehicle && vehicle._vehicle)
            return vehicle._vehicle;
        return null;
    },
    /**
     * Gets the nearest vehicle to a player within a certain radius.
     * @param {PlayerMp} player - The player to find the nearest vehicle to.
     * @param {number} radius - The radius to search within.
     * @returns {Vehicle | null} - The nearest vehicle or null.
     */
    getNearest(player, radius) {
        for (const vehicle of vehiclePool) {
            if (vehicle && vehicle._vehicle && mp.vehicles.exists(vehicle._vehicle)) {
                if (_api_1.RAGERP.utils.distanceToPos(player.position, vehicle._vehicle.position) > radius)
                    continue;
                return vehicle;
            }
        }
        return null;
    }
};
exports.vehicleManager = vehicleManager;
