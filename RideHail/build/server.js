"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const port = process.env.PORT || '8080';
const app = new app_1.default(+port); //or parseInt(port);
app.listen();
/*
npm run typeorm migration:run

For parameter:
npm run typeorm migration:generate -- -n migrationNameHere
*/
