package com.blueberry.consumerapp.entities

class BaseResponse constructor(val success:Boolean, val result: Map<String, Any>)

class LoginInput constructor(val email: String, val password: String, val type: String = "Consumer")

class ProfileResponse constructor(val success:Boolean, val result: User?)

class BookingInput constructor(val userId: Int = 0, val sourceLat: Double = 0.0, val sourceLong: Double = 0.0, val destLat: Double = 0.0, val destLong: Double = 0.0)

class Booking constructor(vals: HashMap<String, Any>)

class RideCancelInput constructor(val consumerId: Int, val rideId: Int, val driverId: Int, val userType: String = "Consumer")