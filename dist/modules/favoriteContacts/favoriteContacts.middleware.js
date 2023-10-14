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
exports.FavoriteContactMiddleware = void 0;
const baseMiddleware_1 = require("../../shared/middleware/baseMiddleware");
const favoriteContacts_entity_1 = require("./favoriteContacts.entity");
const httpError_utils_1 = require("../../shared/utils/httpError.utils");
class FavoriteContactMiddleware extends baseMiddleware_1.BaseMiddlewares {
    constructor() {
        super(favoriteContacts_entity_1.FavoriteContactsEntity);
    }
    checkData(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nickname, data } = req.body;
            try {
                if (!nickname)
                    return httpError_utils_1.httpError.response(res, 400, "Nickname is required");
                const existsNickname = yield this.repository.findOne({ where: { nickname } });
                if (existsNickname)
                    return httpError_utils_1.httpError.response(res, 400, "The nickname already exists");
                if (!data)
                    return httpError_utils_1.httpError.response(res, 400, "Alias or account number is required");
                next();
            }
            catch (error) {
                httpError_utils_1.httpError.internal(res, 500, error);
            }
        });
    }
    checkNickName(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nickname } = req.body;
            try {
                if (!nickname)
                    return httpError_utils_1.httpError.response(res, 400, "Nickname is required");
                next();
            }
            catch (error) {
                httpError_utils_1.httpError.internal(res, 500, error);
            }
        });
    }
}
exports.FavoriteContactMiddleware = FavoriteContactMiddleware;
