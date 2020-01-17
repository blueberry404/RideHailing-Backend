package com.blueberry.consumerapp.adapters

import android.content.Context
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.BaseAdapter
import android.widget.TextView
import com.blueberry.consumerapp.R
import com.blueberry.consumerapp.entities.Route

class LocationSpinnerAdapter(context: Context, private val list: List<Route>) : BaseAdapter() {

    private val mInflater: LayoutInflater = LayoutInflater.from(context)

    override fun getView(position: Int, convertView: View?, parent: ViewGroup?): View {
        val view: View
        val holder: LocationSpinnerViewHolder
        if (convertView == null) {
            view = mInflater.inflate(R.layout.item_spinner_loc, parent, false)
            holder = LocationSpinnerViewHolder(view)
            view.tag = holder
        } else {
            view = convertView
            holder = view.tag as LocationSpinnerViewHolder
        }

        val route = list[position]
        holder.textView.text = "${route.source} -> ${route.dest}"
        return view
    }

    override fun getItem(p0: Int): Any = list[p0]

    override fun getItemId(p0: Int): Long = p0.toLong()

    override fun getCount(): Int = list.size

}

class LocationSpinnerViewHolder(view: View) {

    val textView: TextView = view.findViewById(R.id.txtLocation)

}