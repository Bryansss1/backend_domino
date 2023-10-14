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
exports.AuthController = void 0;
const generalDto_1 = require("../../shared/dto/generalDto");
const auth_services_1 = require("./auth.services");
const httpError_utils_1 = require("../../shared/utils/httpError.utils");
class AuthController extends auth_services_1.AuthServices {
    constructor() {
        super();
    }
    postController(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = req.body;
            try {
                const resp = yield this.postService(email);
                const { token, user } = resp;
                req.session.token = token;
                req.session.user = user;
                const payload = generalDto_1.generalDto.loginReturn(user);
                res.cookie("token", token.toString(), {
                    httpOnly: true,
                });
                res.cookie("user", JSON.stringify(user), {
                    httpOnly: true,
                });
                res.json({
                    status: "success",
                    payload,
                });
            }
            catch (error) {
                console.log(error);
                httpError_utils_1.httpError.internal(res, 500, error);
            }
        });
    }
}
exports.AuthController = AuthController;
