package com.blueberry.consumerapp.entities

class BaseResponse constructor(val success:Boolean, val result: Map<String, Any>)

class LoginInput constructor(val email: String, val password: String, val type: String = "Driver")

class ProfileResponse constructor(val success:Boolean, val result: User?)

class StateChangeInput constructor(id: Int, state: String)

class MessageResponse constructor(val success:Boolean, val message: String)
