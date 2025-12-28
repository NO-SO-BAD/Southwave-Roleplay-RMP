"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RAGERP = void 0;
const utils_module_1 = require("@shared/utils.module");
const CEFEvent_class_1 = require("@classes/CEFEvent.class");
const Command_class_1 = require("@classes/Command.class");
const Point_class_1 = require("@classes/Point.class");
const Vehicle_class_1 = require("@classes/Vehicle.class");
const Database_module_1 = require("../database/Database.module");
const Chat_module_1 = require("@modules/Chat.module");
/**
 * Namespace for the RAGERP system.
 * @namespace RAGERP
 */
var RAGERP;
(function (RAGERP) {
    /**
     * Main data source for the application.
     * @type {object}
     */
    RAGERP.database = Database_module_1.MainDataSource;
    /**
     * Pools for different entities.
     * @type {object}
     */
    RAGERP.pools = {
        /**
         * Pool for vehicle entities.
         * @type {object}
         */
        vehicles: Vehicle_class_1.vehiclePool,
        /**
         * Pool for dynamic points.
         * @type {object}
         */
        points: Point_class_1.dynamicPointPool
    };
    /**
     * Entities available in the system.
     * @type {object}
     */
    RAGERP.entities = {
        /**
         * Dynamic Points management.
         * @type {object}
         */
        points: {
            /**
             * Pool for dynamic points.
             * @type {object}
             */
            pool: Point_class_1.dynamicPointPool,
            /**
             * Constructor for new dynamic points.
             * @type {DynamicPoint}
             */
            new: Point_class_1.DynamicPoint
        },
        /**
         * Vehicle system management.
         * @type {object}
         */
        vehicles: {
            /**
             * Pool for vehicle entities.
             * @type {object}
             */
            pool: Vehicle_class_1.vehiclePool,
            /**
             * Manager for vehicle operations.
             * @type {object}
             */
            manager: Vehicle_class_1.vehicleManager,
            /**
             * Constructor for new vehicles.
             * @type {Vehicle}
             */
            new: Vehicle_class_1.Vehicle,
            /**
             * Alias for getting a vehicle by ID.
             * @type {function}
             */
            at: Vehicle_class_1.vehicleManager.at,
            /**
             * Alias for getting a vehicle by SQL ID.
             * @type {function}
             */
            atSQL: Vehicle_class_1.vehicleManager.atSQL,
            /**
             * Method for getting the nearest vehicle.
             * @type {function}
             */
            getNearest: Vehicle_class_1.vehicleManager.getNearest
        },
        /**
         * Placeholder for door controller.
         * @type {undefined}
         */
        doors: undefined,
        /**
         * Placeholder for gates controller.
         * @type {undefined}
         */
        gates: undefined
    };
    /**
     * Utility functions.
     * @type {object}
     */
    RAGERP.utils = utils_module_1.Utils;
    /**
     * Client Event Framework events.
     * @type {object}
     */
    RAGERP.cef = CEFEvent_class_1.CefEvent;
    /**
     * Command registry.
     * @type {object}
     */
    RAGERP.commands = Command_class_1.CommandRegistry;
    /**
     * Chat methods
     * @type {object}
     */
    RAGERP.chat = Chat_module_1.Chat;
})(RAGERP || (exports.RAGERP = RAGERP = {}));
