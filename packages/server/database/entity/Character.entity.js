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
exports.CharacterEntity = void 0;
const typeorm_1 = require("typeorm");
const Inventory_entity_1 = require("./Inventory.entity");
const Core_class_1 = require("@modules/inventory/Core.class");
const CEFEvent_class_1 = require("@classes/CEFEvent.class");
const Command_class_1 = require("@classes/Command.class");
const Account_entity_1 = require("./Account.entity");
const Death_event_1 = require("@events/Death.event");
const index_1 = require("@shared/index");
const Bank_entity_1 = require("@entities/Bank.entity");
let CharacterEntity = class CharacterEntity {
    constructor() {
        this.adminlevel = 0;
        this.appearance = {
            face: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0, 13: 0, 14: 0, 15: 0, 16: 0, 17: 0, 18: 0, 19: 0 },
            parents: { father: 0, mother: 0, leatherMix: 0, similarity: 0 },
            hair: { head: 0, eyebrows: 0, chest: 0, beard: 0 },
            color: { head: 0, head_secondary: 0, eyebrows: 0, eyes: 0, chest: 0, beard: 0, lipstick: 0 }
        };
        this.lastlogin = null;
        this.gender = 0;
        this.level = 1;
        this.wantedLevel = 0;
        this.deathState = 0 /* RageShared.Players.Enums.DEATH_STATES.STATE_NONE */;
        this.cash = 1500;
        this.inventory = null;
        this.loadInventory = function (player) {
            if (!mp.players.exists(player) || !player.character)
                return;
            const inventoryData = player.character.items;
            player.character.inventory = new Core_class_1.Inventory(player, inventoryData.clothes, inventoryData.pockets, inventoryData.quickUse);
            player.character.inventory.loadInventory(player);
        };
    }
    async save(player) { }
    applyAppearance(player) {
        if (!player || !mp.players.exists(player) || !player.character)
            return;
        const data = player.character.appearance;
        const gender = player.model === mp.joaat("mp_m_freemode_01");
        player.setHeadBlend(data.parents.mother, data.parents.father, 4, data.parents.mother, data.parents.father, 0, (data.parents.similarity / 100) * -1, (data.parents.leatherMix / 100) * -1, 0);
        player.setHairColor(data.color.head, typeof data.color.head_secondary === "undefined" ? 0 : data.color.head_secondary);
        if (gender) {
            player.setHeadOverlay(1, [data.hair.beard, 1, data.color.beard, data.color.beard]);
        }
        else {
            player.setHeadOverlay(1, [data.hair.beard, 0, 1, 1]);
            player.setHeadOverlay(10, [data.hair.chest, 0, 1, 1]);
        }
        player.eyeColor = data.color.eyes;
        player.setClothes(2, data.hair.head, 0, 0);
        for (let i = 0; i < 20; i++) {
            player.setFaceFeature(i, data.face[i] / 100);
        }
    }
    setStoreData(player, key, value) {
        return player.call("client::eventManager", ["cef::player:setPlayerData", key, value]);
    }
    async spawn(player) {
        if (!player || !mp.players.exists(player) || !player.character)
            return;
        const { x, y, z, heading } = player.character.position;
        player.character.applyAppearance(player);
        player.character.loadInventory(player);
        player.character.setStoreData(player, "ping", player.ping);
        player.character.setStoreData(player, "wantedLevel", player.character.wantedLevel);
        player.setVariable("adminLevel", player.character.adminlevel);
        CEFEvent_class_1.CefEvent.emit(player, "player", "setKeybindData", { I: "Open Inventory", ALT: "Interaction" });
        await player.requestCollisionAt(x, y, z).then(() => {
            player.spawn(new mp.Vector3(x, y, z));
        });
        player.heading = heading;
        if (player.character.deathState === 1 /* RageShared.Players.Enums.DEATH_STATES.STATE_INJURED */) {
            (0, Death_event_1.setPlayerToInjuredState)(player);
        }
        player.outputChatBox(`Welcome to !{red}RAGEMP ROLEPLAY!{white} ${player.name}!`);
        if (player.character.adminlevel) {
            player.outputChatBox(`>>> You are logged in as !{green}LEVEL ${player.character.adminlevel}!{white} admin!`);
        }
        player.character.setStoreData(player, "cash", player.character.cash);
        !player.character.lastlogin ? (player.character.lastlogin = new Date()) : player.outputChatBox(`Your last login was on ${player.character.lastlogin}`);
        player.character.lastlogin = new Date();
        Command_class_1.CommandRegistry.reloadCommands(player);
    }
    async getData(data) {
        return this[data];
    }
};
exports.CharacterEntity = CharacterEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], CharacterEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Account_entity_1.AccountEntity, (account) => account.id),
    __metadata("design:type", Account_entity_1.AccountEntity)
], CharacterEntity.prototype, "account", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", width: 11, default: 0 }),
    __metadata("design:type", Number)
], CharacterEntity.prototype, "adminlevel", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "jsonb", default: null }),
    __metadata("design:type", Object)
], CharacterEntity.prototype, "appearance", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp", nullable: true }),
    __metadata("design:type", Date)
], CharacterEntity.prototype, "lastlogin", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 32 }),
    __metadata("design:type", String)
], CharacterEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", width: 11, default: 0 }),
    __metadata("design:type", Number)
], CharacterEntity.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", width: 11, default: 1 }),
    __metadata("design:type", Number)
], CharacterEntity.prototype, "level", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "jsonb", default: null }),
    __metadata("design:type", Object)
], CharacterEntity.prototype, "position", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Inventory_entity_1.InventoryItemsEntity, (items) => items.character, { cascade: true, onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Inventory_entity_1.InventoryItemsEntity)
], CharacterEntity.prototype, "items", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", width: 11, default: 0 }),
    __metadata("design:type", Number)
], CharacterEntity.prototype, "wantedLevel", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", width: 11, default: 0 }),
    __metadata("design:type", Number)
], CharacterEntity.prototype, "deathState", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", width: 11, default: 1500 }),
    __metadata("design:type", Number)
], CharacterEntity.prototype, "cash", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Bank_entity_1.BankAccountEntity, (bank) => bank.character),
    __metadata("design:type", Array)
], CharacterEntity.prototype, "bank", void 0);
exports.CharacterEntity = CharacterEntity = __decorate([
    (0, typeorm_1.Entity)({ name: "characters" }),
    __metadata("design:paramtypes", [])
], CharacterEntity);
