import React, { useEffect, useState } from "react";
import { Api } from "../../utils/apiHelper";
import CategoriaCrearModal from "../auxiliares/formCategoria";

export default function Categoria() {
  const [modalCrearOpen, setModalCrearOpen] = useState(false);
  const [modalEditarOpen, setModalEditarOpen] = useState(false);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);

  const [datos, setDatos] = useState([]);

  // Cargar categorías
  const PobladoTabla = async () => {
    try {
      const setDato = await Api("catalogo/categorias/", "GET");
      console.log("categorías: ", setDato);
      setDatos(setDato);
    } catch (error) {
      console.error("Error al cargar Categorías", error);
    }
  };

  useEffect(() => {
    PobladoTabla();
  }, []);

  // Crear categoría (POST)
  const crearCategoria = async (data) => {
    try {
      await Api("catalogo/categorias/", "POST", data);
      await PobladoTabla();
    } catch (error) {
      console.error("Error al crear Categoría", error);
    }
  };

  // Actualizar categoría (PUT) usando idCategoria
  const actualizarCategoria = async (data) => {
    try {
      const id =
        categoriaSeleccionada?.idCategoria ?? data.idCategoria;

      await Api(`catalogo/categorias/${id}/`, "PUT", data);
      await PobladoTabla();
    } catch (error) {
      console.error("Error al actualizar Categoría", error);
    }
  };

  // Activar / Desactivar categoría (DELETE → soft delete en backend)
  const eliminarCategoria = async (categoria) => {
    try {
      await Api(
        `catalogo/categorias/${categoria.idCategoria}/`,
        "DELETE"
      );
      await PobladoTabla();
    } catch (error) {
      console.error("Error al activar/desactivar Categoría", error);
    }
  };

  return (
    <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-8">
      <div className="container mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Gestión de Categorías
          </h2>
          <button
            type="button"
            onClick={() => {
              setCategoriaSeleccionada(null);
              setModalCrearOpen(true);
            }}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center space-x-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              ></path>
            </svg>
            <span>Agregar Categoría</span>
          </button>
        </div>

        {/* Tabla */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 font-medium">
                    Nombre de la Categoría
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium">
                    Cantidad de Productos
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium">
                    Estado
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 font-medium text-center"
                  >
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {datos.map((m) => (
                  <tr
                    key={m.idCategoria}
                    className="bg-white border-t border-gray-200 hover:bg-gray-50"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {m.nombre}
                    </th>
                    <td className="px-6 py-4">
                      {m.productos_disponibles} Productos
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={
                          "text-xs font-medium px-2.5 py-0.5 rounded-full " +
                          (m.estado
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800")
                        }
                      >
                        {m.estado ? "Activa" : "Inactiva"}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-center space-x-4">
                      <button
                        type="button"
                        className="font-medium text-indigo-600 hover:underline"
                        onClick={() => {
                          setCategoriaSeleccionada(m);
                          setModalEditarOpen(true);
                        }}
                      >
                        Editar
                      </button>

                      <button
                        type="button"
                        className={
                          "font-medium px-3 py-1 rounded hover:underline " +
                          (m.estado
                            ? "text-red-600"
                            : "text-green-600")
                        }
                        onClick={() => eliminarCategoria(m)}
                      >
                        {m.estado ? "Desactivar" : "Activar"}
                      </button>
                    </td>
                  </tr>
                ))}

                {datos.length === 0 && (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      No hay categorías registradas.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal CREAR */}
      <CategoriaCrearModal
        open={modalCrearOpen}
        onClose={() => setModalCrearOpen(false)}
        onSubmit={crearCategoria}
        initialData={null} // modo creación
      />

      {/* Modal EDITAR */}
      <CategoriaCrearModal
        open={modalEditarOpen}
        onClose={() => {
          setModalEditarOpen(false);
          setCategoriaSeleccionada(null);
        }}
        onSubmit={actualizarCategoria}
        initialData={categoriaSeleccionada} // modo edición
      />
    </main>
  );
}
