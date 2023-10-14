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
exports.BusinessController = void 0;
const generalDto_1 = require("../../shared/dto/generalDto");
const operationsServices_1 = require("../../shared/services/operationsServices");
const business_services_1 = require("./business.services");
const httpError_utils_1 = require("../../shared/utils/httpError.utils");
const accountUser_services_1 = require("../accountUser/accountUser.services");
const business_utils_1 = require("./business.utils");
class BusinessController extends business_services_1.BusinessService {
    constructor() {
        super();
    }
    getAllControllerTerms(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { status, transaction } = req.query;
                // Hacer un middleware para verificar el estado
                const StatusEnum = status;
                const result = yield this.getBusinessType(StatusEnum, transaction);
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
    getByAccountController(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { accountNumber } = req.body;
            try {
                const number = yield business_utils_1.businessUtils.getAccountNumber(accountNumber);
                const payload = yield this.getBusinessByUser(number);
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
    postController(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { typeTransaction, emitter, addressee, amountQuantity, subject } = req.body;
            const { user } = req.cookies;
            try {
                const emitterNumber = yield business_utils_1.businessUtils.getAccountNumber(emitter);
                const addresseeNumber = yield business_utils_1.businessUtils.getAccountNumber(addressee);
                console.log(emitterNumber, addresseeNumber);
                const result = (yield operationsServices_1.operationsServices.operationManager(typeTransaction, emitterNumber, addresseeNumber, amountQuantity, subject));
                //! ESTO ES UN PARCHE
                const accountUser = yield accountUser_services_1.accountUserServices.getAccountUserByAccountNumber(emitterNumber);
                result.accountUser = accountUser;
                const newBusiness = Object.assign(Object.assign({}, result), { accountUser });
                yield this.postService(newBusiness);
                const data = yield this.getServices();
                const payload = generalDto_1.generalDto.businessFilter(data);
                res.json({
                    status: "success",
                    payload: payload[payload.length - 1],
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
exports.BusinessController = BusinessController;
