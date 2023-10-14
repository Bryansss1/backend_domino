"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecoveryPasswordMiddlewares = void 0;
const baseMiddleware_1 = require("../../shared/middleware/baseMiddleware");
const recoveryPassword_entity_1 = require("./recoveryPassword.entity");
class RecoveryPasswordMiddlewares extends baseMiddleware_1.BaseMiddlewares {
    constructor() {
        super(recoveryPassword_entity_1.RecoveryPasswordEntity);
    }
}
exports.RecoveryPasswordMiddlewares = RecoveryPasswordMiddlewares;
