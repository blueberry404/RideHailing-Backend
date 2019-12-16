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
const ride_1 = require("./ride");
let UserLocations = class UserLocations {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], UserLocations.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Date)
], UserLocations.prototype, "logTime", void 0);
__decorate([
    typeorm_1.Column('json'),
    __metadata("design:type", Object)
], UserLocations.prototype, "location", void 0);
__decorate([
    typeorm_1.ManyToOne(type => ride_1.Ride, ride => ride.locations),
    __metadata("design:type", ride_1.Ride)
], UserLocations.prototype, "ride", void 0);
UserLocations = __decorate([
    typeorm_1.Entity()
], UserLocations);
exports.UserLocations = UserLocations;
