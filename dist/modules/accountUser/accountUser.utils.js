"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountUserUtils = void 0;
class AccountUserUtils {
    generateAlias(first, second, dni) {
        const FirstNumberDni = dni.slice(0, 1);
        const LastNumberDni = dni.slice(-1);
        const alias = first + "." + second + FirstNumberDni + LastNumberDni;
        return alias;
    }
    generateAccountNumber() {
        const min = 100000000000000;
        const max = 999999999999999;
        const accountNumber = (Math.floor((Math.random() * (max - min + 1)) + min)).toString();
        return accountNumber;
    }
}
exports.accountUserUtils = new AccountUserUtils();
