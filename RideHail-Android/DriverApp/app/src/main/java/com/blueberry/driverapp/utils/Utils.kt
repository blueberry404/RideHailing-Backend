package com.blueberry.consumerapp.utils

import android.content.Context
import android.content.SharedPreferences
import android.content.res.Resources
import android.os.Bundle
import android.os.Parcel
import android.util.DisplayMetrics
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

    fun convertDpToPixel(dp: Float): Float {
        return dp * (Resources.getSystem().displayMetrics.densityDpi.toFloat() / DisplayMetrics.DENSITY_DEFAULT)
    }

    fun convertPixelsToDp(px: Float): Float {
        return px / (Resources.getSystem().displayMetrics.densityDpi.toFloat() / DisplayMetrics.DENSITY_DEFAULT)
    }

    fun readParcelableForLocation(parcel: Parcel): Map<String, Double> {
        val bundle = parcel.readBundle()
        return bundle?.getSerializable("map") as Map<String, Double>
    }

    fun writeLocationToParcel(map: HashMap<String, Double>?): Bundle {
        val bundle = Bundle()
        map?.let {
            bundle.putSerializable("map", it)
        }
        return bundle
    }
}