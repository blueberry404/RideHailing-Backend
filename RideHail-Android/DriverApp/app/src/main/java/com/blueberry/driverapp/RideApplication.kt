package com.blueberry.driverapp

import android.app.Application

class RideApplication : Application() {

    companion object {
        lateinit var instance : Application
            private set
    }

    override fun onCreate() {
        super.onCreate()
        instance = this
    }
}