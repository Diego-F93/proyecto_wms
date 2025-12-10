import React, { useEffect, useState } from "react";
import { Api } from "../../utils/apiHelper";
import { useAuth } from "../../context/AuthContext";
import ProductoCrearModal from "../auxiliares/formProducto";

export default function Producto() {
  const { user } = useAuth();
  const [datos, setDatos] = useState([]); // productos tabla

  const [modalCrearOpen, setModalCrearOpen] = useState(false);
  const [modalEditarOpen, setModalEditarOpen] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  // Cargar productos
  const PobladoTabla = async () => {
    try {
      const setDato = await Api("catalogo/productos/", "GET");
      console.log(setDato);
      setDatos(setDato);
    } catch (error) {
      console.error("Error al cargar productos", error);
    }
  };

  useEffect(() => {
    PobladoTabla();
  }, []);

  const existingSkus = datos.map((p) => p.sku);

  //  Crear producto (POST)
  const crearProducto = async (data) => {
    try {
      await Api("catalogo/productos/", "POST", data);
      await PobladoTabla(); // refrescar tabla
    } catch (error) {
      console.error("Error al crear producto", error);
    }
  };

  //  Actualizar producto (PUT) usando SKU como lookup
  const actualizarProducto = async (data) => {
  try {
    await Api(
      `catalogo/productos/${productoSeleccionado.sku}/`,
      "PUT",
      data
    );
    await PobladoTabla();
  } catch (error) {
    console.error("Error al actualizar producto", error);
  }
};

  
  const eliminarProducto = async (m) => {
  try {
    await Api(
      `catalogo/productos/${m.sku}/`,
      "DELETE",
    );
    await PobladoTabla();
  } catch (error) {
    console.error("Error al actualizar producto", error);
  }
};


  const esAdminOSupervisor =
    user?.groups?.includes("Administrador") ||
    user?.groups?.includes("Supervisor");

  return (
    <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-8">
      <div className="container mx-auto">
        {/* Header + búsqueda + botón agregar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            Catálogo de Productos
          </h2>

          <div className="w-full md:w-auto flex flex-col md:flex-row items-stretch md:items-center gap-4">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </span>
              <input
                type="search"
                placeholder="Buscar por SKU o nombre..."
                className="w-full md:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Botón Agregar Producto */}
            <button
              type="button"
              onClick={() => {
                setProductoSeleccionado(null);
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
              <span>Agregar Producto</span>
            </button>
            
          </div>
        </div>

        {/* Tabla */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 font-medium">
                    SKU
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium">
                    Producto
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium">
                    Categoría
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium">
                    Precio Venta
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium">
                    Estado
                  </th>
                  {esAdminOSupervisor && (
                    <th
                      scope="col"
                      className="px-6 py-3 font-medium text-center"
                    >
                      Acciones
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {datos.map((m) => (
                  <tr
                    key={m.id}
                    className="bg-white border-t border-gray-200 hover:bg-gray-50"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {m.sku}
                    </th>
                    <td className="px-6 py-4">{m.nombre}</td>
                    <td className="px-6 py-4">
                      {m.categoria_nombre ?? m.categoria?.nombre ?? "-"}
                    </td>
                    <td className="px-6 py-4 font-bold">{m.precio_venta}</td>
                    <td className="px-6 py-4">
                      <span
                        className={
                          "text-xs font-medium px-2.5 py-0.5 rounded-full " +
                          (m.estado
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800")
                        }
                      >
                        {m.estado ? "Activo" : "Inactivo"}
                      </span>
                    </td>

                    {esAdminOSupervisor && (
                      <td className="px-6 py-4 text-center space-x-4">
                        <button
                          type="button"
                          className="font-medium text-indigo-600 hover:underline"
                          onClick={() => {
                            setProductoSeleccionado(m);
                            setModalEditarOpen(true);
                          }}
                        >
                          Editar
                        </button>
                        <button
                          type="button"
                          className={
                          "font-medium hover:underline" +
                          (m.estado
                            ? "bg-red-100 text-red-800"
                            : "bg-green-100 text-green-800")
                          }
                          onClick={() => {
                            eliminarProducto(m)
                          }}
                        >
                          {m.estado ? "Desactivar" : "Activar"}  
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal CREAR */}
        <ProductoCrearModal
          open={modalCrearOpen}
          onClose={() => setModalCrearOpen(false)}
          onSubmit={crearProducto}
          existingSkus={existingSkus}
          initialData={null}               /*  CLAVE: modo creación */
        />

        {/* Modal EDITAR */}
        <ProductoCrearModal
          open={modalEditarOpen}
          onClose={() => {
            setModalEditarOpen(false);
            setProductoSeleccionado(null);
          }}
          onSubmit={actualizarProducto}
          existingSkus={existingSkus}
          initialData={productoSeleccionado}  /*  CLAVE: modo edición */
        />
      </div>
    </main>
  );
}
