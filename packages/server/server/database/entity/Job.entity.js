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
exports.JobEntity = void 0;
// src/database/entity/Job.entity.ts
const typeorm_1 = require("typeorm");
const Character_entity_1 = require("./Character.entity");
let JobEntity = class JobEntity {
};
exports.JobEntity = JobEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], JobEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Character_entity_1.CharacterEntity, (character) => character.jobs),
    (0, typeorm_1.JoinColumn)({ name: "character_id" }),
    __metadata("design:type", Character_entity_1.CharacterEntity)
], JobEntity.prototype, "character", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int" }),
    __metadata("design:type", Number)
], JobEntity.prototype, "jobId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", nullable: true }),
    __metadata("design:type", Number)
], JobEntity.prototype, "rankId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "numeric", default: 0 }),
    __metadata("design:type", Number)
], JobEntity.prototype, "salary", void 0);
exports.JobEntity = JobEntity = __decorate([
    (0, typeorm_1.Entity)({ name: "player_jobs" })
], JobEntity);
