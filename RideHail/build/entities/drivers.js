"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const user_1 = require("./user");
const DriverState_1 = require("../enums/DriverState");
const ride_1 = require("./ride");
let Drivers = class Drivers extends user_1.User {
    constructor() {
        super(...arguments);
        this.state = DriverState_1.DriverState.NOT_AVAILABLE;
    }
};
__decorate([
    typeorm_1.Column({ type: 'enum', enum: DriverState_1.DriverState, default: DriverState_1.DriverState.NOT_AVAILABLE }),
    __metadata("design:type", Number)
], Drivers.prototype, "state", void 0);
__decorate([
    typeorm_1.OneToMany(type => ride_1.Ride, ride => ride.driver),
    __metadata("design:type", Array)
], Drivers.prototype, "rides", void 0);
Drivers = __decorate([
    typeorm_1.Entity()
], Drivers);
exports.Drivers = Drivers;
