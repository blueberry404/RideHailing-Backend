package com.blueberry.consumerapp.rest

import com.blueberry.consumerapp.entities.BaseResponse
import com.blueberry.consumerapp.entities.LoginInput
import retrofit2.http.Body

interface UserService {

    suspend fun login(@Body loginInput: LoginInput) : BaseResponse
}