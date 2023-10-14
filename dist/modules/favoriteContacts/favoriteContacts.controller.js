"use strict";
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
exports.favoriteContactController = exports.FavoriteContactController = void 0;
const generalDto_1 = require("../../shared/dto/generalDto");
const favoriteContacts_services_1 = require("./favoriteContacts.services");
const favoriteContacts_utils_1 = require("./favoriteContacts.utils");
const httpError_utils_1 = require("../../shared/utils/httpError.utils");
class FavoriteContactController extends favoriteContacts_services_1.FavoriteContactServices {
    constructor() {
        super();
    }
    getAllController(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user } = req.cookies;
            try {
                if (!user)
                    return httpError_utils_1.httpError.response(res, 404, "User not found");
                const contacts = yield this.getAllByUser(user.userId);
                const payload = generalDto_1.generalDto.favoriteContactsFilter(contacts);
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
            const { id } = req.params;
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
            const { user } = req.cookies;
            const { nickname, data } = req.body;
            try {
                if (!user)
                    return httpError_utils_1.httpError.response(res, 404, "User not found");
                const accountUser = (yield favoriteContacts_utils_1.favoriteContactsUtils.dataFilter(data)); // Filter data is alias or account number
                if (!accountUser)
                    return httpError_utils_1.httpError.response(res, 404, "Account not found");
                const newFavoriteContact = {
                    accountUser,
                    nickname,
                    user,
                };
                yield this.postService(newFavoriteContact);
                const contacts = yield this.getAllByUser(user.userId);
                const payload = generalDto_1.generalDto.favoriteContactsFilter(contacts);
                res.json({
                    status: "success",
                    payload,
                });
            }
            catch (error) {
                const e = error;
                httpError_utils_1.httpError.internal(res, 500, error);
            }
        });
    }
    putController(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const body = req.body;
            try {
                const result = yield this.putService(parseInt(id), body);
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
            const { nickname } = req.body;
            try {
                const contact = yield this.getFavoriteContactByNickName(nickname);
                if (!contact)
                    return httpError_utils_1.httpError.response(res, 404, "Favorite contact not found");
                yield this.deleteService(contact.id);
                res.json({
                    status: "success",
                    response: `Contact ${contact.nickname} deleted`,
                });
            }
            catch (error) {
                httpError_utils_1.httpError.internal(res, 500, error);
            }
        });
    }
}
exports.FavoriteContactController = FavoriteContactController;
exports.favoriteContactController = new FavoriteContactController();
