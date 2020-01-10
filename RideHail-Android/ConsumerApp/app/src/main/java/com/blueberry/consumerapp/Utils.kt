package com.blueberry.consumerapp

import android.content.Context
import java.io.IOException

object Utils {

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
}