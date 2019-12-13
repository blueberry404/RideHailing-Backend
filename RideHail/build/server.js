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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = __importDefault(require("./app"));
dotenv_1.default.config();
const port = process.env.NODE_PORT || '8080';
const app = new app_1.default(+port); //or parseInt(port);
const config_1 = require("./config");
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.error(config_1.typeOrmConfig);
        const conn = yield typeorm_1.createConnection(config_1.typeOrmConfig);
        console.log('PG connected.');
        app.listen();
        process.on('exit', () => __awaiter(void 0, void 0, void 0, function* () {
            yield conn.close();
            console.log('PG connection closed.');
        }));
    }
    catch (ex) {
        console.error(ex);
    }
}))();
/*
npm run typeorm migration:run

For parameter:
npm run typeorm migration:generate -- -n migrationNameHere
*/
