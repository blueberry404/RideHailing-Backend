package com.blueberry.driverapp.components

import android.content.Context
import android.util.AttributeSet
import android.view.View
import com.blueberry.driverapp.R
import com.blueberry.driverapp.constants.DriverState


class StateView @JvmOverloads constructor(
    context: Context, attrs: AttributeSet? = null, defStyleAttr: Int = 0
) : View(context, attrs, defStyleAttr) {

    private var STATE_NOT_AVAILABLE = intArrayOf(R.attr.state_not_available)
    private var STATE_IDLE = intArrayOf(R.attr.state_idle)
    private var STATE_BUSY = intArrayOf(R.attr.state_busy)
    private var mState: DriverState = DriverState.NOT_AVAILABLE

    private var mStateNotAvail : Boolean = false
    private var mStateIdle : Boolean = false
    private var mStateBusy : Boolean = false

    init {
        initAttrs(context, attrs)
    }

    private fun initAttrs(context: Context, attrs: AttributeSet?) {
        attrs?.let {
            val attrArr = context.obtainStyledAttributes(attrs, R.styleable.StateView)
            try {
                mStateNotAvail = attrArr.getBoolean(R.styleable.StateView_state_not_available, false)
                mStateIdle = attrArr.getBoolean(R.styleable.StateView_state_idle, false)
                mStateBusy = attrArr.getBoolean(R.styleable.StateView_state_busy, false)
            }
            finally {
                attrArr.recycle()
            }
        }
    }

    fun setStateNotAvailable(state: Boolean) {
        mStateNotAvail = state
        mStateIdle = false
        mStateBusy = false
        invalidate()
        requestLayout()
    }

    fun setStateIdle(state: Boolean) {
        mStateNotAvail = false
        mStateIdle = state
        mStateBusy = false
        invalidate()
        requestLayout()
    }

    fun setStateBusy(state: Boolean) {
        mStateNotAvail = false
        mStateIdle = false
        mStateBusy = state
        invalidate()
        requestLayout()
    }

    override fun onCreateDrawableState(extraSpace: Int): IntArray {

        val drawableStates = super.onCreateDrawableState(extraSpace + 1)
        if(mStateNotAvail)
            mergeDrawableStates(drawableStates, STATE_NOT_AVAILABLE)
        else if(mStateIdle)
            mergeDrawableStates(drawableStates, STATE_IDLE)
        else
            mergeDrawableStates(drawableStates, STATE_BUSY)
        return drawableStates
    }
}