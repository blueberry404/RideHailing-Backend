package com.blueberry.consumerapp.activities

import android.os.Bundle
import android.os.PersistableBundle
import androidx.appcompat.app.AppCompatActivity
import com.blueberry.consumerapp.R
import com.blueberry.consumerapp.adapters.LocationSpinnerAdapter
import com.blueberry.consumerapp.entities.LoginInput
import com.blueberry.consumerapp.entities.Route
import com.blueberry.consumerapp.rest.ServiceManager
import com.blueberry.consumerapp.rest.UserService
import com.blueberry.consumerapp.utils.Utils
import com.google.android.gms.maps.*
import com.google.android.gms.maps.model.LatLng
import com.google.android.gms.maps.model.MarkerOptions
import kotlinx.android.synthetic.main.activity_main.*
import org.json.JSONArray
import org.json.JSONObject

class MainActivity : AppCompatActivity(), OnMapReadyCallback {

    private lateinit var mMap: GoogleMap

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        getUserProfile()
        populateSpinner()
        initMap()
    }

    private fun getUserProfile() {
        val service = ServiceManager.getInstance().getService(UserService::class.java) as UserService
//        service.login(LoginInput())
    }

    private fun populateSpinner() {
        spinner.adapter = LocationSpinnerAdapter(this, getLocations())
    }

    private fun initMap() {
        val mapFragment = supportFragmentManager
            .findFragmentById(R.id.map) as SupportMapFragment
        mapFragment.getMapAsync(this)
    }

    private fun getLocations() : List<Route> {
        val list = mutableListOf<Route>()
        val rawData = Utils.loadJSONFromAsset(this, "locations.json")
        rawData?.let {
            val jsonArr = JSONArray(it)
            for (i in 0 until jsonArr.length()) {
                val route = Route()
                route.parse(jsonArr.get(i) as JSONObject)
                list.add(route)
            }
        }
        return list
    }

    override fun onMapReady(googleMap: GoogleMap) {
        mMap = googleMap

        // Add a marker in Sydney and move the camera
        val sydney = LatLng(-34.0, 151.0)
        mMap.addMarker(MarkerOptions().position(sydney).title("Marker in Sydney"))
        mMap.moveCamera(CameraUpdateFactory.newLatLng(sydney))
    }
}
