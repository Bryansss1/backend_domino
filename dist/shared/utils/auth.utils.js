"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authUtils = exports.AuthUtils = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
class AuthUtils {
    constructor() {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.secretKey = process.env.SECRET_KEY;
    }
    generateToken(payload) {
        const jwtPayload = { payload };
        const jwt = (0, jsonwebtoken_1.sign)(jwtPayload, this.secretKey, {
            algorithm: "HS256",
            expiresIn: "2h",
        });
        return jwt;
    }
    verifyToken(token) {
        try {
            const decoded = (0, jsonwebtoken_1.verify)(token, this.secretKey);
            return decoded;
        }
        catch (error) {
            return null;
        }
    }
}
exports.AuthUtils = AuthUtils;
exports.authUtils = new AuthUtils();
