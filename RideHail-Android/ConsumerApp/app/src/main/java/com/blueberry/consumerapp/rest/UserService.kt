package com.blueberry.consumerapp.rest

import com.blueberry.consumerapp.entities.BaseResponse
import com.blueberry.consumerapp.entities.LoginInput
import com.blueberry.consumerapp.entities.ProfileResponse
import retrofit2.http.Body
import retrofit2.http.POST

interface UserService {

    @POST("login")
    suspend fun login(@Body loginInput: LoginInput) : BaseResponse

    @POST("users/consumer/myProfile")
    suspend fun getMyProfile() : ProfileResponse
}