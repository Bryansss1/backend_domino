"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrencyMiddlewares = void 0;
const baseMiddleware_1 = require("../../shared/middleware/baseMiddleware");
const currency_entity_1 = require("./currency.entity");
class CurrencyMiddlewares extends baseMiddleware_1.BaseMiddlewares {
    constructor() {
        super(currency_entity_1.CurrencyEntity);
    }
}
exports.CurrencyMiddlewares = CurrencyMiddlewares;
