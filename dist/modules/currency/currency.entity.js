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
exports.CurrencyEntity = void 0;
const typeorm_1 = require("typeorm");
const baseEntity_1 = require("../../shared/entity/baseEntity");
const accountAmount_entity_1 = require("../accountAmount/accountAmount.entity");
const business_entity_1 = require("../business/business.entity");
let CurrencyEntity = class CurrencyEntity extends baseEntity_1.BaseEntityApp {
};
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CurrencyEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CurrencyEntity.prototype, "acronym", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => business_entity_1.BusinessEntity, business => business.currency),
    __metadata("design:type", business_entity_1.BusinessEntity)
], CurrencyEntity.prototype, "business", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => accountAmount_entity_1.AccountAmountEntity, accountAmount => accountAmount.currency),
    __metadata("design:type", Array)
], CurrencyEntity.prototype, "accountAmount", void 0);
CurrencyEntity = __decorate([
    (0, typeorm_1.Entity)()
], CurrencyEntity);
exports.CurrencyEntity = CurrencyEntity;
