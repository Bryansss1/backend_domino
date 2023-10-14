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
exports.BaseMiddlewares = void 0;
const postgreSql_1 = require("../../config/postgreSql");
const auth_utils_1 = require("../utils/auth.utils");
const httpError_utils_1 = require("../utils/httpError.utils");
class BaseMiddlewares {
    constructor(entity) {
        this.repository = postgreSql_1.AppDataSource.getRepository(entity);
    }
    checkId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const idCheck = yield this.repository.findOneBy({ id: Number(id) });
                if (!idCheck)
                    return httpError_utils_1.httpError.response(res, 404, "ID not found");
                return next();
            }
            catch (error) {
                httpError_utils_1.httpError.internal(res, 500, error);
            }
        });
    }
    checkToken(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { token } = req.cookies;
            try {
                if (!token)
                    return httpError_utils_1.httpError.response(res, 400, "A token is expected");
                const jwtPayload = auth_utils_1.authUtils.verifyToken(token);
                if (!jwtPayload)
                    return httpError_utils_1.httpError.response(res, 400, "Invalid token");
                next();
            }
            catch (error) {
                httpError_utils_1.httpError.internal(res, 500, error);
            }
        });
    }
    getRepository(entity) {
        return __awaiter(this, void 0, void 0, function* () {
            return postgreSql_1.AppDataSource.getRepository(entity);
        });
    }
}
exports.BaseMiddlewares = BaseMiddlewares;
