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
const repo = __importStar(require("../repositories/consumer"));
const user_1 = require("../validations/user");
const consumers_1 = require("../entities/consumers");
const Auth_1 = __importDefault(require("../utils/Auth"));
exports.getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    return repo.getAll();
});
exports.saveConsumer = (consumerReq) => __awaiter(void 0, void 0, void 0, function* () {
    const error = user_1.validateSignUp(consumerReq);
    if (error) {
        return error;
    }
    else {
        const consumer = new consumers_1.Consumers(consumerReq);
        const hash = yield Auth_1.default.hashPassword(consumerReq.password);
        if (hash instanceof Error) {
            return hash;
        }
        else {
            consumer.passwordHash = hash;
            repo.save(consumer);
        }
    }
    //TODO: work on validations and seeding
    //https://github.com/mattwelke/example-typeorm-postgres
    //https://dev.to/jacqueline/using-hapi-joi-version-16-1-7-to-validate-a-request-body-in-a-restful-api-bje
});
