package com.blueberry.consumerapp.entities

import org.json.JSONObject

class Route {

    lateinit var source: String
    lateinit var dest: String
    lateinit var sourceCoords: Location
    lateinit var destCoords: Location

    fun parse(obj: JSONObject) {
        source = obj["source"] as String
        dest = obj["dest"] as String
        val locSrc = obj["sourceCoords"] as JSONObject
        val locDest = obj["destCoords"] as JSONObject
        sourceCoords = Location(locSrc["latitude"] as Double, locSrc["longitude"] as Double)
        destCoords = Location(locDest["latitude"] as Double, locDest["longitude"] as Double)
    }
}

data class Location constructor(val latitude: Double, val longitude: Double)