"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDto = void 0;
class UserDto {
    constructor(userId, email, phone, address, country, postalCode, fullName, lastName) {
        this.userId = userId;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.country = country;
        this.postalCode = postalCode;
        this.fullName = fullName;
        this.lastName = lastName;
    }
}
exports.UserDto = UserDto;
