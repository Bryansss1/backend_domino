"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountAmountServices = exports.AccountAmountService = void 0;
const baseServices_1 = require("../../shared/services/baseServices");
const accountAmount_entity_1 = require("./accountAmount.entity");
class AccountAmountService extends baseServices_1.BaseServices {
    constructor() {
        super(accountAmount_entity_1.AccountAmountEntity);
    }
}
exports.AccountAmountService = AccountAmountService;
exports.accountAmountServices = new AccountAmountService();
