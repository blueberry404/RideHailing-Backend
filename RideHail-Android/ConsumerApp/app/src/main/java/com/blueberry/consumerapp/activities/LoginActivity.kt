package com.blueberry.consumerapp.activities

import android.os.Bundle
import android.util.Log
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.blueberry.consumerapp.R
import com.blueberry.consumerapp.entities.LoginInput
import com.blueberry.consumerapp.rest.ServiceManager
import com.blueberry.consumerapp.rest.UserService
import kotlinx.android.synthetic.main.activity_login.*
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

class LoginActivity: AppCompatActivity() {

    private val coroutineScope: CoroutineScope = CoroutineScope(Dispatchers.Main)
    private val TAG = LoginActivity::class.simpleName

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login)
        onActionListener()
    }

    private fun onActionListener() {
        login.setOnClickListener {
            if(isValid()) {
                authenticateUser()
            }
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
            val service = ServiceManager.getInstance().getService(UserService::class.java) as UserService
            val response = service.login(LoginInput(username.text.toString(), password.text.toString()))
            Log.e(TAG, response.toString())
        }
    }
}