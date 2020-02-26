package com.blueberry.driverapp.components

import android.content.Context
import android.util.AttributeSet
import android.view.View
import com.blueberry.driverapp.R
import com.blueberry.driverapp.constants.DriverState


class StateView @JvmOverloads constructor(
    context: Context, attrs: AttributeSet? = null, defStyleAttr: Int = 0
) : View(context, attrs, defStyleAttr) {

    private var STATE = intArrayOf(R.attr.state)
    private var mState: DriverState = DriverState.NOT_AVAILABLE

    init {
        initAttrs(context, attrs)
    }

    private fun initAttrs(context: Context, attrs: AttributeSet?) {
        attrs?.let {
            val attrArr = context.obtainStyledAttributes(attrs, R.styleable.DriverState)
            try {
                val state = attrArr.getString(R.styleable.DriverState_state)
                state?.let {
                    assignState(it)
                }
            }
            finally {
                attrArr.recycle()
            }
        }
    }

    fun setState(state: String) {
        assignState(state)
        invalidate()
        requestLayout()
    }

    private fun assignState(state: String) {

        mState = when(state) {
            "NotAvailable" -> DriverState.NOT_AVAILABLE
            "Idle" -> DriverState.IDLE
            "Busy" -> DriverState.BUSY
            else -> throw IllegalStateException("Driver State must be one of the NotAvailable, Busy or Idle")
        }
    }

}