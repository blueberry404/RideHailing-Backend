package com.blueberry.consumerapp.rest

import com.google.gson.Gson
import com.google.gson.GsonBuilder
import okhttp3.OkHttpClient
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import java.util.concurrent.TimeUnit

class ServiceClient(private val interceptor: RestClientInterceptor) {

    var retrofit: Retrofit

    init {
        retrofit = Retrofit.Builder()
                .baseUrl(interceptor.getBaseURL())
                .client(getOkHttpClient())
                .addConverterFactory(GsonConverterFactory.create(getGson()))
                .build()
    }

    private fun getGson(): Gson {
        return GsonBuilder().setLenient().create()
    }

    private fun getOkHttpClient(): OkHttpClient {
        var okHttpClient = OkHttpClient()
        val builder = okHttpClient.newBuilder()

        okHttpClient = builder
            .addNetworkInterceptor(interceptor)
            .connectTimeout(interceptor.getConnectTimeout(), TimeUnit.SECONDS)
            .readTimeout(interceptor.getReadTimeout(), TimeUnit.SECONDS)
            .writeTimeout(interceptor.getWriteTimeout(), TimeUnit.SECONDS)
            .build()
        return okHttpClient
    }
}