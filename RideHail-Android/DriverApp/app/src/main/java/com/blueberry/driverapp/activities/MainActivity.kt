package com.blueberry.driverapp.activities

import android.Manifest
import android.content.Intent
import android.content.IntentSender
import android.location.Location
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.ContextCompat
import com.blueberry.consumerapp.config.AppConfig
import com.blueberry.consumerapp.constants.KeyConstants
import com.blueberry.consumerapp.entities.StateChangeInput
import com.blueberry.consumerapp.entities.User
import com.blueberry.consumerapp.rest.ServiceManager
import com.blueberry.consumerapp.rest.UserService
import com.blueberry.consumerapp.utils.isGpsEnabled
import com.blueberry.consumerapp.utils.isLocationEnabled
import com.blueberry.consumerapp.utils.showLocationEnableSetting
import com.blueberry.consumerapp.utils.showToast
import com.blueberry.driverapp.BuildConfig
import com.blueberry.driverapp.R
import com.blueberry.driverapp.entities.Ride
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
import io.socket.client.IO
import io.socket.client.Socket
import io.socket.emitter.Emitter
import kotlinx.android.synthetic.main.activity_main.*
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import org.json.JSONException
import org.json.JSONObject
import java.net.URISyntaxException

class MainActivity : AppCompatActivity(), OnMapReadyCallback {

    private lateinit var mMap: GoogleMap
    private val coroutineScope: CoroutineScope = CoroutineScope(Dispatchers.Main)
    private lateinit var mFusedLocationClient: FusedLocationProviderClient
    lateinit var socket: Socket

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
    }

    override fun onDestroy() {
        super.onDestroy()
        socket.disconnect()
    }

    override fun onPostCreate(savedInstanceState: Bundle?) {
        super.onPostCreate(savedInstanceState)
        initLocationServices()
        onActionListener()
        getUserProfile()
    }

    override fun onMapReady(googleMap: GoogleMap) {
        mMap = googleMap
        if(checkPermission()) {
            mMap.isMyLocationEnabled = true
            checkForLocation()
        }
    }

    private fun onActionListener() {
        btnChangeStatus.setOnClickListener { handleOnButtonClick() }
    }

    private fun handleOnButtonClick() {
        if(btnChangeStatus.text.toString() == getString(R.string.txt_make_available))
            changeStateOnServer(AppConfig.STATE_IDLE)
        else if(btnChangeStatus.text.toString() == getString(R.string.txt_make_not_available))
            changeStateOnServer(AppConfig.STATE_NOT_AVAILABLE)
        else {
            //cancel
        }
    }

    //region Rest Calls

    private fun changeStateOnServer(state: String) {

        val driver = AppConfig.profile
        driver?.let {

            coroutineScope.launch {
                try {
                    val service = ServiceManager.getInstance().getService(UserService::class.java) as UserService
                    val response = service.changeStatus(StateChangeInput(it.userId, state))
                    if(response.success) {
                        driver.state = state
                        setUserState(driver)
                    }
                    else {
                        Toast.makeText(this@MainActivity, response.message, Toast.LENGTH_SHORT).show()
                    }
                }
                catch(ex: Exception) {
                    Toast.makeText(this@MainActivity, ex.message, Toast.LENGTH_SHORT).show()
                }
            }

        } ?:
            Toast.makeText(this, "Profile not found", Toast.LENGTH_SHORT).show()

    }

    //endregion

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
                    setupSocket()
                }?: setUserNotAvailable()
            }
            catch(ex: Exception) {
                Toast.makeText(this@MainActivity, ex.message, Toast.LENGTH_SHORT).show()
            }
        }
    }

    private fun setUserState(profile: User) {
        when(profile.state) {
            AppConfig.STATE_IDLE -> setUserIdle()
            AppConfig.STATE_BUSY -> setUserBusy()
            AppConfig.STATE_NOT_AVAILABLE -> setUserNotAvailable()
        }
    }

    private fun setUserIdle() {
        txtState.text = getString(R.string.txt_ready)
        viewState.background = ContextCompat.getDrawable(this, R.drawable.drawable_icon_idle)
        btnChangeStatus.text = getString(R.string.txt_make_not_available)
        btnChangeStatus.visibility = View.VISIBLE
    }

    private fun setUserBusy() {
        txtState.text = getString(R.string.txt_already_have_ride)
        viewState.background = ContextCompat.getDrawable(this, R.drawable.drawable_icon_busy)
        btnChangeStatus.visibility = View.GONE
    }

    private fun setUserNotAvailable() {
        txtState.text = getString(R.string.txt_no_ride)
        viewState.background = ContextCompat.getDrawable(this, R.drawable.drawable_icon_not_available)
        btnChangeStatus.text = getString(R.string.txt_make_available)
        btnChangeStatus.visibility = View.VISIBLE
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

    //region Sockets

    private fun setupSocket() {
        try {
            socket = IO.socket(BuildConfig.baseURL)
            socket.on(
                Socket.EVENT_CONNECT
            ) {
                runOnUiThread {
                    val payload = JSONObject()
                    payload.put("userID", AppConfig.profile?.userId)
                    payload.put("type", "Driver")
                    sendMessageToServer("connectUser", payload)
                    Toast.makeText(this@MainActivity, "connected", Toast.LENGTH_SHORT).show()
                }
            }
                .on(
                    Socket.EVENT_DISCONNECT
                ) {
                    runOnUiThread {
                        Toast.makeText(
                            this@MainActivity,
                            "disconnected",
                            Toast.LENGTH_SHORT
                        ).show()
                    }
                }
                .on("EVENT_RIDE_REQUEST") { args ->
                    runOnUiThread {
                        if(args.isNotEmpty()) {
                            val bookingObj = (args[0] as JSONObject).getJSONObject("booking")
                            val ride = Ride()
                            ride.populateData(bookingObj)
                            Toast.makeText(this@MainActivity, "New Ride Request Received", Toast.LENGTH_SHORT).show()
                            val mIntent = Intent(this@MainActivity, RideRequestActivity::class.java)
                            mIntent.putExtra("ride", ride)
                            startActivity(mIntent)
                        }

                    }
                }
            socket.connect()

        } catch (e: URISyntaxException) {
            e.printStackTrace()
        }

    }

    private fun sendMessageToServer(event: String, payload: JSONObject = JSONObject()) {
        socket.emit(event, payload)
    }

    private fun sendEventViaSocket() {
        btnChangeStatus.setOnClickListener {
            // Sending an object

            try {
                val obj = JSONObject()
                obj.put("name", "server")
                obj.put("email", "test")
                socket.emit("available", obj)
            } catch (e: JSONException) {
                e.printStackTrace()
            }
        }
    }

    //endregion

}
