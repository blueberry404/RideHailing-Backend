package com.blueberry.consumerapp.config

import androidx.core.content.edit
import com.blueberry.consumerapp.constants.KeyConstants
import com.blueberry.consumerapp.entities.User
import com.blueberry.consumerapp.utils.Utils
import com.blueberry.driverapp.RideApplication
import com.blueberry.driverapp.entities.Ride
import com.google.gson.Gson

object AppConfig {
    var profile: User? = null
    val STATE_IDLE = "IDLE"
    val STATE_BUSY = "BUSY"
    val STATE_NOT_AVAILABLE = "NOT_AVAILABLE"

    var ride: Ride?
    get() {
        val gson = Utils.getSharedPreferences(RideApplication.instance).getString(KeyConstants.KEY_RIDE, null)
        return Gson().fromJson(gson, Ride::class.java)
    }
    set(value) {
        val gson = Gson().toJson(value)
        Utils.getSharedPreferences(RideApplication.instance).edit(true) { putString(KeyConstants.KEY_RIDE, gson) }
    }
}