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
exports.RecoveryPasswordService = void 0;
const nodemailer_1 = require("../../config/nodemailer");
const baseServices_1 = require("../../shared/services/baseServices");
const user_entity_1 = require("../user/user.entity");
const recoveryPassword_entity_1 = require("./recoveryPassword.entity");
class RecoveryPasswordService extends baseServices_1.BaseServices {
    constructor() {
        super(recoveryPassword_entity_1.RecoveryPasswordEntity);
    }
    verifyEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = yield this.getRepository(user_entity_1.UserEntity);
            const user = yield userRepository.findOne({ where: { email } });
            if (!user)
                throw new Error("User not found");
            yield userRepository.update({ email }, { isVerify: true });
            return { message: "User authenticated" };
        });
    }
    recoveryPasswordServices(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = yield this.getRepository(user_entity_1.UserEntity);
            const user = yield userRepository.findOne({ where: { email } });
            if (!user)
                throw new Error("User not found");
            const token = Math.random().toString(20).substring(2, 12);
            yield userRepository.update({ email }, { password: token });
            yield nodemailer_1.nodeMailerManager.recoveryPasswordEmail(email, user.fullName, token);
            return { message: "Check your email with you new password" };
        });
    }
}
exports.RecoveryPasswordService = RecoveryPasswordService;
