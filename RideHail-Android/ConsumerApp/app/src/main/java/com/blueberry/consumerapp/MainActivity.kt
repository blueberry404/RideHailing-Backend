package com.blueberry.consumerapp

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.os.PersistableBundle
import kotlinx.android.synthetic.main.activity_main.*
import org.json.JSONArray
import org.json.JSONObject

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
    }

    override fun onCreate(savedInstanceState: Bundle?, persistentState: PersistableBundle?) {
        super.onCreate(savedInstanceState, persistentState)
        getUserProfile()
        populateSpinner()
    }

    private fun getUserProfile() {

    }

    private fun populateSpinner() {

    }

    private fun getLocations() : List<Route> {
        val list = mutableListOf<Route>()
        val rawData = Utils.loadJSONFromAsset(this, "locations.json")
        rawData?.let {
            val jsonArr = JSONArray(it)
            for (i in 0 until jsonArr.length()) {
                val obj = jsonArr.get(i)
                val route = Route()
                list.add(route)
            }
        }
        return list
    }

}
