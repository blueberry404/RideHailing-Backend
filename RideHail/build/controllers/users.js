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
const consumerService = __importStar(require("../services/consumer"));
const consumers_1 = require("../entities/consumers");
const HttpException_1 = __importDefault(require("../exceptions/HttpException"));
exports.getAll = (_request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield consumerService.getAll();
    response.send({ success: true, result: JSON.stringify(users) });
});
exports.createUser = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const consumer = request.body;
    const result = yield consumerService.saveConsumer(consumer);
    if (result instanceof consumers_1.Consumers) {
        response.send({ success: true, result: JSON.stringify(result) });
    }
    else {
        next(new HttpException_1.default(400, result));
    }
});
exports.bookRide = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    response.json({ success: 'success' });
});
exports.cancelRide = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    response.json({ success: 'success' });
});
exports.acceptRide = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    response.json({ success: 'success' });
});
exports.startRide = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    response.json({ success: 'success' });
});
/*
Push notifications:
- find and notify Nearby Drivers
- cancel ride to other entity
- notify consumer that ride has been accepted

HOW NOTIFY USERS FOR CHANGING STATE AND LOCATION?
*/ 
