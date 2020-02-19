package com.blueberry.driverapp.activities

import android.content.Intent
import android.os.Bundle
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.blueberry.consumerapp.constants.KeyConstants.KEY_TOKEN
import com.blueberry.consumerapp.entities.LoginInput
import com.blueberry.consumerapp.rest.ServiceManager
import com.blueberry.consumerapp.rest.UserService
import com.blueberry.consumerapp.utils.Utils
import com.blueberry.driverapp.R
import kotlinx.android.synthetic.main.activity_login.*
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import androidx.core.content.edit

class LoginActivity: AppCompatActivity() {

    private val coroutineScope: CoroutineScope = CoroutineScope(Dispatchers.Main)

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login)
        onActionListener()
        checkForLoggedInUser()
    }

    private fun onActionListener() {
        login.setOnClickListener {
            if(isValid()) {
                authenticateUser()
            }
        }
    }

    private fun checkForLoggedInUser() {
        if(!Utils.getSharedPreferences(this@LoginActivity).getString(KEY_TOKEN, null).isNullOrBlank()) {
            navigateToHome()
        }
    }

    private fun isValid() : Boolean {
        val username = username.text.toString()
        val password = password.text.toString()

        if(username.isNullOrBlank()) {
            Toast.makeText(this, R.string.invalid_username, Toast.LENGTH_SHORT).show()
            return false
        }

        if(password.isNullOrBlank()) {
            Toast.makeText(this, R.string.invalid_password, Toast.LENGTH_SHORT).show()
            return false
        }

        return true
    }

    private fun authenticateUser() {

        coroutineScope.launch {
            try {
                val service = ServiceManager.getInstance().getService(UserService::class.java) as UserService
                val response = service.login(LoginInput(username.text.toString(), password.text.toString()))
                val result = response.result
                if(!result.isNullOrEmpty() && result.containsKey(KEY_TOKEN)) {
                    Utils.getSharedPreferences(this@LoginActivity)
                        .edit(true) { putString(KEY_TOKEN, result[KEY_TOKEN] as String) }
                    navigateToHome()
                }
                else
                    Toast.makeText(this@LoginActivity, R.string.login_failed, Toast.LENGTH_SHORT).show()
            }
            catch(ex: Exception) {
                Toast.makeText(this@LoginActivity, ex.message, Toast.LENGTH_SHORT).show()
            }
        }
    }

    private fun navigateToHome() {
//        startActivity(Intent(this@LoginActivity, MainActivity::class.java))
//        finish()
    }
}