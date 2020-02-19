package com.blueberry.consumerapp.rest

import java.util.concurrent.ConcurrentHashMap

class ServiceManager private constructor() {

    private var serviceClient : ServiceClient? = null
    private var serviceCache : ConcurrentHashMap<String, Any>

    init {
        serviceClient = ServiceClient(ServiceInterceptor())
        serviceCache = ConcurrentHashMap()
    }

    companion object {
        private val mInstance: ServiceManager = ServiceManager()

        @Synchronized
        fun getInstance() : ServiceManager = mInstance
    }

     @Synchronized fun <S> getService(cls: Class<S>): Any? {

         if(serviceCache?.contains(cls.toString())) {
             return serviceCache.get(cls.toString()) as S?
         }

         var serv : S? = serviceClient?.retrofit?.create(cls) as S
         serviceCache[cls.toString()] = serv as Any
         return serv
    }

}