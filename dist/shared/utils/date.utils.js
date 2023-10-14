"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dateHandler = void 0;
class DateHandler {
    formatDate(date) {
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear().toString();
        return `${day}/${month}/${year}`;
    }
}
exports.dateHandler = new DateHandler();
