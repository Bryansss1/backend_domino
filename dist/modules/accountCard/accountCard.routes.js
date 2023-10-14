"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountCardRouter = void 0;
const router_1 = require("../../shared/router/router");
const accountCard_controller_1 = require("./accountCard.controller");
const accountCard_middlew_1 = require("./accountCard.middlew");
class AccountCardRouter extends router_1.BaseRouter {
    constructor() {
        super(accountCard_controller_1.AccountCardController, accountCard_middlew_1.AccountCardMiddlewares, "card");
    }
    routes(path) {
        // this.router.get(`/${path}`, (req, res) => this.controller.getAllController(req, res));
        // this.router.get(`/${path}/:id`, (req, res) => this.controller.getByIdController(req, res));
        // this.router.post(`/${path}`, (req, res) => this.controller.postController(req, res));
        // this.router.put(`/${path}/:id`, (req, res) => this.controller.putController(req, res));
        // this.router.delete(`/${path}/:id`, (req, res) => this.controller.deleteController(req, res));
    }
}
exports.AccountCardRouter = AccountCardRouter;
