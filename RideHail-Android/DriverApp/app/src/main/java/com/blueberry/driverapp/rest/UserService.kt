package com.blueberry.consumerapp.rest

import com.blueberry.consumerapp.entities.*
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.POST
import retrofit2.http.Path

interface UserService {

    @POST("login")
    suspend fun login(@Body loginInput: LoginInput) : BaseResponse

    @GET("myProfile")
    suspend fun getMyProfile() : ProfileResponse

    @POST("users/driver/updateStatus")
    suspend fun changeStatus(@Body stateChangeInput: StateChangeInput): MessageResponse

    @GET("users/consumer/{id}")
    suspend fun getConsumerProfile(@Path("id") userID: Int) : ProfileResponse

    @POST("acceptRide")
    suspend fun acceptRide(@Body acceptRideInput: AcceptRideInput) : AcceptRideResponse
}