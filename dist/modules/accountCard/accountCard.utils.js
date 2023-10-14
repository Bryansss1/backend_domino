"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cardUtils = void 0;
class CardUtils {
    generateCardNumber() {
        const min = 100000000000000;
        const max = 999999999999999;
        const cardNumber = (Math.floor((Math.random() * (max - min + 1)) + min)).toString();
        return cardNumber;
    }
    generateCardCvv() {
        const min = 100;
        const max = 999;
        const cvv = (Math.floor((Math.random() * (max - min + 1)) + min)).toString();
        return cvv;
    }
    generateCardExpiration() {
        const currentDate = new Date();
        const expirationDate = new Date(currentDate.getFullYear() + 1, currentDate.getMonth(), currentDate.getDate());
        return expirationDate;
    }
}
exports.cardUtils = new CardUtils();
