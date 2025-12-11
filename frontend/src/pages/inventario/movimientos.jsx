// src/pages/inventario/HistorialMovimientos.jsx
import React, { useEffect, useState } from "react";
import { Api } from "../../utils/apiHelper";

const ENDPOINT_MOVIMIENTOS = "/inventario/movimientos/"; 
// Ajusta esto si tu endpoint es distinto, por ejemplo: "/movimientos/"

function getTipoBadge(tipo) {
  const baseClasses =
    "text-xs font-medium px-2.5 py-0.5 rounded-full";

  switch (tipo) {
    case "entrada":
      return (
        <span className={`${baseClasses} bg-green-100 text-green-800`}>
          Entrada
        </span>
      );
    case "salida":
      return (
        <span className={`${baseClasses} bg-red-100 text-red-800`}>
          Salida
        </span>
      );
    case "ajuste":
      return (
        <span className={`${baseClasses} bg-yellow-100 text-yellow-800`}>
          Ajuste
        </span>
      );
    case "transferencia":
      return (
        <span className={`${baseClasses} bg-blue-100 text-blue-800`}>
          Transferencia
        </span>
      );
    default:
      return (
        <span className={`${baseClasses} bg-gray-100 text-gray-800`}>
          {tipo || "N/D"}
        </span>
      );
  }
}

function formatCantidad(tipo, cantidad) {
  if (cantidad == null) return "-";
  const value = Number(cantidad);

  if (tipo === "entrada") return `+ ${value}`;
  if (tipo === "salida") return `- ${value}`;
  if (tipo === "ajuste" || tipo === "transferencia") return value;
  return value;
}

function formatFechaHora(fechaISO) {
  if (!fechaISO) return "-";
  const date = new Date(fechaISO);
  if (Number.isNaN(date.getTime())) return fechaISO;

  return date.toLocaleString("es-CL", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const HistorialMovimientos = () => {
  const [movimientos, setMovimientos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Filtros
  const [sku, setSku] = useState("");
  const [tipo, setTipo] = useState("");
  const [fecha, setFecha] = useState("");



  const fetchMovimientos = async () => {
      try {
        setLoading(true);
        const data = await Api("operacion/lista/", "GET");
        setMovimientos(data);
      } catch (error) {
        console.error("Error al cargar productos", error);
      } finally {
        setLoading(false);
      }
    }

  useEffect(() => {
    // Carga inicial sin filtros
    fetchMovimientos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFiltrar = (e) => {
    e.preventDefault();
    fetchMovimientos();
  };

  return (
    <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-8">
      <div className="container mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Historial de Movimientos de Inventario
        </h2>

        {/* Filtros */}
        <form
          className="bg-white p-4 rounded-lg border border-gray-200 mb-6"
          onSubmit={handleFiltrar}
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="search"
              placeholder="Buscar por SKU..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={sku}
              onChange={(e) => setSku(e.target.value)}
            />
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
            >
              <option value="">Todos los Tipos</option>
              <option value="entrada">Entrada</option>
              <option value="salida">Salida</option>
              <option value="ajuste">Ajuste</option>
              <option value="transferencia">Transferencia</option>
            </select>
            <input
              type="date"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
            />
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg"
            >
              Filtrar
            </button>
          </div>
        </form>

        {/* Tabla */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          {loading && (
            <div className="p-4 text-sm text-gray-500">Cargando datos...</div>
          )}

          {error && !loading && (
            <div className="p-4 text-sm text-red-600">{error}</div>
          )}

          {!loading && !error && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 font-medium"
                    >
                      ID Transacción
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 font-medium"
                    >
                      Producto (SKU)
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 font-medium"
                    >
                      Tipo
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 font-medium"
                    >
                      Cantidad
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 font-medium"
                    >
                      Fecha y Hora
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 font-medium"
                    >
                      Usuario
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 font-medium"
                    >
                      Documento
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {movimientos.length === 0 && (
                    <tr className="bg-white border-t border-gray-200">
                      <td
                        colSpan={7}
                        className="px-6 py-4 text-center text-gray-400"
                      >
                        No se encontraron movimientos con los filtros
                        seleccionados.
                      </td>
                    </tr>
                  )}

                  {movimientos.map((mov) => (
                    <tr
                      key={mov.id || mov.codigo || mov.numero}
                      className="bg-white border-t border-gray-200"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                      >
                        {mov.codigo || mov.id || "N/D"}
                      </th>
                      <td className="px-6 py-4">
                        {mov.producto_sku || mov.sku || "N/D"}
                      </td>
                      <td className="px-6 py-4">
                        {getTipoBadge(mov.tipo)}
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-800">
                        {formatCantidad(mov.tipo, mov.cantidad)}
                      </td>
                      <td className="px-6 py-4">
                        {formatFechaHora(
                          mov.fecha_hora ||
                            mov.fecha ||
                            mov.created_at
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {mov.usuario_nombre ||
                          mov.usuario ||
                          mov.user ||
                          "N/D"}
                      </td>
                      <td className="px-6 py-4">
                        {mov.documento_referencia ||
                        mov.documento ||
                        mov.referencia ? (
                          <a
                            href="#"
                            className="text-indigo-600 hover:underline"
                          >
                            {mov.documento_referencia ||
                              mov.documento ||
                              mov.referencia}
                          </a>
                        ) : (
                          "-"
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default HistorialMovimientos;
