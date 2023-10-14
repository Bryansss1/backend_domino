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
exports.AccountAmountEntity = void 0;
const typeorm_1 = require("typeorm");
const baseEntity_1 = require("../../shared/entity/baseEntity");
const accountUser_entity_1 = require("../accountUser/accountUser.entity");
const currency_entity_1 = require("../currency/currency.entity");
let AccountAmountEntity = class AccountAmountEntity extends baseEntity_1.BaseEntityApp {
};
__decorate([
    (0, typeorm_1.Column)({ type: "real", default: 0 }),
    __metadata("design:type", Number)
], AccountAmountEntity.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => accountUser_entity_1.AccountUserEntity, (accountUser) => accountUser.accountAmount),
    __metadata("design:type", accountUser_entity_1.AccountUserEntity)
], AccountAmountEntity.prototype, "accountUser", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => currency_entity_1.CurrencyEntity, (currency) => currency.accountAmount),
    __metadata("design:type", currency_entity_1.CurrencyEntity)
], AccountAmountEntity.prototype, "currency", void 0);
AccountAmountEntity = __decorate([
    (0, typeorm_1.Entity)()
], AccountAmountEntity);
exports.AccountAmountEntity = AccountAmountEntity;
