"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavoriteContactRouter = void 0;
const router_1 = require("../../shared/router/router");
const favoriteContacts_controller_1 = require("./favoriteContacts.controller");
const favoriteContacts_middleware_1 = require("./favoriteContacts.middleware");
class FavoriteContactRouter extends router_1.BaseRouter {
    constructor() {
        super(favoriteContacts_controller_1.FavoriteContactController, favoriteContacts_middleware_1.FavoriteContactMiddleware, "favorites");
    }
    routes(path) {
        this.router.get(`/${path}`, (req, res, next) => this.middleware.checkToken(req, res, next), (req, res) => this.controller.getAllController(req, res));
        this.router.post(`/${path}`, (req, res, next) => this.middleware.checkToken(req, res, next), (req, res, next) => this.middleware.checkData(req, res, next), (req, res) => this.controller.postController(req, res));
        this.router.delete(`/${path}`, (req, res, next) => this.middleware.checkToken(req, res, next), (req, res, next) => this.middleware.checkNickName(req, res, next), (req, res) => this.controller.deleteController(req, res));
    }
}
exports.FavoriteContactRouter = FavoriteContactRouter;
