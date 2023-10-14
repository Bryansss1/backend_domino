"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountUserMiddlewares = void 0;
const baseMiddleware_1 = require("../../shared/middleware/baseMiddleware");
const accountUser_entity_1 = require("./accountUser.entity");
class AccountUserMiddlewares extends baseMiddleware_1.BaseMiddlewares {
    constructor() {
        super(accountUser_entity_1.AccountUserEntity);
    }
}
exports.AccountUserMiddlewares = AccountUserMiddlewares;
