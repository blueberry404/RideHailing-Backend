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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const faker = __importStar(require("faker"));
const p_iteration_1 = require("p-iteration");
const config_1 = require("../config");
const drivers_1 = require("../entities/drivers");
const consumers_1 = require("../entities/consumers");
const Auth_1 = __importDefault(require("../utils/Auth"));
const consumer_1 = require("../repositories/consumer");
(() => __awaiter(void 0, void 0, void 0, function* () {
    const createUser = (isConsumer) => __awaiter(void 0, void 0, void 0, function* () {
        const firstname = faker.name.firstName();
        const lastname = faker.name.lastName();
        const email = faker.internet.email(firstname, lastname, 'gmail');
        const mobile = faker.phone.phoneNumberFormat(0);
        const password = faker.internet.password(8);
        console.log({ firstname, lastname, email, mobile, password });
        //https://github.com/Marak/faker.js/wiki/Phone
        var user;
        if (isConsumer) {
            user = new consumers_1.Consumers();
        }
        else {
            user = new drivers_1.Drivers();
        }
        user.firstName = firstname;
        user.lastName = lastname;
        user.email = email;
        user.passwordHash = yield Auth_1.default.hashPassword(password);
        user.joinDate = new Date();
        user.mobile = mobile;
        return user;
    });
    console.log('*********** Begin Seed task *********** ');
    try {
        const conn = yield typeorm_1.createConnection(config_1.typeOrmConfig);
        const arr = Array.from({ length: 5 }).map(x => 'consumer');
        p_iteration_1.forEach(arr, (str) => __awaiter(void 0, void 0, void 0, function* () {
            const user = yield createUser(str === 'consumer');
            yield consumer_1.save(user);
        }));
        yield conn.close();
    }
    catch (ex) {
        console.error(ex);
    }
    finally {
        console.log('*********** End Seed task *********** ');
    }
}))();
