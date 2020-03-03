package com.blueberry.consumerapp.entities

import com.google.gson.annotations.SerializedName

data class User(
    @SerializedName("id")
    val userId: Int,
    val firstName: String,
    val lastName: String?,
    var state: String,
    val email: String,
    val mobile: String,
    val profileImageURL: String?
) {
    fun getName(): String = "${firstName.capitalize()} ${lastName?.capitalize()}"
}
