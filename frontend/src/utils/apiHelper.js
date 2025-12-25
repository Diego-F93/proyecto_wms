import axios from 'axios'
import React, { useState } from 'react'
import Swal from 'sweetalert2';

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
    const method = typeMethod.toUpperCase();
    const sensibleMethods = ["POST","PUT", "PATCH", "DELETE"];

    if (sensibleMethods.includes(method)) {
        const result = await Swal.fire({
            title: '¿Confirmar acción?',
            text: method === "DELETE" ? "¿Esta seguro de realizar esta operacion?" : "Se modificarán los datos actuales.",
            icon: method === "DELETE" ? 'warning' : 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, continuar',
            cancelButtonText: 'Cancelar'
        });

        // Si el usuario cierra el modal o hace clic en cancelar
        if (!result.isConfirmed) {
            return { cancelled: true };
        }
    }

    try {
        // Ejecución normal de la petición
        const config = { method, url, data: values };
        const response = await backend(config);
        
        // Opcional: Mostrar éxito después de la petición
        if (sensibleMethods.includes(method)) {
            Swal.fire('¡Éxito!', 'La operación se realizó correctamente.', 'success');
        }

        return response.data;
    } catch (error) {
        Swal.fire('Error', 'No se pudo completar la operación.', 'error');
        throw error;
    }
}