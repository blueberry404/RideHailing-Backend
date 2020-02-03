package com.blueberry.consumerapp.activities

import android.content.Intent
import android.os.Bundle
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.edit
import com.blueberry.consumerapp.R
import com.blueberry.consumerapp.constants.KeyConstants.KEY_TOKEN
import com.blueberry.consumerapp.entities.LoginInput
import com.blueberry.consumerapp.rest.ServiceManager
import com.blueberry.consumerapp.rest.UserService
import com.blueberry.consumerapp.utils.Utils
import kotlinx.android.synthetic.main.activity_login.*
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

class LoginActivity: AppCompatActivity() {

    private val coroutineScope: CoroutineScope = CoroutineScope(Dispatchers.Main)
    private val TAG = LoginActivity::class.java.simpleName

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
            try {
                val service = ServiceManager.getInstance().getService(UserService::class.java) as UserService
                val response = service.login(LoginInput(username.text.toString(), password.text.toString()))
                val result = response.result
                if(!result.isNullOrEmpty() && result.containsKey(KEY_TOKEN)) {
                    Utils.getSharedPreferences(this@LoginActivity)
                        .edit(true) { putString(KEY_TOKEN, result[KEY_TOKEN] as String) }
                    startActivity(Intent(this@LoginActivity, MainActivity::class.java))
                    finish()
                }
                else
                    Toast.makeText(this@LoginActivity, R.string.login_failed, Toast.LENGTH_SHORT).show()
            }
            catch(ex: Exception) {
                Toast.makeText(this@LoginActivity, ex.message, Toast.LENGTH_SHORT).show()
            }
        }
    }
}