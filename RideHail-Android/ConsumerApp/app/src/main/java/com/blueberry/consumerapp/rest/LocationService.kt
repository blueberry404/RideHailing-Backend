package com.blueberry.consumerapp.rest

import com.blueberry.consumerapp.entities.BaseResponse
import com.blueberry.consumerapp.entities.BookingInput
import com.blueberry.consumerapp.entities.RideCancelInput
import retrofit2.http.Body
import retrofit2.http.POST

interface LocationService {

    @POST("bookRide")
    suspend fun requestRide(@Body bookingInput: BookingInput): BaseResponse

    @POST("cancelRide")
    suspend fun cancelRide(@Body rideCancelInput: RideCancelInput): BaseResponse
}