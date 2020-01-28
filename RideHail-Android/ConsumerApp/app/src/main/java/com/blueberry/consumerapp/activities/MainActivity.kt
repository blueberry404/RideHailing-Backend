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
import kotlinx.android.synthetic.main.activity_main.*
import org.json.JSONArray
import org.json.JSONObject

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        getUserProfile()
        populateSpinner()
    }

    private fun getUserProfile() {
        val service = ServiceManager.getInstance().getService(UserService::class.java) as UserService
//        service.login(LoginInput())
    }

    private fun populateSpinner() {
        spinner.adapter = LocationSpinnerAdapter(this, getLocations())
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
}
