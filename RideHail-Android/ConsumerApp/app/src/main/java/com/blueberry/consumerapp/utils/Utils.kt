package com.blueberry.consumerapp.utils

import android.content.Context
import android.content.SharedPreferences
import java.io.IOException

object Utils {

    private const val sharedPreferencesName : String = "RideHailConsumer"

    fun loadJSONFromAsset(context: Context, jsonFile: String): String? {
        var json: String? = null
        try {
            val inputStream = context.assets.open(jsonFile)

            val size = inputStream.available()

            val buffer = ByteArray(size)

            inputStream.read(buffer)

            inputStream.close()

            json = String(buffer, Charsets.UTF_8)


        } catch (ex: IOException) {
            ex.printStackTrace()
            return null
        }

        return json
    }

    fun getSharedPreferences(context: Context): SharedPreferences = context.getSharedPreferences(sharedPreferencesName, Context.MODE_PRIVATE)
}