"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountUserServices = exports.AccountUserServices = void 0;
const baseServices_1 = require("../../shared/services/baseServices");
const accountUser_entity_1 = require("./accountUser.entity");
class AccountUserServices extends baseServices_1.BaseServices {
    constructor() {
        super(accountUser_entity_1.AccountUserEntity);
    }
    getAccountUserByAccountNumber(accountNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            const account = yield this.repository.findOne({ where: { accountNumber } });
            if (!account)
                throw new Error("Account not found");
            return account;
        });
    }
}
exports.AccountUserServices = AccountUserServices;
exports.accountUserServices = new AccountUserServices();
