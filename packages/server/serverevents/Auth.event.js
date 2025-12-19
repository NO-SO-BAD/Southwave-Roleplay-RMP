"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const _api_1 = require("@api");
const Account_entity_1 = require("@entities/Account.entity");
const Character_entity_1 = require("@entities/Character.entity");
function hashPassword(text) {
    return crypto_1.default.createHash("sha256").update(text).digest("hex");
}
_api_1.RAGERP.cef.register("auth", "register", async (player, data) => {
    const { username, email, password, confirmPassword } = _api_1.RAGERP.utils.parseObject(data);
    if (username.length < 4 || username.length > 32)
        return player.showNotify("error" /* RageShared.Enums.NotifyType.TYPE_ERROR */, "Your username must be between 4 and 32 characters.");
    if (password.length < 5)
        return player.showNotify("error" /* RageShared.Enums.NotifyType.TYPE_ERROR */, "Your password must contain at least 5 characters.");
    if (password !== confirmPassword)
        return player.showNotify("error" /* RageShared.Enums.NotifyType.TYPE_ERROR */, "Password mismatch.");
    const accountExists = await _api_1.RAGERP.database.getRepository(Account_entity_1.AccountEntity).findOne({ where: { username, email } });
    if (accountExists)
        return player.showNotify("error" /* RageShared.Enums.NotifyType.TYPE_ERROR */, "Account username or email exists.");
    const accountData = new Account_entity_1.AccountEntity();
    accountData.username = username.toLowerCase();
    accountData.password = hashPassword(password);
    accountData.socialClubId = player.rgscId;
    accountData.email = email;
    accountData.characters = [];
    const result = await _api_1.RAGERP.database.getRepository(Account_entity_1.AccountEntity).save(accountData);
    if (!result) {
        player.showNotify("info" /* RageShared.Enums.NotifyType.TYPE_INFO */, "An error occurred creating your account, please contact an admin.");
        return;
    }
    player.account = result;
    player.name = player.account.username;
    const characterData = Array.from({ length: 3 }, () => ({ id: -1, name: "", level: 0, money: 0, bank: 0, lastlogin: "", type: 0 }));
    _api_1.RAGERP.cef.emit(player, "player", "setCharacters", characterData);
    _api_1.RAGERP.cef.emit(player, "system", "setPage", "selectcharacter");
});
_api_1.RAGERP.cef.register("auth", "loginPlayer", async (player, data) => {
    const { username, password } = _api_1.RAGERP.utils.parseObject(data);
    const accountData = await _api_1.RAGERP.database.getRepository(Account_entity_1.AccountEntity).findOne({ where: { username: username.toLowerCase() } });
    if (!accountData)
        return player.showNotify("error" /* RageShared.Enums.NotifyType.TYPE_ERROR */, "We could not find that account!");
    if (hashPassword(password) !== accountData.password)
        return player.showNotify("error" /* RageShared.Enums.NotifyType.TYPE_ERROR */, "Wrong password.");
    player.account = accountData;
    player.name = player.account.username;
    const characters = await _api_1.RAGERP.database.getRepository(Character_entity_1.CharacterEntity).find({ where: { account: { id: accountData.id } }, take: 3 });
    const characterData = Array.from({ length: 3 }, () => ({ id: -1, name: "", level: 0, money: 0, bank: 0, lastlogin: "", type: 0 }));
    characters.forEach((x, idx) => {
        const character = { id: x.id, type: 1, name: x.name, bank: 0, money: 0, level: x.level, lastlogin: ".." };
        Object.assign(characterData[idx], character);
    });
    _api_1.RAGERP.cef.emit(player, "player", "setCharacters", characterData);
    _api_1.RAGERP.cef.emit(player, "system", "setPage", "selectcharacter");
});
