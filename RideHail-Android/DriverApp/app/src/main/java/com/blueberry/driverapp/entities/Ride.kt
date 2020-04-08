package com.blueberry.driverapp.entities

import android.os.Parcel
import android.os.Parcelable
import com.blueberry.consumerapp.utils.Utils
import org.json.JSONObject

class Ride constructor(

    var id: Int? = 0,
    var bookingDate: String? = null,
    var startRideTime: String? = null,
    var endRideTime: String? = null,
    var distance: Float = 0f,
    var amountCharged: Double = 0.0,
    var sourceLocation: Map<String, Double>? = null,
    var destLocation: Map<String, Double>? = null,
    var isCancelled: Boolean = false,
    var consumerId: Int = 0,
    var driverId: Int? = null
) : Parcelable {

    constructor(parcel: Parcel) : this(
        parcel.readValue(Int::class.java.classLoader) as? Int,
        parcel.readString(),
        parcel.readString(),
        parcel.readString(),
        parcel.readFloat(),
        parcel.readDouble(),
        Utils.readParcelableForLocation(parcel),
        Utils.readParcelableForLocation(parcel),
        parcel.readByte() != 0.toByte(),
        parcel.readInt(),
        parcel.readValue(Int::class.java.classLoader) as? Int
    )

    override fun writeToParcel(p0: Parcel?, p1: Int) {
        p0?.writeValue(id)
        p0?.writeString(bookingDate)
        p0?.writeString(startRideTime)
        p0?.writeString(endRideTime)
        p0?.writeFloat(distance)
        p0?.writeDouble(amountCharged)
        p0?.writeBundle(Utils.writeLocationToParcel(sourceLocation as HashMap<String, Double>))
        p0?.writeBundle(Utils.writeLocationToParcel(destLocation as HashMap<String, Double>))
        p0?.writeByte(if (isCancelled) 1 else 0)
        p0?.writeInt(consumerId)
        p0?.writeValue(driverId)
    }

    override fun describeContents(): Int = 0

    fun populateData(data: JSONObject) {
        id = data.getInt("rideID")
        consumerId = data.getInt("consumerId")

        val drivID = data.get("driverId")
        if(drivID is Int) {
            driverId = drivID
        }

        bookingDate = data.getString("bookingDate")

        val srcLoc = data.getJSONObject("sourceLocation")
        sourceLocation = mapOf(Pair("latitude", srcLoc.getDouble("latitude")),
            Pair("longitude", srcLoc.getDouble("longitude")))

        val destLoc = data.getJSONObject("destLocation")
        destLocation = mapOf(Pair("latitude", destLoc.getDouble("latitude")),
            Pair("longitude", destLoc.getDouble("longitude")))
    }

    companion object CREATOR : Parcelable.Creator<Ride> {
        override fun createFromParcel(parcel: Parcel): Ride {
            return Ride(parcel)
        }

        override fun newArray(size: Int): Array<Ride?> {
            return arrayOfNulls(size)
        }
    }


}