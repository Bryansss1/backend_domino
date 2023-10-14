"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusinessEntity = exports.PayServices = exports.Transaction = exports.Status = void 0;
const typeorm_1 = require("typeorm");
const baseEntity_1 = require("../../shared/entity/baseEntity");
const accountUser_entity_1 = require("../accountUser/accountUser.entity");
const currency_entity_1 = require("../currency/currency.entity");
var Status;
(function (Status) {
    Status["PENDING"] = "PENDING";
    Status["APPROVED"] = "APPROVED";
    Status["REJECTED"] = "REJECTED";
})(Status = exports.Status || (exports.Status = {}));
var Transaction;
(function (Transaction) {
    Transaction["PAY"] = "PAY";
    Transaction["DEPOSIT"] = "DEPOSIT";
    Transaction["EXTRACTION"] = "EXTRACTION";
    Transaction["TRANSFER"] = "TRANSFER";
    Transaction["CARD"] = "CARD";
})(Transaction = exports.Transaction || (exports.Transaction = {}));
var PayServices;
(function (PayServices) {
    PayServices["NETFLIX"] = "NETFLIX";
    PayServices["SPOTIFY"] = "SPOTIFY";
    PayServices["AMAZON"] = "AMAZON";
})(PayServices = exports.PayServices || (exports.PayServices = {}));
let BusinessEntity = class BusinessEntity extends baseEntity_1.BaseEntityApp {
};
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], BusinessEntity.prototype, "senderId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], BusinessEntity.prototype, "receiverId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], BusinessEntity.prototype, "currencyId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "real" }),
    __metadata("design:type", Number)
], BusinessEntity.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: Status,
        default: Status.PENDING,
    }),
    __metadata("design:type", String)
], BusinessEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: Transaction,
    }),
    __metadata("design:type", String)
], BusinessEntity.prototype, "transaction", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { nullable: true }),
    __metadata("design:type", String)
], BusinessEntity.prototype, "subject", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => accountUser_entity_1.AccountUserEntity, (accountUser) => accountUser.business),
    __metadata("design:type", accountUser_entity_1.AccountUserEntity)
], BusinessEntity.prototype, "accountUser", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => currency_entity_1.CurrencyEntity, (currency) => currency.business),
    __metadata("design:type", Array)
], BusinessEntity.prototype, "currency", void 0);
BusinessEntity = __decorate([
    (0, typeorm_1.Entity)()
], BusinessEntity);
exports.BusinessEntity = BusinessEntity;
