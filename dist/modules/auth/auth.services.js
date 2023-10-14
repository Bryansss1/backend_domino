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
exports.AuthServices = void 0;
const user_entity_1 = require("../user/user.entity");
const auth_utils_1 = require("../../shared/utils/auth.utils");
class AuthServices {
    postService(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = (yield user_entity_1.UserEntity.findOneBy({ email }));
            const token = auth_utils_1.authUtils.generateToken(user === null || user === void 0 ? void 0 : user.userId);
            return {
                user,
                token
            };
        });
    }
}
exports.AuthServices = AuthServices;
