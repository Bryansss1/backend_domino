"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountAmountMiddlewares = void 0;
const baseMiddleware_1 = require("../../shared/middleware/baseMiddleware");
const accountAmount_entity_1 = require("./accountAmount.entity");
class AccountAmountMiddlewares extends baseMiddleware_1.BaseMiddlewares {
    constructor() {
        super(accountAmount_entity_1.AccountAmountEntity);
    }
}
exports.AccountAmountMiddlewares = AccountAmountMiddlewares;
