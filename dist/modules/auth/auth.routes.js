"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRouter = void 0;
const router_1 = require("../../shared/router/router");
const auth_controller_1 = require("./auth.controller");
const auth_middlewares_1 = require("./auth.middlewares");
class AuthRouter extends router_1.BaseRouter {
    constructor() {
        super(auth_controller_1.AuthController, auth_middlewares_1.AuthMiddlewares, "auth");
    }
    routes(path) {
        this.router.post(`/${path}`, (req, res, next) => this.middleware.checkDataUserMiddleware(req, res, next), (req, res) => this.controller.postController(req, res));
    }
}
exports.AuthRouter = AuthRouter;
