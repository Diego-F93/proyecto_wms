import axios from 'axios'
import React, { useState } from 'react'

const backend = axios.create(   // Direccion base del Backend para peticiones API
    {
        baseURL : "http://127.0.0.1:8000/api/"    
    });


let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

backend.interceptors.request.use((config) => { // Agregra el token de sesion al inicio de cada peticion de forma automatica
    const token = localStorage.getItem('access');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config
    },
    (error) => Promise.reject(error)
);

// Interceptor de RESPONSE → si 401, intenta refrescar
backend.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Si no es 401 o ya intentamos reintentar, rechazamos normal
    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;
    const refreshToken = localStorage.getItem("refresh");

    if (!refreshToken) {
      // No hay refresh → forzamos logout
      // Aquí puedes redirigir al login
      window.location.href = "/login";
      return Promise.reject(error);
    }

    // Si ya se está refrescando, ponemos esta request en cola
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then((newToken) => {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return backend(originalRequest);
        })
        .catch((err) => Promise.reject(err));
    }

    isRefreshing = true;

    try {
      // Llamamos a /api/token/refresh/
      const { data } = await backend.post("token/refresh/", {
        refresh: refreshToken,
      });

      const newAccess = data.access;
      localStorage.setItem("access", newAccess);

      processQueue(null, newAccess);

      // Actualizamos el header de la request original y la repetimos
      originalRequest.headers.Authorization = `Bearer ${newAccess}`;
      return backend(originalRequest);
    } catch (err) {
      processQueue(err, null);
      // Refresh falló → limpiamos y redirigimos a login
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      window.location.href = "/login";
      return Promise.reject(err);
    } finally {
      isRefreshing = false;
    }
  }
);
    
/**
 * Función para ejecutar peticiones al backend
 * @param {string} url - endpoint (ej: "login/")
 * @param {string} typeMethod - método HTTP: GET, POST, PUT, PATCH, DELETE
 * @param {object} values - body para POST/PUT/PATCH
 */

export async function Api(url,typeMethod = 'GET', values = null) { //Funcion para ejecutar peticiones API
    try {
        let response;

        switch (typeMethod.toUpperCase()){ 
            case "GET":
                response = await backend.get(url)
                break;
                
            case "POST":
                response = await backend.post(url, values)
                break;
                
            case "PUT":
                response = await backend.put(url, values)
                break;

            case "DELETE":
                response = await backend.delete(url)
                break;

            default:
                throw new Error(`Metodo no soportado ${typeMethod}`);
        }
        return response.data
    } catch (error) {
        console.error("Error en API", error.response?.data || error);
        throw error;

    }
}