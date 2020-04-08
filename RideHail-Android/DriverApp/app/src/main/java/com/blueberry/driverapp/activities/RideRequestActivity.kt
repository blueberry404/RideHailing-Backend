package com.blueberry.driverapp.activities

import android.location.Address
import android.location.Geocoder
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.TextView
import android.widget.Toast
import com.blueberry.consumerapp.rest.ServiceManager
import com.blueberry.consumerapp.rest.UserService
import com.blueberry.consumerapp.utils.Utils
import com.blueberry.consumerapp.utils.showToast
import com.blueberry.driverapp.R
import com.blueberry.driverapp.entities.Ride
import com.google.android.gms.maps.CameraUpdateFactory
import com.google.android.gms.maps.GoogleMap
import com.google.android.gms.maps.OnMapReadyCallback
import com.google.android.gms.maps.SupportMapFragment
import com.google.android.gms.maps.model.*
import kotlinx.android.synthetic.main.activity_ride_request.*
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import java.util.*


class RideRequestActivity : AppCompatActivity(), OnMapReadyCallback {

    private var ride: Ride? = null
    private val coroutineScope: CoroutineScope = CoroutineScope(Dispatchers.Main)
    private var mMap: GoogleMap? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_ride_request)
    }

    override fun onPostCreate(savedInstanceState: Bundle?) {
        super.onPostCreate(savedInstanceState)
        intent?.let {
            ride = it.getParcelableExtra("ride") as Ride
            if (ride == null) {
                showToast(this@RideRequestActivity, "Ride not found")
                finish()
            }
            else {
                setActionListeners()
                getConsumerProfile()
                populateData()
            }
        }
    }

    private fun loadMap() {
        val mapFragment = supportFragmentManager
            .findFragmentById(R.id.map) as SupportMapFragment
        mapFragment.getMapAsync(this)
    }

    override fun onMapReady(p0: GoogleMap?) {
        mMap = p0

    }

    private fun populateData() {
        ride?.let { ride ->
            txtBookingId.text = ride.id.toString()
            loadMap()
            if(ride.sourceLocation != null) {
                setAddress(ride.sourceLocation!!, txtPickup)
            }
            if(ride.destLocation != null) {
                setAddress(ride.destLocation!!, txtDest)
            }
            showLocationsOnMap(ride)
        }
    }

    private fun setAddress(location: Map<String, Double>, txtview: TextView) {
        var geocoder = Geocoder(this@RideRequestActivity, Locale.getDefault())

        coroutineScope.launch {
            var addresses : List<Address> = geocoder.getFromLocation(location["latitude"]!!, location["longitude"]!!,1)
            txtview.text = if(addresses.isNotEmpty()) addresses[0].getAddressLine(0) else ""
        }
    }

    private fun getConsumerProfile() {
        coroutineScope.launch {
            try {
                val service =
                    ServiceManager.getInstance().getService(UserService::class.java) as UserService
                val response = service.getConsumerProfile(ride!!.consumerId)
                if(response.success) {
                    val profile = response.result
                    profile?.let {
                        runOnUiThread { txtRider.text = "${it.getName()}" }
                    }
                }
            }
            catch(ex: Exception) {
                Toast.makeText(this@RideRequestActivity, ex.message, Toast.LENGTH_SHORT).show()
            }
        }
    }

    private fun setActionListeners() {
        btnAccept.setOnClickListener {  }
        btnReject.setOnClickListener { finish() }
    }

    private fun showLocationsOnMap(ride: Ride) {
        val builder = LatLngBounds.Builder()
        ride.sourceLocation?.let {
            val marker = addMarkerToMap(it)
            builder.include(marker?.position)
        }
        ride.destLocation?.let {
            val marker = addMarkerToMap(it)
            builder.include(marker?.position)
        }
        val cu = CameraUpdateFactory.newLatLngBounds(builder.build(), 30)
        mMap?.animateCamera(cu)
    }

    private fun addMarkerToMap(it: Map<String, Double>): MarkerOptions? {
        val marker = MarkerOptions()
            .position(LatLng(it["latitude"] as Double, it["longitude"] as Double))
            .icon(BitmapDescriptorFactory.defaultMarker(BitmapDescriptorFactory.HUE_ROSE))
        mMap?.addMarker(marker)
        return marker
    }
}
