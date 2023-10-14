"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRouter = void 0;
const express_1 = require("express");
class BaseRouter {
    constructor(Controller, Middlewares, path) {
        this.router = (0, express_1.Router)();
        this.routes(path);
        this.controller = new Controller();
        this.middleware = new Middlewares();
    }
    routes(path) { }
}
exports.BaseRouter = BaseRouter;
