"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("dotenv/config");
const typeorm_1 = require("typeorm");
const DBPort = !process.env.PORT_DB ? 5432 : parseInt(process.env.PORT_DB);
const setSSL = !process.env.SSL_SUPPORT
    ? false
    : process.env.SSL_SUPPORT === "0"
        ? false
        : process.env.SSL_SUPPORT === "1" && true;
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: process.env.HOST_DB,
    port: DBPort,
    username: process.env.USERNAME_DB,
    password: process.env.PASS_DB,
    database: process.env.NAME_DB,
    synchronize: true,
    logging: false,
    entities: [__dirname + "/../**/*.entity{.ts,.js}"],
    migrations: [__dirname + "/../migrations/*{.ts,.js}"],
    subscribers: [],
    ssl: setSSL,
    migrationsRun: true,
});
