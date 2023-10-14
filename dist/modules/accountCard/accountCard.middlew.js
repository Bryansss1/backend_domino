"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountCardMiddlewares = void 0;
const baseMiddleware_1 = require("../../shared/middleware/baseMiddleware");
const accountCard_entity_1 = require("./accountCard.entity");
class AccountCardMiddlewares extends baseMiddleware_1.BaseMiddlewares {
    constructor() {
        super(accountCard_entity_1.AccountCardEntity);
    }
}
exports.AccountCardMiddlewares = AccountCardMiddlewares;
