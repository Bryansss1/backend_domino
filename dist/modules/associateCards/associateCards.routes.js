"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssociateCardsRouter = void 0;
const router_1 = require("../../shared/router/router");
const associateCards_controllers_1 = require("./associateCards.controllers");
const associateCards_middlewares_1 = require("./associateCards.middlewares");
class AssociateCardsRouter extends router_1.BaseRouter {
    constructor() {
        super(associateCards_controllers_1.AssociateCardsController, associateCards_middlewares_1.AssociateCardsMiddlewares, "associateCards");
    }
    routes(path) {
        this.router.get(`/${path}`, (req, res, nex) => this.middleware.checkToken(req, res, nex), (req, res) => this.controller.getAllController(req, res));
        this.router.post(`/${path}`, 
        // (req, res, nex) => this.middleware.checkToken(req, res, nex),
        (req, res, nex) => this.middleware.checkDataCards(req, res, nex), (req, res) => this.controller.postController(req, res));
        this.router.put(`/${path}`, 
        // (req, res, nex) => this.middleware.checkToken(req, res, nex),
        (req, res, nex) => this.middleware.checkCardNumber(req, res, nex), (req, res) => this.controller.putController(req, res));
        this.router.delete(`/${path}`, 
        // (req, res, nex) => this.middleware.checkToken(req, res, nex),
        (req, res, nex) => this.middleware.checkCardNumber(req, res, nex), (req, res) => this.controller.deleteController(req, res));
    }
}
exports.AssociateCardsRouter = AssociateCardsRouter;
