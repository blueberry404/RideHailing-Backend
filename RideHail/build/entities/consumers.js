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
const ConsumerState_1 = require("../enums/ConsumerState");
const ride_1 = require("./ride");
let Consumers = class Consumers extends user_1.User {
    constructor() {
        super(...arguments);
        this.state = ConsumerState_1.ConsumerState.IDLE;
    }
};
__decorate([
    typeorm_1.Column({ type: 'enum', enum: ConsumerState_1.ConsumerState, default: ConsumerState_1.ConsumerState.IDLE }),
    __metadata("design:type", Number)
], Consumers.prototype, "state", void 0);
__decorate([
    typeorm_1.OneToMany(type => ride_1.Ride, ride => ride.consumer),
    __metadata("design:type", Array)
], Consumers.prototype, "rides", void 0);
Consumers = __decorate([
    typeorm_1.Entity()
], Consumers);
exports.Consumers = Consumers;
