"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserSchema_1 = require("../schemas/UserSchema");
exports.validateSignUp = (user) => {
    const { error } = UserSchema_1.CreateUserSchema.validate(user);
    return error ? error : null;
};
