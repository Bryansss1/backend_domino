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
exports.favoriteContactsServices = exports.FavoriteContactServices = void 0;
const baseServices_1 = require("../../shared/services/baseServices");
const favoriteContacts_entity_1 = require("./favoriteContacts.entity");
class FavoriteContactServices extends baseServices_1.BaseServices {
    constructor() {
        super(favoriteContacts_entity_1.FavoriteContactsEntity);
    }
    getAllByUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.repository.find({ where: { user: { userId } } });
            return result;
        });
    }
    getFavoriteContactByNickName(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const contact = yield this.repository.findOne({ where: { nickname: data } });
            return contact;
        });
    }
}
exports.FavoriteContactServices = FavoriteContactServices;
exports.favoriteContactsServices = new FavoriteContactServices();
