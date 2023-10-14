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
exports.AssociateCardsEntity = void 0;
const typeorm_1 = require("typeorm");
const baseEntity_1 = require("../../shared/entity/baseEntity");
const accountUser_entity_1 = require("../accountUser/accountUser.entity");
var cardType;
(function (cardType) {
    cardType["DEBIT"] = "DEBIT";
    cardType["CREDIT"] = "CREDIT";
})(cardType || (cardType = {}));
var entityCard;
(function (entityCard) {
    entityCard["MASTERCARD"] = "MASTERCARD";
    entityCard["VISA"] = "VISA";
    entityCard["AMEX"] = "AMEX";
})(entityCard || (entityCard = {}));
let AssociateCardsEntity = class AssociateCardsEntity extends baseEntity_1.BaseEntityApp {
};
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: cardType, default: cardType.DEBIT }),
    __metadata("design:type", String)
], AssociateCardsEntity.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: entityCard, default: entityCard.VISA }),
    __metadata("design:type", String)
], AssociateCardsEntity.prototype, "issuingEntity", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], AssociateCardsEntity.prototype, "cardNumber", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], AssociateCardsEntity.prototype, "cardholder", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 3 }),
    __metadata("design:type", String)
], AssociateCardsEntity.prototype, "cvv", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => accountUser_entity_1.AccountUserEntity, (accountUser) => accountUser.associateCards),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", accountUser_entity_1.AccountUserEntity)
], AssociateCardsEntity.prototype, "accountUser", void 0);
AssociateCardsEntity = __decorate([
    (0, typeorm_1.Entity)()
], AssociateCardsEntity);
exports.AssociateCardsEntity = AssociateCardsEntity;
