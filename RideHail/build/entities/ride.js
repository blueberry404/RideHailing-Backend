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
const userLocations_1 = require("./userLocations");
const consumers_1 = require("./consumers");
const drivers_1 = require("./drivers");
let Ride = class Ride {
    constructor() {
        this.distance = 0;
        this.amountCharged = 0;
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Ride.prototype, "rideID", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Date)
], Ride.prototype, "bookingDate", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Date)
], Ride.prototype, "startRideTime", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Date)
], Ride.prototype, "endRideTime", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Ride.prototype, "distance", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Ride.prototype, "amountCharged", void 0);
__decorate([
    typeorm_1.OneToMany(type => userLocations_1.UserLocations, location => location.ride),
    __metadata("design:type", Array)
], Ride.prototype, "locations", void 0);
__decorate([
    typeorm_1.ManyToOne(type => consumers_1.Consumers, consumer => consumer.rides),
    __metadata("design:type", consumers_1.Consumers)
], Ride.prototype, "consumer", void 0);
__decorate([
    typeorm_1.ManyToOne(type => drivers_1.Drivers, driver => driver.rides),
    __metadata("design:type", drivers_1.Drivers)
], Ride.prototype, "driver", void 0);
Ride = __decorate([
    typeorm_1.Entity()
], Ride);
exports.Ride = Ride;
