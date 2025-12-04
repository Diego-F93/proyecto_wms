import axios from 'axios'
import React, { useState } from 'react'

const backend = axios.create(   // Direccion base del Backend para peticiones API
    {
        baseURL : "http://127.0.0.1:8000/api/"    
    });

backend.interceptors.request.use((config) => { // Agregra el token de sesion al inicio de cada peticion de forma automatica
    const token = localStorage.getItem('access');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config
    });

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