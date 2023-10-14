"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoutesApp = void 0;
const accountAmount_routes_1 = require("../../modules/accountAmount/accountAmount.routes");
const accountCard_routes_1 = require("../../modules/accountCard/accountCard.routes");
const accountUser_routes_1 = require("../../modules/accountUser/accountUser.routes");
const associateCards_routes_1 = require("../../modules/associateCards/associateCards.routes");
const business_routes_1 = require("../../modules/business/business.routes");
const currency_routes_1 = require("../../modules/currency/currency.routes");
const recoveryPassword_routes_1 = require("../../modules/recoveryPassword/recoveryPassword.routes");
const user_routes_1 = require("../../modules/user/user.routes");
const auth_routes_1 = require("../../modules/auth/auth.routes");
const favoriteContacts_routes_1 = require("../../modules/favoriteContacts/favoriteContacts.routes");
class RoutesApp {
    constructor() { }
    routes() {
        return [
            new favoriteContacts_routes_1.FavoriteContactRouter().router,
            new accountAmount_routes_1.AccountAmountRouter().router,
            new accountCard_routes_1.AccountCardRouter().router,
            new accountUser_routes_1.AccountUserRouter().router,
            new associateCards_routes_1.AssociateCardsRouter().router,
            new business_routes_1.BusinessRouter().router,
            new currency_routes_1.CurrencyRouter().router,
            new recoveryPassword_routes_1.RecoveryPasswordRouter().router,
            new user_routes_1.UserRouter().router,
            new auth_routes_1.AuthRouter().router
        ];
    }
}
exports.RoutesApp = RoutesApp;
