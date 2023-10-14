"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountCardServices = exports.AccountCardServices = void 0;
const baseServices_1 = require("../../shared/services/baseServices");
const accountCard_entity_1 = require("./accountCard.entity");
class AccountCardServices extends baseServices_1.BaseServices {
    constructor() {
        super(accountCard_entity_1.AccountCardEntity);
    }
}
exports.AccountCardServices = AccountCardServices;
exports.accountCardServices = new AccountCardServices();
