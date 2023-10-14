"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusinessRouter = void 0;
const router_1 = require("../../shared/router/router");
const business_controller_1 = require("./business.controller");
const business_middlew_1 = require("./business.middlew");
class BusinessRouter extends router_1.BaseRouter {
    constructor() {
        super(business_controller_1.BusinessController, business_middlew_1.BusinessMiddlewares, "business");
    }
    routes(path) {
        // this.router.get(`/${path}`, (req, res) => this.controller.getAllControllerTerms(req, res));
        this.router.get(`/${path}`, (req, res) => this.controller.getByAccountController(req, res));
        this.router.post(`/${path}`, 
        // (req, res, next) => this.middleware.checkToken(req, res, next),
        (req, res, next) => this.middleware.checkTransactionType(req, res, next), (req, res, next) => this.middleware.checkAccountUser(req, res, next), (req, res) => this.controller.postController(req, res));
        this.router.delete(`/${path}/:id`, (req, res) => this.controller.deleteController(req, res));
    }
}
exports.BusinessRouter = BusinessRouter;
