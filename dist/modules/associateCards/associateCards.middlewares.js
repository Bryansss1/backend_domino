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
exports.AssociateCardsMiddlewares = void 0;
const baseMiddleware_1 = require("../../shared/middleware/baseMiddleware");
const associateCards_entity_1 = require("./associateCards.entity");
const httpError_utils_1 = require("../../shared/utils/httpError.utils");
class AssociateCardsMiddlewares extends baseMiddleware_1.BaseMiddlewares {
    constructor() {
        super(associateCards_entity_1.AssociateCardsEntity);
    }
    checkDataCards(req, res, nex) {
        return __awaiter(this, void 0, void 0, function* () {
            const { cardNumber, cvv, issuingEntity, type, cardholder } = req.body;
            try {
                if (!cardNumber || !cvv || !issuingEntity || !type || !cardholder) {
                    return httpError_utils_1.httpError.response(res, 400, "Incomplete data");
                }
                nex();
            }
            catch (error) {
                httpError_utils_1.httpError.internal(res, 500, error);
            }
        });
    }
    checkCardNumber(req, res, nex) {
        return __awaiter(this, void 0, void 0, function* () {
            const { cardNumber } = req.body;
            try {
                if (!cardNumber) {
                    return httpError_utils_1.httpError.response(res, 400, "Card number required");
                }
                nex();
            }
            catch (error) {
                httpError_utils_1.httpError.internal(res, 500, error);
            }
        });
    }
}
exports.AssociateCardsMiddlewares = AssociateCardsMiddlewares;
