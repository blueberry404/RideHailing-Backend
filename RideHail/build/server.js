"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = __importDefault(require("./app"));
dotenv_1.default.config();
const port = process.env.NODE_PORT || '8080';
const app = new app_1.default(+port); //or parseInt(port);
// import { typeOrmConfig } from './config';
app.listen();
// (async () => {
//   try {
//     console.error(typeOrmConfig);
//     const conn = await createConnection(typeOrmConfig);
//     console.log('PG connected.');
//     app.listen();
//     process.on('exit', async () => {
//       await conn.close();
//       console.log('PG connection closed.');
//     });
//   }
//   catch(ex) {
//     console.error(ex);
//   }
// })();
/*
npm run typeorm migration:run

For parameter:
npm run typeorm migration:generate -- -n migrationNameHere
*/
