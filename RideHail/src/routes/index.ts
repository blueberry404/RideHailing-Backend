import user from "./users";
import express from "express";
const app = express();

module.exports = function(app, db) {  
    user(app, db);  // Other route groups could go here, in the future
};
