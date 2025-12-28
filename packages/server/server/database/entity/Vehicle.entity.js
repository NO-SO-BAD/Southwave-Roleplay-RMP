"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehicleEntity = void 0;
const typeorm_1 = require("typeorm");
let VehicleEntity = class VehicleEntity {
    constructor() {
        this.primaryColor = [255, 255, 255];
        this.secondaryColor = [255, 255, 255];
        this.neonColor = [255, 255, 255];
        this.wheelmods = { type: -1, mod: 0, color: 0 };
        // @Column({ type: "json" })
        // inventory: any;
        this.faction = null;
        this.keyhole = null;
        this.impoundState = 0;
    }
};
exports.VehicleEntity = VehicleEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], VehicleEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", width: 10, nullable: true, default: null }),
    __metadata("design:type", Number)
], VehicleEntity.prototype, "owner_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 50, nullable: true, default: null }),
    __metadata("design:type", String)
], VehicleEntity.prototype, "owner_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "bigint", nullable: true }),
    __metadata("design:type", Number)
], VehicleEntity.prototype, "model", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", default: "" }),
    __metadata("design:type", String)
], VehicleEntity.prototype, "modelname", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", width: 10, default: 0 }),
    __metadata("design:type", Number)
], VehicleEntity.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", width: 10, default: -1 }),
    __metadata("design:type", Number)
], VehicleEntity.prototype, "class", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", width: 10, default: 100 }),
    __metadata("design:type", Number)
], VehicleEntity.prototype, "fuel", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "json" }),
    __metadata("design:type", Array)
], VehicleEntity.prototype, "primaryColor", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "json" }),
    __metadata("design:type", Array)
], VehicleEntity.prototype, "secondaryColor", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", width: 10, default: 100 }),
    __metadata("design:type", Number)
], VehicleEntity.prototype, "dashboardColor", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", width: 10, default: 100 }),
    __metadata("design:type", Number)
], VehicleEntity.prototype, "interiorColor", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", width: 10, default: 0 }),
    __metadata("design:type", Number)
], VehicleEntity.prototype, "neon", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "jsonb" }),
    __metadata("design:type", Array)
], VehicleEntity.prototype, "neonColor", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", width: 10, default: 100 }),
    __metadata("design:type", Number)
], VehicleEntity.prototype, "livery", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", width: 10, default: 100 }),
    __metadata("design:type", Number)
], VehicleEntity.prototype, "extra", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "json" }),
    __metadata("design:type", Object)
], VehicleEntity.prototype, "wheelmods", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 8, default: "" }),
    __metadata("design:type", String)
], VehicleEntity.prototype, "plate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", width: 10, nullable: true, default: null }),
    __metadata("design:type", Number)
], VehicleEntity.prototype, "plate_color", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", default: 0 }),
    __metadata("design:type", Number)
], VehicleEntity.prototype, "is_locked", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "jsonb" }),
    __metadata("design:type", Object)
], VehicleEntity.prototype, "position", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "json" }),
    __metadata("design:type", Object)
], VehicleEntity.prototype, "modifications", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", width: 10, default: 0 }),
    __metadata("design:type", Number)
], VehicleEntity.prototype, "primaryColorType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", width: 10, default: 0 }),
    __metadata("design:type", Number)
], VehicleEntity.prototype, "secondaryColorType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", width: 10, default: 0 }),
    __metadata("design:type", Number)
], VehicleEntity.prototype, "dimension", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", default: 0 }),
    __metadata("design:type", Number)
], VehicleEntity.prototype, "isWanted", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 50, nullable: true, default: null }),
    __metadata("design:type", String)
], VehicleEntity.prototype, "faction", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 129, nullable: true, default: null }),
    __metadata("design:type", String)
], VehicleEntity.prototype, "keyhole", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", width: 11, default: 0 }),
    __metadata("design:type", Number)
], VehicleEntity.prototype, "impoundState", void 0);
exports.VehicleEntity = VehicleEntity = __decorate([
    (0, typeorm_1.Entity)({ name: "vehicles" })
], VehicleEntity);
