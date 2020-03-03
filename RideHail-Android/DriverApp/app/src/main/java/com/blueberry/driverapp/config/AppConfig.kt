package com.blueberry.consumerapp.config

import com.blueberry.consumerapp.entities.User

object AppConfig {
    var profile: User? = null
    val STATE_IDLE = "IDLE"
    val STATE_BUSY = "BUSY"
    val STATE_NOT_AVAILABLE = "NOT_AVAILABLE"
}