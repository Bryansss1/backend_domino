"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountAmountRouter = void 0;
const router_1 = require("../../shared/router/router");
const accountAmount_controller_1 = require("./accountAmount.controller");
const accountAmount_middlew_1 = require("./accountAmount.middlew");
class AccountAmountRouter extends router_1.BaseRouter {
    constructor() {
        super(accountAmount_controller_1.AccountAmountController, accountAmount_middlew_1.AccountAmountMiddlewares, "amount");
    }
    routes(path) {
        // this.router.get(`/${path}`, (req, res) => this.controller.getAllController(req, res));
        // this.router.get(`/${path}/:id`, (req, res) => this.controller.getByIdController(req, res));
        // this.router.post(`/${path}`, (req, res) => this.controller.postController(req, res));
        // this.router.put(`/${path}/:id`, (req, res) => this.controller.putController(req, res));
        // this.router.delete(`/${path}/:id`, (req, res) => this.controller.deleteController(req, res));
    }
}
exports.AccountAmountRouter = AccountAmountRouter;
