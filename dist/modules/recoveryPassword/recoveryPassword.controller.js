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
exports.RecoveryPasswordController = void 0;
const recoveryPassword_services_1 = require("./recoveryPassword.services");
const httpError_utils_1 = require("../../shared/utils/httpError.utils");
class RecoveryPasswordController extends recoveryPassword_services_1.RecoveryPasswordService {
    constructor() {
        super();
    }
    verifyEmailController(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = req.params;
            try {
                const result = yield this.verifyEmail(email);
                res.json({
                    status: "success",
                    response: result
                });
            }
            catch (error) {
                httpError_utils_1.httpError.internal(res, 500, error);
            }
        });
    }
    recoveryPasswordController(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = req.params;
            try {
                const result = yield this.recoveryPasswordServices(email);
                res.json({
                    status: "success",
                    response: result
                });
            }
            catch (error) {
                httpError_utils_1.httpError.internal(res, 500, error);
            }
        });
    }
    postController(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            try {
                const result = yield this.postService(body);
                res.json({
                    status: "success",
                    response: result
                });
            }
            catch (error) {
                httpError_utils_1.httpError.internal(res, 500, error);
            }
        });
    }
    putController(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const body = req.body;
            try {
                const result = yield this.putService(parseInt(id), body);
                res.json({
                    status: "success",
                    response: result
                });
            }
            catch (error) {
                httpError_utils_1.httpError.internal(res, 500, error);
            }
        });
    }
    deleteController(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const result = yield this.deleteService(parseInt(id));
                res.json({
                    status: "success",
                    response: result
                });
            }
            catch (error) {
                httpError_utils_1.httpError.internal(res, 500, error);
            }
        });
    }
}
exports.RecoveryPasswordController = RecoveryPasswordController;
