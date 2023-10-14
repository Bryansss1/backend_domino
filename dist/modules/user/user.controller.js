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
exports.UserController = void 0;
const user_utils_1 = require("./user.utils");
const user_services_1 = require("./user.services");
const httpError_utils_1 = require("../../shared/utils/httpError.utils");
const generalDto_1 = require("../../shared/dto/generalDto");
class UserController extends user_services_1.UserService {
    constructor() {
        super();
    }
    getAllController(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.getServices();
                res.json({
                    status: "success",
                    response: result,
                });
            }
            catch (error) {
                httpError_utils_1.httpError.internal(res, 500, error);
            }
        });
    }
    getByEmailorAlias(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { term } = req.params;
            if (!term)
                return httpError_utils_1.httpError.response(res, 400, "Alias or term is requerid");
            try {
                const result = yield this.getUserByaliasOremail(term);
                if (!result)
                    return httpError_utils_1.httpError.response(res, 400, "Alias or term is requerid");
                req.session.user = result;
                const payload = generalDto_1.generalDto.loginReturn(result);
                res.cookie("user", result, {
                    httpOnly: true,
                });
                res.json({
                    status: "success",
                    payload,
                });
            }
            catch (error) {
                httpError_utils_1.httpError.internal(res, 500, error);
            }
        });
    }
    getByIdController(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const result = yield this.getServicesById(parseInt(id));
                res.json({
                    status: "success",
                    response: result,
                });
            }
            catch (error) {
                httpError_utils_1.httpError.internal(res, 500, error);
            }
        });
    }
    postController(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield user_utils_1.accountUserHandler.createUserTransaction(req.body);
                if (!result)
                    httpError_utils_1.httpError.response(res, 400, "Error creating user");
                res.json({
                    status: "success",
                    response: "User created successfully",
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
                    response: result,
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
                    response: result,
                });
            }
            catch (error) {
                httpError_utils_1.httpError.internal(res, 500, error);
            }
        });
    }
}
exports.UserController = UserController;
