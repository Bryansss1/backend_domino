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
exports.AccountUserEntity = void 0;
const typeorm_1 = require("typeorm");
const baseEntity_1 = require("../../shared/entity/baseEntity");
const accountAmount_entity_1 = require("../accountAmount/accountAmount.entity");
const accountCard_entity_1 = require("../accountCard/accountCard.entity");
const associateCards_entity_1 = require("../associateCards/associateCards.entity");
const business_entity_1 = require("../business/business.entity");
const favoriteContacts_entity_1 = require("../favoriteContacts/favoriteContacts.entity");
const user_entity_1 = require("../user/user.entity");
let AccountUserEntity = class AccountUserEntity extends baseEntity_1.BaseEntityApp {
};
__decorate([
    (0, typeorm_1.Column)({ length: 100, unique: true }),
    __metadata("design:type", String)
], AccountUserEntity.prototype, "alias", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: "CA" }),
    __metadata("design:type", String)
], AccountUserEntity.prototype, "typeCount", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], AccountUserEntity.prototype, "accountNumber", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (user) => user.account),
    __metadata("design:type", user_entity_1.UserEntity)
], AccountUserEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => business_entity_1.BusinessEntity, (business) => business.accountUser, {
        cascade: true,
        eager: true
    }),
    __metadata("design:type", Array)
], AccountUserEntity.prototype, "business", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => favoriteContacts_entity_1.FavoriteContactsEntity, (favoriteContacts) => favoriteContacts.accountUser),
    __metadata("design:type", Array)
], AccountUserEntity.prototype, "favoriteContacts", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => accountCard_entity_1.AccountCardEntity, (accountCard) => accountCard.accountUser, {
        cascade: true,
        eager: true,
    }),
    __metadata("design:type", Array)
], AccountUserEntity.prototype, "accountCard", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => accountAmount_entity_1.AccountAmountEntity, (accountAmount) => accountAmount.accountUser, {
        cascade: true,
        eager: true,
    }),
    __metadata("design:type", Array)
], AccountUserEntity.prototype, "accountAmount", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => associateCards_entity_1.AssociateCardsEntity, (associateCards) => associateCards.accountUser, {
        cascade: true,
        eager: true,
    }),
    __metadata("design:type", Array)
], AccountUserEntity.prototype, "associateCards", void 0);
AccountUserEntity = __decorate([
    (0, typeorm_1.Entity)()
], AccountUserEntity);
exports.AccountUserEntity = AccountUserEntity;
