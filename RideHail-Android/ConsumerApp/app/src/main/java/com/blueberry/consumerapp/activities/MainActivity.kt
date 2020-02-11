package com.blueberry.consumerapp.activities

import android.content.Intent
import android.os.Bundle
import android.os.PersistableBundle
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.edit
import com.blueberry.consumerapp.R
import com.blueberry.consumerapp.adapters.LocationSpinnerAdapter
import com.blueberry.consumerapp.config.AppConfig
import com.blueberry.consumerapp.constants.KeyConstants
import com.blueberry.consumerapp.entities.LoginInput
import com.blueberry.consumerapp.entities.Route
import com.blueberry.consumerapp.entities.User
import com.blueberry.consumerapp.rest.ServiceManager
import com.blueberry.consumerapp.rest.UserService
import com.blueberry.consumerapp.utils.Utils
import com.google.android.gms.maps.*
import com.google.android.gms.maps.model.LatLng
import com.google.android.gms.maps.model.MarkerOptions
import kotlinx.android.synthetic.main.activity_login.*
import kotlinx.android.synthetic.main.activity_main.*
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import org.json.JSONArray
import org.json.JSONObject

class MainActivity : AppCompatActivity(), OnMapReadyCallback {

    private lateinit var mMap: GoogleMap
    private val coroutineScope: CoroutineScope = CoroutineScope(Dispatchers.Main)


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        getUserProfile()
        populateSpinner()
        initMap()
    }

    private fun getUserProfile() {

        coroutineScope.launch {
            try {
                val service = ServiceManager.getInstance().getService(UserService::class.java) as UserService
                val response = service.getMyProfile()
                val result = response.result
                result?.let {
                    AppConfig.profile = it
                    txtStateVal.text = it.state
                    setUserState(it)
                }?: setUserIdle()
            }
            catch(ex: Exception) {
                Toast.makeText(this@MainActivity, ex.message, Toast.LENGTH_SHORT).show()
            }
        }
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
        list.add(Route())
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
//        val sydney = LatLng(-34.0, 151.0)
//        mMap.addMarker(MarkerOptions().position(sydney).title("Marker in Sydney"))
//        mMap.moveCamera(CameraUpdateFactory.newLatLng(sydney))
    }

    private fun setUserState(profile: User) {
        when(profile.state) {
            "IDLE" -> setUserIdle()
        }
    }

    private fun setUserIdle() {
        mMap.clear()
    }

}
