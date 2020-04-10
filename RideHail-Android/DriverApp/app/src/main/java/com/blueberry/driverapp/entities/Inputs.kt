package com.blueberry.consumerapp.entities

import com.blueberry.driverapp.entities.Ride

class BaseResponse constructor(val success:Boolean, val result: Map<String, Any>)

class LoginInput constructor(val email: String, val password: String, val type: String = "Driver")

class ProfileResponse constructor(val success:Boolean, val result: User?)

class StateChangeInput constructor(val id: Int, val state: String)

class MessageResponse constructor(val success:Boolean, val message: String)

class AcceptRideResponse constructor(val success: Boolean, val result: Ride?)

class AcceptRideInput constructor(val rideId: Int, val consumerId: Int, val driverId: Int)
