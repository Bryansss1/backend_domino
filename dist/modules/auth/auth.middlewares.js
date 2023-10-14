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
exports.AuthMiddlewares = void 0;
const user_entity_1 = require("../user/user.entity");
const hashPassword_utils_1 = require("../../shared/utils/hashPassword.utils");
const httpError_utils_1 = require("../../shared/utils/httpError.utils");
class AuthMiddlewares {
    checkDataUserMiddleware(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            try {
                if (!email || !password)
                    return httpError_utils_1.httpError.response(res, 400, "Email and password are required");
                const user = yield user_entity_1.UserEntity.findOneBy({ email });
                if (!user)
                    return httpError_utils_1.httpError.response(res, 400, "Incorrect data");
                const userPass = yield hashPassword_utils_1.hashPassword.comparePassword(password, user.password);
                if (!userPass)
                    return httpError_utils_1.httpError.response(res, 400, "Incorrect data");
                next();
            }
            catch (error) {
                httpError_utils_1.httpError.internal(res, 500, error);
            }
        });
    }
}
exports.AuthMiddlewares = AuthMiddlewares;
