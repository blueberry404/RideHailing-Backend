package com.blueberry.consumerapp.activities

import android.Manifest
import android.content.IntentSender
import android.location.Location
import android.os.Bundle
import android.view.View
import android.widget.AdapterView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.blueberry.consumerapp.R
import com.blueberry.consumerapp.adapters.LocationSpinnerAdapter
import com.blueberry.consumerapp.config.AppConfig
import com.blueberry.consumerapp.constants.KeyConstants
import com.blueberry.consumerapp.entities.BookingInput
import com.blueberry.consumerapp.entities.Route
import com.blueberry.consumerapp.entities.User
import com.blueberry.consumerapp.rest.LocationService
import com.blueberry.consumerapp.rest.ServiceManager
import com.blueberry.consumerapp.rest.UserService
import com.blueberry.consumerapp.utils.*
import com.github.ybq.android.spinkit.style.DoubleBounce
import com.google.android.gms.common.api.ApiException
import com.google.android.gms.common.api.ResolvableApiException
import com.google.android.gms.location.FusedLocationProviderClient
import com.google.android.gms.location.LocationServices
import com.google.android.gms.location.LocationSettingsResponse
import com.google.android.gms.location.LocationSettingsStatusCodes
import com.google.android.gms.maps.*
import com.google.android.gms.maps.model.BitmapDescriptorFactory
import com.google.android.gms.maps.model.CameraPosition
import com.google.android.gms.maps.model.LatLng
import com.google.android.gms.maps.model.MarkerOptions
import kotlinx.android.synthetic.main.activity_main.*
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import org.json.JSONArray
import org.json.JSONObject
import com.google.android.gms.maps.model.LatLngBounds
import com.google.android.gms.maps.model.Marker


class MainActivity : AppCompatActivity(), OnMapReadyCallback {

    private lateinit var mMap: GoogleMap
    private val coroutineScope: CoroutineScope = CoroutineScope(Dispatchers.Main)
    private lateinit var mFusedLocationClient: FusedLocationProviderClient
    private lateinit var locationList: MutableList<Route>

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
    }

    override fun onPostCreate(savedInstanceState: Bundle?) {
        super.onPostCreate(savedInstanceState)
        populateUI()
        setActions()
        initLocationServices()
        getUserProfile()
    }

    private fun setActions() {
        btnMyLocation.setOnClickListener { checkForLocation()}

        spinner.onItemSelectedListener = object: AdapterView.OnItemSelectedListener {

            override fun onNothingSelected(p0: AdapterView<*>?) {
            }

            override fun onItemSelected(p0: AdapterView<*>?, p1: View?, p2: Int, p3: Long) {
                showSelectedLocationsOnMap(p2)
            }

        }

        btnGo.setOnClickListener { onGoPressed() }
    }

    private fun onGoPressed() {
        if(spinner.selectedItemPosition == 0)
            Toast.makeText(this@MainActivity, R.string.txt_loc_validation, Toast.LENGTH_SHORT).show()
        else
            requestRide()
    }

    private fun requestRide() {
        coroutineScope.launch {
            try {
                progressView.visibility = View.VISIBLE
                val service = ServiceManager.getInstance().getService(LocationService::class.java) as LocationService
                val response = service.requestRide(getBookingRequest())
                if(!response.success) {
                    
                }
                progressView.visibility = View.GONE
            }
            catch(ex: Exception) {
                progressView.visibility = View.GONE
                Toast.makeText(this@MainActivity, ex.message, Toast.LENGTH_SHORT).show()
            }
        }
    }

    private fun getUserProfile() {

        coroutineScope.launch {
            try {
                progressView.visibility = View.VISIBLE
                val service = ServiceManager.getInstance().getService(UserService::class.java) as UserService
                val response = service.getMyProfile()
                val result = response.result
                result?.let {
                    AppConfig.profile = it
                    txtStateVal.text = it.state
                    setUserState(it)
                }?: setUserIdle()
                progressView.visibility = View.GONE
            }
            catch(ex: Exception) {
                progressView.visibility = View.GONE
                Toast.makeText(this@MainActivity, ex.message, Toast.LENGTH_SHORT).show()
            }
        }
    }

    private fun getBookingRequest(): BookingInput {
        AppConfig.profile?.let {
            val route = locationList[spinner.selectedItemPosition]
            return BookingInput(it.userId, route.sourceCoords.latitude, route.sourceCoords.longitude, route.destCoords.latitude, route.destCoords.longitude)
        }
        return BookingInput()
    }

    private fun populateUI() {
        initLocations()
        spinner.adapter = LocationSpinnerAdapter(this, locationList)

        progressView.setIndeterminateDrawable(DoubleBounce())
    }

    private fun initLocationServices() {
        mFusedLocationClient = LocationServices.getFusedLocationProviderClient(this)

        val mapFragment = supportFragmentManager
            .findFragmentById(R.id.map) as SupportMapFragment
        mapFragment.getMapAsync(this)
    }

    private fun initLocations() {
        locationList = mutableListOf()
        locationList.add(Route())
        val rawData = Utils.loadJSONFromAsset(this, "locations.json")
        rawData?.let {
            val jsonArr = JSONArray(it)
            for (i in 0 until jsonArr.length()) {
                val route = Route()
                route.parse(jsonArr.get(i) as JSONObject)
                locationList.add(route)
            }
        }
    }

    override fun onMapReady(googleMap: GoogleMap) {
        mMap = googleMap
        if(checkPermission()) {
            mMap.isMyLocationEnabled = true
            checkForLocation()
        }
    }

    private fun setUserState(profile: User) {
        when(profile.state) {
            "IDLE" -> setUserIdle()
        }
    }

    private fun setUserIdle() {
        mMap.clear()
    }

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
    }

    private fun showSelectedLocationsOnMap(selectedItem: Int) {
        mMap.clear()
        if(selectedItem > 0) {
            val route = locationList[selectedItem]
            val builder = LatLngBounds.Builder()

            builder.include(addMarkerToMap(route.source, route.sourceCoords).position)
            builder.include(addMarkerToMap(route.dest, route.destCoords).position)

            mMap.moveCamera(CameraUpdateFactory.newLatLngBounds(builder.build(), Utils.convertDpToPixel(50.0f).toInt()))
        }
    }

    private fun addMarkerToMap(title: String, location: com.blueberry.consumerapp.entities.Location): Marker {
        return mMap.addMarker(
            MarkerOptions().position(LatLng(location.latitude, location.longitude))
                .title(title)
                .icon(
                    BitmapDescriptorFactory.defaultMarker(BitmapDescriptorFactory.HUE_RED)
                )
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
