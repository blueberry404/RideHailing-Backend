package com.blueberry.consumerapp.rest

import okhttp3.Interceptor

interface RestClientInterceptor : Interceptor {
    fun getConnectTimeout(): Long
    fun getReadTimeout(): Long
    fun getWriteTimeout(): Long
    fun getHeaders() : HashMap<String, String>?
    fun getBaseURL(): String
}