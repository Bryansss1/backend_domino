"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const router_1 = require("../../shared/router/router");
const user_controller_1 = require("./user.controller");
const user_middlewares_1 = require("./user.middlewares");
class UserRouter extends router_1.BaseRouter {
    constructor() {
        super(user_controller_1.UserController, user_middlewares_1.UserMiddlewares, "user");
    }
    routes(path) {
        // this.router.get(`/${path}`, (req, res) => this.controller.getAllController(req, res));
        this.router.get(`/${path}/:term`, (req, res) => this.controller.getByEmailorAlias(req, res));
        this.router.post(`/${path}`, (req, res, next) => this.middleware.checkUser(req, res, next), (req, res) => this.controller.postController(req, res));
        this.router.put(`/${path}/:id`, (req, res) => this.controller.putController(req, res));
        this.router.delete(`/${path}/:id`, (req, res) => this.controller.deleteController(req, res));
    }
}
exports.UserRouter = UserRouter;
