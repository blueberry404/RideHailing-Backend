package com.blueberry.consumerapp.rest

import com.google.gson.Gson
import com.google.gson.GsonBuilder
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

class ServiceClient() {

    var retrofit: Retrofit

    init {
        retrofit = Retrofit.Builder()
                .baseUrl("http://localhost:3000")
                .addConverterFactory(GsonConverterFactory.create(getGson()))
                .build()
    }

    private fun getGson(): Gson {
        return GsonBuilder().setLenient().create()
    }
}