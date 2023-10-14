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
exports.operationsServices = void 0;
const postgreSql_1 = require("../../config/postgreSql");
const accountAmount_entity_1 = require("../../modules/accountAmount/accountAmount.entity");
const accountUser_entity_1 = require("../../modules/accountUser/accountUser.entity");
const business_dto_1 = require("../../modules/business/business.dto");
const business_entity_1 = require("../../modules/business/business.entity");
class OperationsServices {
    addMoney(amountQuantity, account) {
        return __awaiter(this, void 0, void 0, function* () {
            const accountUser = yield this.getAccount(account);
            const id = accountUser === null || accountUser === void 0 ? void 0 : accountUser.accountAmount[0].id;
            const accountAmount = yield postgreSql_1.AppDataSource.getRepository(accountAmount_entity_1.AccountAmountEntity).findOne({
                where: {
                    id,
                },
            });
            yield postgreSql_1.AppDataSource.getRepository(accountAmount_entity_1.AccountAmountEntity).update({ accountUser: accountUser }, { amount: (accountAmount === null || accountAmount === void 0 ? void 0 : accountAmount.amount) + amountQuantity });
        });
    }
    removeMoney(amountQuantity, account) {
        return __awaiter(this, void 0, void 0, function* () {
            const accountUser = yield this.getAccount(account);
            const id = accountUser === null || accountUser === void 0 ? void 0 : accountUser.accountAmount[0].id;
            const accountAmount = yield postgreSql_1.AppDataSource.getRepository(accountAmount_entity_1.AccountAmountEntity).findOne({
                where: {
                    id,
                },
            });
            if ((accountAmount === null || accountAmount === void 0 ? void 0 : accountAmount.amount) < amountQuantity)
                throw new Error("Insufficient funds");
            yield postgreSql_1.AppDataSource.getRepository(accountAmount_entity_1.AccountAmountEntity).update({ accountUser: accountUser }, { amount: (accountAmount === null || accountAmount === void 0 ? void 0 : accountAmount.amount) - amountQuantity });
        });
    }
    getAccount(account) {
        return __awaiter(this, void 0, void 0, function* () {
            const accountUser = yield postgreSql_1.AppDataSource.getRepository(accountUser_entity_1.AccountUserEntity).findOneBy({
                accountNumber: account,
            });
            if (!accountUser) {
                return yield postgreSql_1.AppDataSource.getRepository(accountUser_entity_1.AccountUserEntity).findOneBy({ alias: account });
            }
            return accountUser;
        });
    }
    getAccountByCard(card) {
        return __awaiter(this, void 0, void 0, function* () {
            const accountUser = yield postgreSql_1.AppDataSource.getRepository(accountUser_entity_1.AccountUserEntity).findOne({
                where: { accountCard: { cardNumber: card } },
            });
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            return accountUser.accountNumber;
        });
    }
    operationTransfer(emitter, addressee, amountQuantity) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.removeMoney(amountQuantity, emitter);
            yield this.addMoney(amountQuantity, addressee);
        });
    }
    operationExtraction(emitter, amountQuantity) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.removeMoney(amountQuantity, emitter);
        });
    }
    operationPayment(emitter, amountQuantity) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.removeMoney(amountQuantity, emitter);
        });
    }
    operationPayCard(emitter, amountQuantity) {
        return __awaiter(this, void 0, void 0, function* () {
            const accountNumber = yield this.getAccountByCard(emitter);
            yield this.removeMoney(amountQuantity, accountNumber);
        });
    }
    operationDeposit(addressee, amountQuantity) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.addMoney(amountQuantity, addressee);
        });
    }
    operationManager(typeTransaction, emitter, addressee, amountQuantity, subject) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (typeTransaction) {
                case business_entity_1.Transaction.TRANSFER:
                    yield this.operationTransfer(emitter, addressee, amountQuantity);
                    return this.transferResponse(amountQuantity, emitter, addressee, subject);
                case business_entity_1.Transaction.EXTRACTION:
                    yield this.operationExtraction(emitter, amountQuantity);
                    return this.extractionResponse(amountQuantity, emitter, subject);
                case business_entity_1.Transaction.PAY:
                    yield this.operationPayment(emitter, amountQuantity);
                    return this.paymentResponse(amountQuantity, emitter, business_entity_1.PayServices.NETFLIX, subject);
                case business_entity_1.Transaction.CARD:
                    yield this.operationPayCard(emitter, amountQuantity);
                    return this.paymentResponse(amountQuantity, emitter, business_entity_1.PayServices.NETFLIX, subject);
                case business_entity_1.Transaction.DEPOSIT:
                    yield this.operationDeposit(emitter, amountQuantity);
                    return this.despositResponse(amountQuantity, emitter, subject);
                default:
                    throw new Error("Transaction type not found");
            }
        });
    }
    transferResponse(amount, emitter, addressee, subject) {
        const response = new business_dto_1.BusinessDto(emitter, addressee, 1, amount, business_entity_1.Status.APPROVED, business_entity_1.Transaction.TRANSFER, subject);
        return response;
    }
    extractionResponse(amount, emitter, subject) {
        const response = new business_dto_1.BusinessDto(emitter, "ATM", 1, amount, business_entity_1.Status.APPROVED, business_entity_1.Transaction.EXTRACTION, subject);
        return response;
    }
    paymentResponse(amount, emitter, payService, subject) {
        const response = new business_dto_1.BusinessDto(emitter, payService, 1, amount, business_entity_1.Status.APPROVED, business_entity_1.Transaction.PAY, subject);
        return response;
    }
    despositResponse(amount, addressee, subject) {
        const response = new business_dto_1.BusinessDto("Domino", addressee, 1, amount, business_entity_1.Status.APPROVED, business_entity_1.Transaction.DEPOSIT, subject);
        return response;
    }
}
exports.operationsServices = new OperationsServices();
