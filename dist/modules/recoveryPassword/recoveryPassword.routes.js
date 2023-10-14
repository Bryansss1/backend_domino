"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecoveryPasswordRouter = void 0;
const router_1 = require("../../shared/router/router");
const recoveryPassword_controller_1 = require("./recoveryPassword.controller");
const recoveryPassword_middleware_1 = require("./recoveryPassword.middleware");
class RecoveryPasswordRouter extends router_1.BaseRouter {
    constructor() {
        super(recoveryPassword_controller_1.RecoveryPasswordController, recoveryPassword_middleware_1.RecoveryPasswordMiddlewares, "recovery");
    }
    routes(path) {
        this.router.get(`/${path}/verifyEmail/:email`, (req, res) => this.controller.verifyEmailController(req, res));
        this.router.get(`/${path}/:email`, (req, res) => this.controller.recoveryPasswordController(req, res));
    }
}
exports.RecoveryPasswordRouter = RecoveryPasswordRouter;
