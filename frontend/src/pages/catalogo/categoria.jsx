import React, { useEffect, useState} from "react"
import { Api } from "../../utils/apiHelper"

//Falta agregar funcionamientos de formulario de creacion de categorias
//Falta agregar funcionamiento de boton activar/desactivar

export default function Categoria() {
    const [datos, setDatos] = useState([])

    useEffect(() => {
        async function PobladoTabla() {
            const setDato = await Api("catalogo/categorias/", "GET")
            console.log(setDato)
            setDatos(setDato)
        }
        PobladoTabla();
    }, [])


    return (
        <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-8">
                <div class="container mx-auto">
                    <div class="flex justify-between items-center mb-6">
                        <h2 class="text-2xl font-semibold text-gray-800">Gestión de Categorías</h2>
                        <button class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg flex items-center space-x-2">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                            <span>Agregar Categoría</span>
                        </button>
                    </div>

                    <div class="bg-white rounded-lg border border-gray-200 overflow-hidden">
                        <div class="overflow-x-auto">
                            <table class="w-full text-sm text-left text-gray-500">
                                <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                                    <tr>
                                        <th scope="col" class="px-6 py-3 font-medium">Nombre de la Categoría</th>
                                        <th scope="col" class="px-6 py-3 font-medium">Cantidad de Productos</th>
                                        <th scope="col" class="px-6 py-3 font-medium">Estado</th>
                                        <th scope="col" class="px-6 py-3 font-medium text-center">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { datos.map(m=> (
                                    <tr class="bg-white border-t border-gray-200 hover:bg-gray-50">
                                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{m.nombre}</th>
                                        <td class="px-6 py-4">{m.productos_disponibles} Productos</td>
                                        <td class="px-6 py-4"><span class="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Activa</span></td>
                                        <td class="px-6 py-4 text-center">
                                            <button class="font-medium text-indigo-600 hover:underline mr-4" >Editar</button>
                                            <button class="font-medium text-red-600 hover:underline">Desactivar</button>
                                        </td>
                                    </tr>
                                    ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
    )
}