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
exports.getAll = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    response.send('Abey saaley');
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
