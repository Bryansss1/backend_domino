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
exports.BusinessMiddlewares = void 0;
const baseMiddleware_1 = require("../../shared/middleware/baseMiddleware");
const business_entity_1 = require("./business.entity");
const accountUser_entity_1 = require("../accountUser/accountUser.entity");
const httpError_utils_1 = require("../../shared/utils/httpError.utils");
class BusinessMiddlewares extends baseMiddleware_1.BaseMiddlewares {
    constructor() {
        super(business_entity_1.BusinessEntity);
    }
    checkTransactionType(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { typeTransaction } = req.body;
            try {
                const type = Object.values(business_entity_1.Transaction).includes(typeTransaction);
                if (!type)
                    return httpError_utils_1.httpError.response(res, 404, "Transaction type not found");
                next();
            }
            catch (error) {
                httpError_utils_1.httpError.internal(res, 500, error);
            }
        });
    }
    checkAccountUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { emitter, addressee } = req.body;
            try {
                const userEmitter = yield (yield this.getRepository(accountUser_entity_1.AccountUserEntity)).findOne({ where: { accountNumber: emitter } });
                const userAddressee = yield (yield this.getRepository(accountUser_entity_1.AccountUserEntity)).findOne({ where: { accountNumber: addressee } });
                if (!userEmitter) {
                    const userEmitterCard = yield (yield this.getRepository(accountUser_entity_1.AccountUserEntity)).findOne({ where: { accountCard: { cardNumber: emitter } } });
                    if (!userEmitterCard) {
                        const userEmitterAlias = yield (yield this.getRepository(accountUser_entity_1.AccountUserEntity)).findOne({ where: { alias: emitter } });
                        if (!userEmitterAlias)
                            return httpError_utils_1.httpError.response(res, 404, "Emitter user not found");
                    }
                }
                if (!userAddressee) {
                    const userAddresseeCard = yield (yield this.getRepository(accountUser_entity_1.AccountUserEntity)).findOne({ where: { accountCard: { cardNumber: emitter } } });
                    if (!userAddresseeCard) {
                        const userAddresseeAlias = yield (yield this.getRepository(accountUser_entity_1.AccountUserEntity)).findOne({ where: { alias: emitter } });
                        if (!userAddresseeAlias)
                            return httpError_utils_1.httpError.response(res, 404, "Emitter user not found");
                    }
                }
                next();
            }
            catch (error) {
                httpError_utils_1.httpError.internal(res, 500, error);
            }
        });
    }
}
exports.BusinessMiddlewares = BusinessMiddlewares;
