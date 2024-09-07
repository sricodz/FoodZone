import axios from "axios";
import { getToken } from "../utils";


/***
 * In this file we are using types of axios like public and secured
 * While calling public apis no need jwt token but for secured apis needed token in header
 * So we differentiated here based on our requirement have to use
 * 
 */

 export const publicAxios = axios.create({
    baseURL : 'http://localhost:8080'
 });

 export const securedAxios = axios.create({
    baseURL : 'http://localhost:8080',
    withCredentials : true
 });


 /**
  * Add a Interceptor to include the jwt token in header for secured requests
  */

 securedAxios.interceptors.request.use((config)=>{
    const jwtToken = JSON.parse(localStorage.getItem("token"));
    if(jwtToken){
        config.headers.Authorization = `Bearer ${jwtToken}`;
    }
    return config;
 },(error)=>{
    return Promise.reject(error);
 })

