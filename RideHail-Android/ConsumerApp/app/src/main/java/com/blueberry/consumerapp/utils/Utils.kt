package com.blueberry.consumerapp.utils

import android.content.Context
import android.content.DialogInterface
import android.content.SharedPreferences
import android.content.res.Resources
import android.util.DisplayMetrics
import androidx.appcompat.app.AlertDialog
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

    fun showAlertDialog(context: Context, title: String, message: String, buttonTitle: String, onDismissListener: DialogInterface.OnClickListener?) {

        AlertDialog.Builder(context).run {
            setTitle(title)
            setMessage(message)
            setNeutralButton(buttonTitle, onDismissListener)
            show()
        }
    }
}