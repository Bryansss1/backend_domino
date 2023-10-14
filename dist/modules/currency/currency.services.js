"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.currencyServices = exports.CurrencyService = void 0;
const baseServices_1 = require("../../shared/services/baseServices");
const currency_entity_1 = require("./currency.entity");
class CurrencyService extends baseServices_1.BaseServices {
    constructor() {
        super(currency_entity_1.CurrencyEntity);
    }
}
exports.CurrencyService = CurrencyService;
exports.currencyServices = new CurrencyService();
