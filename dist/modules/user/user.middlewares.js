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
exports.UserMiddlewares = void 0;
const baseMiddleware_1 = require("../../shared/middleware/baseMiddleware");
const user_entity_1 = require("./user.entity");
const httpError_utils_1 = require("../../shared/utils/httpError.utils");
class UserMiddlewares extends baseMiddleware_1.BaseMiddlewares {
    constructor() {
        super(user_entity_1.UserEntity);
    }
    checkUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { dni, email, phone } = req.body;
            try {
                if (!dni || !email || !phone)
                    return httpError_utils_1.httpError.response(res, 400, "Incomplete data");
                const userMail = yield this.repository.findOne({ where: { email } });
                if (userMail)
                    return httpError_utils_1.httpError.response(res, 400, "Email already exists");
                const userDni = yield this.repository.findOne({ where: { dni } });
                if (userDni)
                    return httpError_utils_1.httpError.response(res, 400, "Dni already exists");
                const userPhone = yield this.repository.findOne({ where: { phone } });
                if (userPhone)
                    return httpError_utils_1.httpError.response(res, 400, "Phone already exists");
                next();
            }
            catch (error) {
                httpError_utils_1.httpError.internal(res, 500, error);
            }
        });
    }
}
exports.UserMiddlewares = UserMiddlewares;
