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
exports.businessUtils = exports.BusinessUtils = void 0;
const accountUser_entity_1 = require("../accountUser/accountUser.entity");
const accountUser_services_1 = require("../accountUser/accountUser.services");
const user_services_1 = require("../user/user.services");
class BusinessUtils {
    getAccountNumber(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield (yield accountUser_services_1.accountUserServices.getRepository(accountUser_entity_1.AccountUserEntity)).findOne({ where: { accountNumber: userData } });
            if (!user) {
                user = yield (yield accountUser_services_1.accountUserServices.getRepository(accountUser_entity_1.AccountUserEntity)).findOne({ where: { alias: userData } });
                if (!user) {
                    user = yield (yield accountUser_services_1.accountUserServices.getRepository(accountUser_entity_1.AccountUserEntity)).findOne({ where: { accountCard: { cardNumber: userData } } });
                    if (!user)
                        throw new Error("User not found");
                }
            }
            return user.accountNumber;
        });
    }
    getUserByAccountNumber(accountNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            const accountUser = yield (yield accountUser_services_1.accountUserServices.getRepository(accountUser_entity_1.AccountUserEntity)).findOne({ where: { accountNumber } });
            if (!accountUser)
                throw new Error("User not found");
            const id = accountUser.user.id;
            const user = yield user_services_1.userServices.getServicesById(id);
            if (!user)
                throw new Error("User not found");
            return user;
        });
    }
}
exports.BusinessUtils = BusinessUtils;
exports.businessUtils = new BusinessUtils();
