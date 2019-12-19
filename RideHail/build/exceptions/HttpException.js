"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HTTPException extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
        this.message = message;
    }
}
exports.default = HTTPException;
