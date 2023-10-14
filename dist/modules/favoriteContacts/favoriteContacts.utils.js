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
exports.favoriteContactsUtils = void 0;
const postgreSql_1 = require("../../config/postgreSql");
const accountUser_entity_1 = require("../accountUser/accountUser.entity");
const accountUser_services_1 = require("../accountUser/accountUser.services");
class FavoriteContactsUtils {
    dataFilter(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const accountAliasUser = yield accountUser_services_1.accountUserServices.repository.findOne({ where: { alias: data } });
            const accountNumberUser = yield postgreSql_1.AppDataSource.getRepository(accountUser_entity_1.AccountUserEntity).findOne({
                where: { accountNumber: data },
            });
            if (!accountAliasUser && !accountNumberUser)
                return;
            if (accountAliasUser)
                return accountAliasUser;
            if (accountNumberUser)
                return accountNumberUser;
        });
    }
}
exports.favoriteContactsUtils = new FavoriteContactsUtils();
