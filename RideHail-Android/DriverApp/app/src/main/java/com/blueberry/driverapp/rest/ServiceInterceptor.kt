package com.blueberry.consumerapp.rest

import com.blueberry.consumerapp.constants.KeyConstants
import com.blueberry.consumerapp.utils.Utils
import com.blueberry.driverapp.BuildConfig
import com.blueberry.driverapp.RideApplication
import okhttp3.Interceptor
import okhttp3.Protocol
import okhttp3.Request
import okhttp3.Response
import java.net.ProtocolException

class ServiceInterceptor : RestClientInterceptor {

    override fun getConnectTimeout(): Long = 10

    override fun getReadTimeout(): Long = 10

    override fun getWriteTimeout(): Long = 10

    override fun getBaseURL(): String = BuildConfig.baseURL

    override fun intercept(chain: Interceptor.Chain): Response {

        var request = chain?.request()

        var requestBuilder: Request.Builder = request?.newBuilder()?.method(request?.method, request?.body)
                as Request.Builder

        getHeaders()?.let { headers->
            for ((key, value) in headers) {
                requestBuilder = requestBuilder.addHeader(key, value)
            }
        }

        request = requestBuilder.build()
        var response: Response
        try {
            response = chain?.proceed(request)!!
        } catch (e: ProtocolException) {
            response = Response.Builder()
                    .request(request)
                    .code(204)
                    .protocol(Protocol.HTTP_1_1)
                    .build()
        }

        return response
    }

    override fun getHeaders(): HashMap<String, String>? {
        val map : HashMap<String, String> = HashMap()
        val token = Utils.getSharedPreferences(RideApplication.instance).getString(KeyConstants.KEY_TOKEN, null)
        token?.let {
            map[KeyConstants.KEY_TOKEN] = token
        }
        return map
    }

}