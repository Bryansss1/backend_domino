"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrencyRouter = void 0;
const router_1 = require("../../shared/router/router");
const currency_controller_1 = require("./currency.controller");
const currency_middlew_1 = require("./currency.middlew");
class CurrencyRouter extends router_1.BaseRouter {
    constructor() {
        super(currency_controller_1.CurrencyController, currency_middlew_1.CurrencyMiddlewares, "currency");
    }
    routes(path) {
        this.router.get(`/${path}`, (req, res) => this.controller.getAllController(req, res));
        this.router.get(`/${path}/:id`, (req, res) => this.controller.getByIdController(req, res));
        this.router.post(`/${path}`, (req, res) => this.controller.postController(req, res));
        // this.router.put(`/${path}/:id`, (req, res) => this.controller.putController(req, res));
        // this.router.delete(`/${path}/:id`, (req, res) => this.controller.deleteController(req, res));
    }
}
exports.CurrencyRouter = CurrencyRouter;
