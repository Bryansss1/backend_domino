"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const express_session_1 = __importDefault(require("express-session"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const postgreSql_1 = require("./config/postgreSql");
const router_1 = require("./shared/router");
class AppServer {
    constructor() {
        this.app = (0, express_1.default)();
        this.PORT = process.env.PORT || 3000;
        this.routes = new router_1.RoutesApp();
        this.middlewares();
        this.listen();
        this.db();
    }
    db() {
        postgreSql_1.AppDataSource.initialize()
            .then(() => {
            console.log("Database connected");
        })
            .catch((error) => console.log(error));
    }
    middlewares() {
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use((0, cookie_parser_1.default)());
        this.app.use((0, cors_1.default)({ credentials: true }));
        this.app.use((0, morgan_1.default)("dev"));
        this.app.use((0, express_session_1.default)({
            secret: process.env.SECRET_KEY,
            resave: false,
            saveUninitialized: false,
            cookie: {
                maxAge: 30000000000000,
                httpOnly: true
            },
        }));
        this.app.use("/api", this.routes.routes());
    }
    listen() {
        this.app.listen(this.PORT, () => {
            console.log(`Server on port ${this.PORT}`);
        });
    }
}
new AppServer();
