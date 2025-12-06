import React, {useEffect, useState} from "react";
import { Api } from "../../utils/apiHelper";

export default function Producto() {

    const [datos, setDatos] = useState([])

    useEffect(() => {
        async function PobladoTabla() {
            const setDato = await Api("catalogo/productos/", "GET")
            console.log(setDato)
            setDatos(setDato)
        }
        PobladoTabla();
    }, [])

    
    return (
        <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-8">
                <div class="container mx-auto">
                    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                        <h2 class="text-2xl font-semibold text-gray-800">Catálogo de Productos</h2>
                        
                        <div class="w-full md:w-auto flex flex-col md:flex-row items-stretch md:items-center gap-4">
                             <div class="relative">
                                <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                </span>
                                <input type="search" placeholder="Buscar por SKU o nombre..." class="w-full md:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"></input>
                            </div>
                            <button class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center space-x-2">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                                <span>Agregar Producto</span>
                            </button>
                        </div>
                    </div>

                    <div class="bg-white rounded-lg border border-gray-200 overflow-hidden">
                        <div class="overflow-x-auto">
                            <table class="w-full text-sm text-left text-gray-500">
                                <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                                    <tr>
                                        <th scope="col" class="px-6 py-3 font-medium">SKU</th>
                                        <th scope="col" class="px-6 py-3 font-medium">Producto</th>
                                        <th scope="col" class="px-6 py-3 font-medium">Categoría</th>
                                        <th scope="col" class="px-6 py-3 font-medium">Stock Actual</th>
                                        <th scope="col" class="px-6 py-3 font-medium">Estado</th>
                                        <th scope="col" class="px-6 py-3 font-medium text-center">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { datos.map(m=> (
                                    <tr class="bg-white border-t border-gray-200 hover:bg-gray-50">
                                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{m.sku}</th>
                                        <td class="px-6 py-4">{m.nombre}</td>
                                        <td class="px-6 py-4">{m.categoria_nombre}</td>
                                        <td class="px-6 py-4 font-bold">{m.stock_actual}</td>
                                        <td class="px-6 py-4"><span className={`text-xs font-medium px-2.5 py-0.5 rounded-full`+
                                             (m.estado ? "bg-green-100 text-green-800"  // activo
                                                        : "bg-red-100 text-red-800"       // Inactivo
                                            ) }>{m.estado ? "Activo": "Inactivo"}</span></td>
                                        <td class="px-6 py-4 text-center">
                                            <button class="font-medium text-indigo-600 hover:underline mr-4">Editar</button>
                                            <button class="font-medium text-red-600 hover:underline">Desactivar</button>
                                        </td>
                                    </tr>)
                                        )
                                    }
                                    
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
    )
}