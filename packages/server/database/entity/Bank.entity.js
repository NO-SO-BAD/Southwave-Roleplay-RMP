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
exports.BankAccountEntity = void 0;
const typeorm_1 = require("typeorm");
const Character_entity_1 = require("@entities/Character.entity");
let BankAccountEntity = class BankAccountEntity {
};
exports.BankAccountEntity = BankAccountEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], BankAccountEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean", default: false }),
    __metadata("design:type", Boolean)
], BankAccountEntity.prototype, "isPrimary", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", width: 11, default: 0 }),
    __metadata("design:type", Number)
], BankAccountEntity.prototype, "accountnumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", width: 11, default: 0 }),
    __metadata("design:type", Number)
], BankAccountEntity.prototype, "pincode", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", width: 11, default: 0 }),
    __metadata("design:type", Number)
], BankAccountEntity.prototype, "balance", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 32, default: "" }),
    __metadata("design:type", String)
], BankAccountEntity.prototype, "accountholder", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Character_entity_1.CharacterEntity, (char) => char.bank),
    __metadata("design:type", Character_entity_1.CharacterEntity)
], BankAccountEntity.prototype, "character", void 0);
exports.BankAccountEntity = BankAccountEntity = __decorate([
    (0, typeorm_1.Entity)({ name: "bank_accounts" })
], BankAccountEntity);
