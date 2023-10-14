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
exports.accountUserHandler = void 0;
const postgreSql_1 = require("../../config/postgreSql");
const accountAmount_entity_1 = require("../accountAmount/accountAmount.entity");
const accountCard_entity_1 = require("../accountCard/accountCard.entity");
const accountCard_utils_1 = require("../accountCard/accountCard.utils");
const accountUser_entity_1 = require("../accountUser/accountUser.entity");
const accountUser_utils_1 = require("../accountUser/accountUser.utils");
const currency_services_1 = require("../currency/currency.services");
const user_entity_1 = require("./user.entity");
const hashPassword_utils_1 = require("../../shared/utils/hashPassword.utils");
class AccountUserHandler {
    createUserTransaction(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield postgreSql_1.AppDataSource.manager.transaction((transactionalEntityManager) => __awaiter(this, void 0, void 0, function* () {
                    const user = yield this.createUser(body, transactionalEntityManager);
                    if (!user)
                        throw new Error("user is null");
                    // TODO: verificar opciones de transporte
                    // await nodeMailerManager.sendVerifyEmail(user.email);
                    const accountUser = yield this.createAccountUser(user, transactionalEntityManager);
                    if (!accountUser)
                        throw new Error("accountUser is null");
                    const accountAmount = yield this.createAccountAmount(accountUser, transactionalEntityManager);
                    const accountCard = yield this.createAccountCard(accountUser, transactionalEntityManager);
                    if (!accountAmount || !accountCard)
                        throw new Error("accountAmount or accountCard is null");
                    return {
                        user,
                        accountAmount,
                        accountCard,
                        accountUser
                    };
                }));
                return result;
            }
            catch (error) {
                const e = error;
                throw new Error(e.message);
            }
        });
    }
    createUser(body, transactionalEntityManager) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = transactionalEntityManager.getRepository(user_entity_1.UserEntity);
            const { fullName, lastName, password, email, phone, address, dni, country, postalCode } = body;
            const newUser = new user_entity_1.UserEntity();
            newUser.fullName = fullName;
            newUser.lastName = lastName;
            newUser.address = address;
            newUser.country = country;
            newUser.dni = dni;
            newUser.email = email;
            newUser.phone = phone;
            newUser.postalCode = postalCode;
            newUser.password = yield hashPassword_utils_1.hashPassword.hashPassword(password);
            const result = yield userRepository.save(newUser);
            return result;
        });
    }
    createAccountUser(user, transactionalEntityManager) {
        return __awaiter(this, void 0, void 0, function* () {
            const accountRepository = transactionalEntityManager.getRepository(accountUser_entity_1.AccountUserEntity);
            const accountUser = new accountUser_entity_1.AccountUserEntity();
            accountUser.user = user;
            accountUser.alias = accountUser_utils_1.accountUserUtils.generateAlias(user.fullName, user.lastName, user.dni);
            accountUser.typeCount = "CA";
            accountUser.accountNumber = accountUser_utils_1.accountUserUtils.generateAccountNumber();
            const result = yield accountRepository.save(accountUser);
            return result;
        });
    }
    createAccountAmount(accountUser, transactionalEntityManager) {
        return __awaiter(this, void 0, void 0, function* () {
            const amountRepository = transactionalEntityManager.getRepository(accountAmount_entity_1.AccountAmountEntity);
            const accountAmount = new accountAmount_entity_1.AccountAmountEntity();
            accountAmount.accountUser = accountUser;
            accountAmount.amount = 0;
            const currency = yield currency_services_1.currencyServices.getServicesById(1);
            if (!currency)
                throw new Error("currency is null");
            accountAmount.currency = currency;
            const result = yield amountRepository.save(accountAmount);
            return result;
        });
    }
    createAccountCard(accountUser, transactionalEntityManager) {
        return __awaiter(this, void 0, void 0, function* () {
            const cardRepository = transactionalEntityManager.getRepository(accountCard_entity_1.AccountCardEntity);
            const accountCard = new accountCard_entity_1.AccountCardEntity();
            accountCard.cardNumber = accountCard_utils_1.cardUtils.generateCardNumber();
            accountCard.expiration = accountCard_utils_1.cardUtils.generateCardExpiration();
            accountCard.emission = new Date();
            accountCard.cvv = accountCard_utils_1.cardUtils.generateCardCvv();
            accountCard.accountUser = accountUser;
            const result = yield cardRepository.save(accountCard);
            return result;
        });
    }
}
exports.accountUserHandler = new AccountUserHandler();
