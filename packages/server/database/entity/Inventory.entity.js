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
exports.InventoryItemsEntity = void 0;
const typeorm_1 = require("typeorm");
const Character_entity_1 = require("./Character.entity");
let InventoryItemsEntity = class InventoryItemsEntity {
    constructor() {
        this.clothes = {};
        this.pockets = {};
        this.quickUse = {};
    }
};
exports.InventoryItemsEntity = InventoryItemsEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], InventoryItemsEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "jsonb" }),
    __metadata("design:type", Object)
], InventoryItemsEntity.prototype, "clothes", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "jsonb" }),
    __metadata("design:type", Object)
], InventoryItemsEntity.prototype, "pockets", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "jsonb" }),
    __metadata("design:type", Object)
], InventoryItemsEntity.prototype, "quickUse", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Character_entity_1.CharacterEntity, (character) => character.items),
    __metadata("design:type", Character_entity_1.CharacterEntity)
], InventoryItemsEntity.prototype, "character", void 0);
exports.InventoryItemsEntity = InventoryItemsEntity = __decorate([
    (0, typeorm_1.Entity)({ name: "inventory_items" })
], InventoryItemsEntity);
