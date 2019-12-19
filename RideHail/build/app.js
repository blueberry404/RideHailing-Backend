"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const users = __importStar(require("./controllers/users"));
const error_1 = __importDefault(require("./middlewares/error"));
class App {
    constructor(port) {
        this.app = express_1.default();
        this.port = port;
        //Express configuration
        this.initializaMiddleWares();
        this.registerRoutes();
        this.handleErrors();
    }
    initializaMiddleWares() {
        this.app.set("port", this.port);
        this.app.use(body_parser_1.default.json());
        this.app.use(body_parser_1.default.urlencoded({ extended: true }));
    }
    registerRoutes() {
        this.app.get('/users', users.getAll);
        this.app.get('/users/bookRide', users.bookRide);
    }
    handleErrors() {
        this.app.use(error_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
        });
    }
}
exports.default = App;
