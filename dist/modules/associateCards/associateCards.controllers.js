"use strict";
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssociateCardsController = void 0;
const generalDto_1 = require("../../shared/dto/generalDto");
const associateCards_services_1 = require("./associateCards.services");
const httpError_utils_1 = require("../../shared/utils/httpError.utils");
class AssociateCardsController extends associateCards_services_1.AssociateCardsServices {
    constructor() {
        super();
    }
    getAllController(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user } = req.cookies;
            try {
                if (!user)
                    return httpError_utils_1.httpError.response(res, 404, "User not found");
                const cards = yield this.getAllByAccount(user === null || user === void 0 ? void 0 : user.account[0].id);
                const payload = generalDto_1.generalDto.filterCards(cards);
                res.json({
                    status: "success",
                    payload,
                });
            }
            catch (error) {
                httpError_utils_1.httpError.internal(res, 500, error);
            }
        });
    }
    getByIdController(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.body;
            try {
                const result = yield this.getServicesById(parseInt(id));
                res.json({
                    status: "success",
                    response: result,
                });
            }
            catch (error) {
                httpError_utils_1.httpError.internal(res, 500, error);
            }
        });
    }
    postController(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { cardNumber, cvv, issuingEntity, type, cardholder } = req.body;
            const { user } = req.cookies;
            try {
                if (!user)
                    return httpError_utils_1.httpError.response(res, 404, "User not found");
                const newCard = {
                    cardNumber,
                    cvv,
                    cardholder,
                    issuingEntity,
                    type,
                    accountUser: user === null || user === void 0 ? void 0 : user.account[0],
                };
                yield this.postService(newCard);
                const cards = yield this.getAllByAccount(user === null || user === void 0 ? void 0 : user.account[0].id);
                const payload = generalDto_1.generalDto.filterCards(cards);
                res.json({
                    status: "success",
                    payload,
                });
            }
            catch (error) {
                httpError_utils_1.httpError.internal(res, 500, error);
            }
        });
    }
    putController(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            try {
                const cardNumber = body.cardNumber;
                const card = yield this.repository.findOne({ where: { cardNumber } });
                if (!card)
                    return httpError_utils_1.httpError.response(res, 404, "Card not found");
                const result = yield this.putService(card.id, body);
                res.json({
                    status: "success",
                    response: result,
                });
            }
            catch (error) {
                httpError_utils_1.httpError.internal(res, 500, error);
            }
        });
    }
    deleteController(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { cardNumber } = req.body;
            try {
                const card = yield this.repository.findOne({ where: { cardNumber } });
                if (!card)
                    return httpError_utils_1.httpError.response(res, 404, "Card not found");
                yield this.deleteService(card.id);
                res.json({
                    status: "success",
                    msg: `Card number ${cardNumber} deleted`,
                });
            }
            catch (error) {
                httpError_utils_1.httpError.internal(res, 500, error);
            }
        });
    }
}
exports.AssociateCardsController = AssociateCardsController;
