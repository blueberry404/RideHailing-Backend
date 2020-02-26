package com.blueberry.driverapp.activities

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Toast
import androidx.core.content.ContextCompat
import com.blueberry.consumerapp.config.AppConfig
import com.blueberry.consumerapp.entities.User
import com.blueberry.consumerapp.rest.ServiceManager
import com.blueberry.consumerapp.rest.UserService
import com.blueberry.driverapp.R

import com.google.android.gms.maps.CameraUpdateFactory
import com.google.android.gms.maps.GoogleMap
import com.google.android.gms.maps.OnMapReadyCallback
import com.google.android.gms.maps.SupportMapFragment
import com.google.android.gms.maps.model.LatLng
import com.google.android.gms.maps.model.MarkerOptions
import kotlinx.android.synthetic.main.activity_main.*
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

class MainActivity : AppCompatActivity(), OnMapReadyCallback {

    private lateinit var mMap: GoogleMap
    private val coroutineScope: CoroutineScope = CoroutineScope(Dispatchers.Main)

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        // Obtain the SupportMapFragment and get notified when the map is ready to be used.
        val mapFragment = supportFragmentManager
            .findFragmentById(R.id.map) as SupportMapFragment
        mapFragment.getMapAsync(this)
    }

    override fun onPostCreate(savedInstanceState: Bundle?) {
        super.onPostCreate(savedInstanceState)
        getUserProfile()

    }

    override fun onMapReady(googleMap: GoogleMap) {
        mMap = googleMap

        // Add a marker in Sydney and move the camera
        val sydney = LatLng(-34.0, 151.0)
        mMap.addMarker(MarkerOptions().position(sydney).title("Marker in Sydney"))
        mMap.moveCamera(CameraUpdateFactory.newLatLng(sydney))
    }

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
        mMap.clear()
        txtState.text = "You are Idle"
        viewState.background = ContextCompat.getDrawable(this, R.drawable.drawable_icon_idle)
    }

    private fun setUserBusy() {
        mMap.clear()
        txtState.text = "You are Busy"
        viewState.background = ContextCompat.getDrawable(this, R.drawable.drawable_icon_busy)
    }

    private fun setUserNotAvailable() {
        mMap.clear()
        txtState.text = "You are Not Available"
        viewState.background = ContextCompat.getDrawable(this, R.drawable.drawable_icon_not_available)
    }



}
