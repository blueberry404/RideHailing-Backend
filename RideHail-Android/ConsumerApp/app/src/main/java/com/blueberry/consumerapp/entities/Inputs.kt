package com.blueberry.consumerapp.entities

class BaseResponse constructor(val success:Boolean, val result: Map<String, Any>)

class LoginInput constructor(val username: String, val password: String)
