"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusinessDto = void 0;
class BusinessDto {
    constructor(senderId, receiverId, currencyId, amount, status, transaction, subject) {
        this.senderId = senderId;
        this.receiverId = receiverId;
        this.currencyId = currencyId;
        this.amount = amount;
        this.status = status;
        this.transaction = transaction;
        this.subject = subject;
    }
}
exports.BusinessDto = BusinessDto;
