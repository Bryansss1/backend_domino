"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountUserRouter = void 0;
const router_1 = require("../../shared/router/router");
const accountUser_controller_1 = require("./accountUser.controller");
const accountUser_middlew_1 = require("./accountUser.middlew");
class AccountUserRouter extends router_1.BaseRouter {
    constructor() {
        super(accountUser_controller_1.AccountUserController, accountUser_middlew_1.AccountUserMiddlewares, "accountUser");
    }
    routes(path) {
        // this.router.get(`/${path}`, (req, res) => this.controller.getAllController(req, res));
        // this.router.get(`/${path}/:id`, (req, res) => this.controller.getByIdController(req, res));
        // this.router.post(`/${path}`, (req, res) => this.controller.postController(req, res));
        // this.router.put(`/${path}/:id`, (req, res) => this.controller.putController(req, res));
        // this.router.delete(`/${path}/:id`, (req, res) => this.controller.deleteController(req, res));
    }
}
exports.AccountUserRouter = AccountUserRouter;
