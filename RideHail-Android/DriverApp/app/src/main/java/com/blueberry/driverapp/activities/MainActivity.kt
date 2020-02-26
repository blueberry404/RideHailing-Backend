package com.blueberry.driverapp.activities

import android.Manifest
import android.content.IntentSender
import android.location.Location
import android.os.Bundle
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.ContextCompat
import com.blueberry.consumerapp.config.AppConfig
import com.blueberry.consumerapp.constants.KeyConstants
import com.blueberry.consumerapp.entities.User
import com.blueberry.consumerapp.rest.ServiceManager
import com.blueberry.consumerapp.rest.UserService
import com.blueberry.consumerapp.utils.isGpsEnabled
import com.blueberry.consumerapp.utils.isLocationEnabled
import com.blueberry.consumerapp.utils.showLocationEnableSetting
import com.blueberry.consumerapp.utils.showToast
import com.blueberry.driverapp.R
import com.blueberry.driverapp.utils.PermissionUtils
import com.google.android.gms.common.api.ApiException
import com.google.android.gms.common.api.ResolvableApiException
import com.google.android.gms.location.FusedLocationProviderClient
import com.google.android.gms.location.LocationServices
import com.google.android.gms.location.LocationSettingsResponse
import com.google.android.gms.location.LocationSettingsStatusCodes
import com.google.android.gms.maps.CameraUpdateFactory
import com.google.android.gms.maps.GoogleMap
import com.google.android.gms.maps.OnMapReadyCallback
import com.google.android.gms.maps.SupportMapFragment
import com.google.android.gms.maps.model.*
import kotlinx.android.synthetic.main.activity_main.*
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

class MainActivity : AppCompatActivity(), OnMapReadyCallback {

    private lateinit var mMap: GoogleMap
    private val coroutineScope: CoroutineScope = CoroutineScope(Dispatchers.Main)
    private lateinit var mFusedLocationClient: FusedLocationProviderClient

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
    }

    override fun onPostCreate(savedInstanceState: Bundle?) {
        super.onPostCreate(savedInstanceState)
        initLocationServices()
        getUserProfile()
    }

    override fun onMapReady(googleMap: GoogleMap) {
        mMap = googleMap
        if(checkPermission()) {
            mMap.isMyLocationEnabled = true
            checkForLocation()
        }
    }

    //region User State

    private fun getUserProfile() {

        coroutineScope.launch {
            try {
                val service = ServiceManager.getInstance().getService(UserService::class.java) as UserService
                val response = service.getMyProfile()
                val result = response.result
                result?.let {
                    AppConfig.profile = it
                    setUserState(it)
                }?: setUserNotAvailable()
            }
            catch(ex: Exception) {
                Toast.makeText(this@MainActivity, ex.message, Toast.LENGTH_SHORT).show()
            }
        }
    }

    private fun setUserState(profile: User) {
        when(profile.state) {
            "IDLE" -> setUserIdle()
            "BUSY" -> setUserBusy()
            "NOT_AVAILABLE" -> setUserNotAvailable()
        }
    }

    private fun setUserIdle() {
        txtState.text = "You are Idle"
        viewState.background = ContextCompat.getDrawable(this, R.drawable.drawable_icon_idle)
    }

    private fun setUserBusy() {
        txtState.text = "You are Busy"
        viewState.background = ContextCompat.getDrawable(this, R.drawable.drawable_icon_busy)
    }

    private fun setUserNotAvailable() {
        txtState.text = "You are Not Available"
        viewState.background = ContextCompat.getDrawable(this, R.drawable.drawable_icon_not_available)
    }

    private fun initLocationServices() {
        mFusedLocationClient = LocationServices.getFusedLocationProviderClient(this)

        val mapFragment = supportFragmentManager
            .findFragmentById(R.id.map) as SupportMapFragment
        mapFragment.getMapAsync(this)
    }

    //endregion

    //region User Location

    private fun checkForLocation() {
        val locEnabled = isGpsEnabled(this) || isLocationEnabled(this)
        if (locEnabled) {
            getLastUserLocation()
        } else {
            showLocationEnableSetting(this,
                { response -> handleLocationEnableSuccess(response) },
                { e -> handleLocationEnableFailure(e) })
        }
    }

    private fun getLastUserLocation() {
        mFusedLocationClient.lastLocation.addOnSuccessListener { location ->
            if(location != null) {
                showLocationOnMap(location, true)
            }
        }
    }

    private fun handleLocationEnableSuccess(response: LocationSettingsResponse?) {
        val states = response?.locationSettingsStates
        states?.let {
            if (it.isLocationPresent) {
                getLastUserLocation()
            }
            else {
                showToast(this, "Unable to turn on GPS")
            }
        }
    }

    private fun handleLocationEnableFailure(e: Exception) {
        if (e is ApiException) {
            when(e.statusCode) {
                LocationSettingsStatusCodes.SETTINGS_CHANGE_UNAVAILABLE ->
                    showToast(this, "Go to Settings to change Location Settings")

                LocationSettingsStatusCodes.RESOLUTION_REQUIRED ->
                    try {
                        startIntentSenderForResult((e as ResolvableApiException).resolution.intentSender,
                            KeyConstants.REQUEST_GPS, null, 0, 0, 0, null)

                    } catch (ex: IntentSender.SendIntentException) {
                        // Ignore the error.
                    }
            }
        }
        else {
            showToast(this, e.localizedMessage)
        }

    }

    private fun showLocationOnMap(location: Location, animate: Boolean) {
        val position = CameraPosition.Builder()
            .target(LatLng(location.latitude, location.longitude))
            .zoom(16.0f)
            .build()
        if(animate)
            mMap.animateCamera(CameraUpdateFactory.newCameraPosition(position))
        else
            mMap.moveCamera(CameraUpdateFactory.newCameraPosition(position))
        addMarkerToMap(location)
    }

    private fun addMarkerToMap(location: Location): Marker {
        return mMap.addMarker(
            MarkerOptions().position(LatLng(location.latitude, location.longitude))
                .icon(BitmapDescriptorFactory.defaultMarker(BitmapDescriptorFactory.HUE_RED))
        )
    }

    //endregion

    //region Permissions

    private fun checkPermission(): Boolean {

        return if(PermissionUtils.hasPermissions(this, Manifest.permission.ACCESS_COARSE_LOCATION)) {
            true
        } else {
            PermissionUtils.requestPermissions(this, KeyConstants.REQUEST_lOCATION_PERMISSION,
                arrayOf(
                    Manifest.permission.ACCESS_FINE_LOCATION,
                    Manifest.permission.ACCESS_COARSE_LOCATION))
            false
        }
    }

    override fun onRequestPermissionsResult(
        requestCode: Int,
        permissions: Array<out String>,
        grantResults: IntArray
    ) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults)
        if(requestCode == KeyConstants.REQUEST_lOCATION_PERMISSION && grantResults.isNotEmpty()) {
            mMap.isMyLocationEnabled = true
            checkForLocation()
        }
    }

    //endregion

}
