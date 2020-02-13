package com.blueberry.consumerapp.utils

import android.content.Context
import android.location.LocationManager
import android.os.Build
import android.provider.Settings
import androidx.core.location.LocationManagerCompat
import com.google.android.gms.common.api.ApiException
import com.google.android.gms.location.LocationRequest
import com.google.android.gms.location.LocationServices
import com.google.android.gms.location.LocationSettingsRequest
import com.google.android.gms.location.LocationSettingsResponse
import kotlin.math.acos
import kotlin.math.cos
import kotlin.math.sin
import android.provider.Settings.Secure
import android.provider.Settings.Secure.LOCATION_MODE_OFF
import android.provider.Settings.Secure.LOCATION_MODE_BATTERY_SAVING
import android.provider.Settings.Secure.LOCATION_MODE_SENSORS_ONLY
import android.provider.Settings.Secure.LOCATION_MODE_HIGH_ACCURACY
import android.provider.Settings.SettingNotFoundException
import android.provider.Settings.Secure.LOCATION_MODE
import android.text.TextUtils
import android.widget.Toast
import androidx.annotation.StringRes

fun isLocationEnabled(context: Context): Boolean {
    val locationManager = context.getSystemService(Context.LOCATION_SERVICE) as LocationManager
    return if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) {
        locationManager.isLocationEnabled
    } else {
        locationManager.isProviderEnabled(LocationManager.NETWORK_PROVIDER) && locationManager.isProviderEnabled(
            LocationManager.GPS_PROVIDER
        )
    }
}

@Suppress("DEPRECATION")
fun isGpsEnabled(context: Context): Boolean {
    val locationMode: Int
    try {
        locationMode = Secure.getInt(
            context.contentResolver,
            LOCATION_MODE
        )
    } catch (e: SettingNotFoundException) {
        e.printStackTrace()
        return false
    }

    when (locationMode) {

        LOCATION_MODE_HIGH_ACCURACY, LOCATION_MODE_SENSORS_ONLY -> return true
        LOCATION_MODE_BATTERY_SAVING, LOCATION_MODE_OFF -> return false
        else -> return false
    }
}

fun showLocationEnableSetting(context: Context,
                              success: (LocationSettingsResponse?) -> Unit,
                              failure: (Exception) -> Unit) {
    val locationRequest = LocationRequest.create()
    locationRequest.priority = LocationRequest.PRIORITY_HIGH_ACCURACY

    val builder = LocationSettingsRequest.Builder()
        .addLocationRequest(locationRequest)
    val task = LocationServices.getSettingsClient(context)
        .checkLocationSettings(builder.build())
    task.addOnSuccessListener { response -> success(response) }
    task.addOnFailureListener { e -> failure(e)}
}

/* Returns distance in kilometer */
fun calculateDistanceInKM(lat1: Double, lon1: Double, lat2: Double, lon2: Double) : Double {

    val theta = lon1 - lon2
    var dist = sin(deg2rad(lat1)) * sin(deg2rad(lat2)) + (cos(deg2rad(lat1))
            * cos(deg2rad(lat2))
            * cos(deg2rad(theta)))
    dist = acos(dist)
    dist = rad2deg(dist)
    dist *= 60.0 * 1.1515
    return dist * 1.6
}

private fun deg2rad(deg: Double): Double {
    return deg * Math.PI / 180.0
}

private fun rad2deg(rad: Double): Double {
    return rad * 180.0 / Math.PI
}

fun showToast(context: Context?, message: String) {
    context?.let { Toast.makeText(it, message, Toast.LENGTH_SHORT).show() }
}

fun showToast(context: Context?, @StringRes message: Int) {
    context?.let { Toast.makeText(it, message, Toast.LENGTH_SHORT).show() }
}