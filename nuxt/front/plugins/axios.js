 //axios的配置

 import Vue from 'vue'
 import axios from 'axios'

 let service = axios.create({
   timeout: 500,
   baseURL: '/api'
 })
 //拦截器
 service.interceptors.request.use(
   config => {
     return config
   },
   err => {
     return Promise.reject(err)
   }
 )
 //响应拦截
 service.interceptors.response.use(
   async response => {
     let {
       data
     } = response
     return data
   }

 )

 Vue.prototype.$http = service
 export const http = service
