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
exports.UserEntity = void 0;
const typeorm_1 = require("typeorm");
const baseEntity_1 = require("../../shared/entity/baseEntity");
const accountUser_entity_1 = require("../accountUser/accountUser.entity");
const favoriteContacts_entity_1 = require("../favoriteContacts/favoriteContacts.entity");
let UserEntity = class UserEntity extends baseEntity_1.BaseEntityApp {
};
__decorate([
    (0, typeorm_1.Column)(),
    (0, typeorm_1.Generated)("uuid"),
    __metadata("design:type", String)
], UserEntity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 150,
        unique: true,
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserEntity.prototype, "fullName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserEntity.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserEntity.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], UserEntity.prototype, "isVerify", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserEntity.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserEntity.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "dni", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "postalCode", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => favoriteContacts_entity_1.FavoriteContactsEntity, (favoriteContacts) => favoriteContacts.user, { eager: true }),
    __metadata("design:type", Array)
], UserEntity.prototype, "favoriteContacts", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => accountUser_entity_1.AccountUserEntity, (account) => account.user, {
        cascade: true,
        eager: true,
    }),
    __metadata("design:type", Array)
], UserEntity.prototype, "account", void 0);
UserEntity = __decorate([
    (0, typeorm_1.Entity)()
], UserEntity);
exports.UserEntity = UserEntity;
