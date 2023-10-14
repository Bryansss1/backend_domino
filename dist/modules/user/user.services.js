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
exports.userServices = exports.UserService = void 0;
const baseServices_1 = require("../../shared/services/baseServices");
const accountUser_entity_1 = require("../accountUser/accountUser.entity");
const user_entity_1 = require("./user.entity");
class UserService extends baseServices_1.BaseServices {
    constructor() {
        super(user_entity_1.UserEntity);
    }
    getUserByaliasOremail(term) {
        return __awaiter(this, void 0, void 0, function* () {
            const AccountRepo = yield this.getRepository(accountUser_entity_1.AccountUserEntity);
            try {
                if (term.includes("@")) {
                    const result = yield this.repository.findOne({ where: { email: term } });
                    return result;
                }
                else {
                    const result = yield this.repository.findOne({ where: { account: { alias: term } } });
                    return result;
                }
            }
            catch (error) {
                return null;
            }
        });
    }
}
exports.UserService = UserService;
exports.userServices = new UserService();
