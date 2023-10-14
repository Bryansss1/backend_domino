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
exports.BaseServices = void 0;
const postgreSql_1 = require("../../config/postgreSql");
class BaseServices {
    constructor(entity) {
        this.repository = postgreSql_1.AppDataSource.getRepository(entity);
    }
    getServices() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.find();
        });
    }
    getServicesById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.findOneBy({ id });
        });
    }
    postService(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.save(data);
        });
    }
    putService(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            return this.repository.update({ id }, data);
        });
    }
    deleteService(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const entityToDelete = yield this.repository.findOneBy({
                id,
            });
            if (!entityToDelete) {
                return null;
            }
            yield this.repository.remove(entityToDelete);
            return entityToDelete;
        });
    }
    getRepository(entity) {
        return __awaiter(this, void 0, void 0, function* () {
            return postgreSql_1.AppDataSource.getRepository(entity);
        });
    }
}
exports.BaseServices = BaseServices;
