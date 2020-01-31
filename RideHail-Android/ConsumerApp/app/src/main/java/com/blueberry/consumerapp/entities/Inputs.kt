package com.blueberry.consumerapp.entities

class BaseResponse constructor(val success:Boolean, val result: Map<String, Any>)

class LoginInput constructor(val email: String, val password: String, val type: String = "Consumer")
