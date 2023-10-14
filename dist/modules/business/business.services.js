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
exports.BusinessService = void 0;
const generalDto_1 = require("../../shared/dto/generalDto");
const baseServices_1 = require("../../shared/services/baseServices");
const accountUser_entity_1 = require("../accountUser/accountUser.entity");
const accountUser_services_1 = require("../accountUser/accountUser.services");
const business_entity_1 = require("./business.entity");
class BusinessService extends baseServices_1.BaseServices {
    constructor() {
        super(business_entity_1.BusinessEntity);
    }
    getBusinessType(termStatus, termTransaction) {
        return __awaiter(this, void 0, void 0, function* () {
            if (termStatus && termTransaction) {
                return yield this.repository.find({
                    where: { status: termStatus, transaction: termTransaction },
                });
            }
            if (termStatus) {
                return yield this.repository.find({ where: { status: termStatus } });
            }
            if (termTransaction) {
                return yield this.repository.find({ where: { transaction: termTransaction } });
            }
            return yield this.repository.find();
        });
    }
    getBusinessByUser(accountNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield (yield accountUser_services_1.accountUserServices.getRepository(accountUser_entity_1.AccountUserEntity)).findOne({ where: { accountNumber } });
            if (!user)
                throw new Error("User not found");
            const query = yield this.repository.createQueryBuilder("business")
                .where("business.senderId = :accountNumber OR business.receiverId = :accountNumber", { accountNumber })
                .getMany();
            const business = generalDto_1.generalDto.businessFilter(query);
            return business;
        });
    }
}
exports.BusinessService = BusinessService;
