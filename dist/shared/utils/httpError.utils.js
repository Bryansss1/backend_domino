"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpError = exports.HttpError = void 0;
class HttpError extends Error {
    internal(res, status, error) {
        res.status(status).json({ status: "error", error: error.message });
    }
    response(res, status, error) {
        res.status(status).json({ status: "error", error });
    }
}
exports.HttpError = HttpError;
exports.httpError = new HttpError();
