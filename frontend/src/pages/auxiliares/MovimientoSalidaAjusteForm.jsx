// src/components/inventario/MovimientoSalidaAjusteForm.jsx
import React, { useState, useEffect } from "react";
import { Api } from "../../utils/apiHelper";

const MovimientoSalidaAjusteForm = ({ movementType }) => {
  // Cabecera
  const [documentRef, setDocumentRef] = useState("");
  const [motivoGeneral, setMotivoGeneral] = useState("");

  // Productos y lotes
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);

  // Map { sku: [lotes...] }
  const [availableLotsBySku, setAvailableLotsBySku] = useState({});

  const filaBase = {
    sku: "",
    loteId: "",
    cantidad: 1,
    motivo: "",
  };

  const [rows, setRows] = useState([filaBase]);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const movementLabels = {
    salida: "Salida",
    ajuste_pos: "Ajuste Positivo",
    ajuste_neg: "Ajuste Negativo",
  };

  // Mapeo a los tipos del backend
  const movementMapping = {
    salida: { tipo_operacion: "SALIDA", tipo_movimiento: "SALIDA" },
    ajuste_pos: { tipo_operacion: "AJUSTE", tipo_movimiento: "AJUSTE_POST" },
    ajuste_neg: { tipo_operacion: "AJUSTE", tipo_movimiento: "AJUSTE_NEG" },
  };

  const mapping = movementMapping[movementType];

  // --- Cargar productos ---
  const ObtenerProductos = async () => {
    try {
      setLoadingProducts(true);
      const data = await Api("catalogo/productos/", "GET");
      setProducts(data);
    } catch (error) {
      console.error("Error al cargar productos", error);
    } finally {
      setLoadingProducts(false);
    }
  };

  useEffect(() => {
    ObtenerProductos();
  }, []);

  useEffect(() => {
    setErrorMsg("");
    setSuccessMsg("");
  }, [movementType]);

  const getProductName = (sku) => {
    if (!sku) return "";
    const p = products.find((prod) => prod.sku === sku);
    return p ? p.nombre : "";
  };

  const getLotesForSku = (sku) => {
    if (!sku) return [];
    return availableLotsBySku[sku] || [];
  };

  const getSelectedLote = (row) => {
    const lotes = getLotesForSku(row.sku);
    return lotes.find((l) => String(l.idLote) === String(row.loteId));
  };

  // --- Cargar lotes por SKU (FIFO desde backend) ---
  const fetchLotesBySku = async (sku) => {
    if (!sku) return;
    // Cache simple: si ya tenemos los lotes, no volvemos a pedir
    if (availableLotsBySku[sku]) return;

    try {
      const data = await Api(
        `inventario/lotes-disponibles/?sku=${encodeURIComponent(sku)}`,
        "GET"
      );
      // Se asume que el backend ya los ordena por FIFO (fechaEntrada ascendente)
      setAvailableLotsBySku((prev) => ({ ...prev, [sku]: data }));
    } catch (error) {
      console.error(`Error al cargar lotes para SKU ${sku}`, error);
    }
  };

  // --- Helpers filas ---
  const addRow = () => {
    setRows((prev) => [...prev, { ...filaBase }]);
  };

  const removeRow = (index) => {
    setRows((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRowChange = (index, field, value) => {
    setRows((prev) =>
      prev.map((row, i) => {
        if (i !== index) return row;
        const updated = { ...row };

        if (field === "sku") {
          updated.sku = value;
          updated.loteId = "";
          updated.cantidad = 1;
          // disparamos carga de lotes disponibles
          fetchLotesBySku(value);
        } else if (field === "loteId") {
          updated.loteId = value;
          // opcional: podrías ajustar cantidad por defecto al máximo disponible
        } else if (field === "cantidad") {
          updated.cantidad = Number(value) || 0;
        } else {
          updated[field] = value;
        }

        return updated;
      })
    );
  };

  // --- Submit ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!mapping) {
      setErrorMsg("Tipo de movimiento no válido para este formulario.");
      return;
    }

    if (rows.length === 0) {
      setErrorMsg("Debes agregar al menos un lote en la transacción.");
      return;
    }

    // Validaciones
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];

      if (!row.sku || row.sku.trim() === "") {
        setErrorMsg(`Fila ${i + 1}: debes seleccionar un producto.`);
        return;
      }

      if (!row.loteId) {
        setErrorMsg(`Fila ${i + 1}: debes seleccionar un lote.`);
        return;
      }

      if (!row.cantidad || Number(row.cantidad) <= 0) {
        setErrorMsg(
          `Fila ${i + 1}: la cantidad debe ser mayor que 0 para la salida/ajuste.`
        );
        return;
      }

      const lote = getSelectedLote(row);
      if (lote && Number(row.cantidad) > Number(lote.cantidad)) {
        setErrorMsg(
          `Fila ${i + 1}: la cantidad (${row.cantidad}) no puede superar el stock disponible del lote (${lote.cantidad}).`
        );
        return;
      }
    }

    const payload = {
      tipo_operacion: mapping.tipo_operacion,
      tipo_movimiento: mapping.tipo_movimiento,
      documento_referencia: documentRef || null,
      motivo_general: motivoGeneral || null,
      lotes: rows.map((row) => ({
        lote_id: row.loteId, // IMPORTANTE: el backend debe usar este id de lote
        cantidad: Number(row.cantidad),
        motivo: row.motivo || null,
      })),
    };

    try {
      setLoading(true);

      // Ajusta la URL al endpoint real de tu backend para salidas/ajustes
      const data = await Api("operacion/movimiento/", "POST", payload);
      console.log("Respuesta backend (salida/ajuste):", data);

      const codigo = data?.codigo || data?.id || "sin código";

      setSuccessMsg(
        `Operación ${codigo} (${movementLabels[movementType]}) registrada correctamente.`
      );

      setRows([{ ...filaBase }]);
    } catch (err) {
      console.error(err);
      const detalle =
        err?.response?.data?.detail ||
        err?.message ||
        "Error al registrar el movimiento de inventario.";
      setErrorMsg(detalle);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setDocumentRef("");
    setMotivoGeneral("");
    setRows([{ ...filaBase }]);
    setErrorMsg("");
    setSuccessMsg("");
  };

  return (
    <section className="bg-white p-6 rounded-lg border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Formulario de {movementLabels[movementType] || "Movimiento"}
      </h3>

      {errorMsg && (
        <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-700">
          {errorMsg}
        </div>
      )}
      {successMsg && (
        <div className="mb-4 rounded-md bg-green-50 p-3 text-sm text-green-700">
          {successMsg}
        </div>
      )}

      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* CABECERA */}
        <div className="space-y-4 border-b pb-4">
          <div>
            <label
              htmlFor="document"
              className="block text-sm font-medium text-gray-700"
            >
              Documento de Referencia
            </label>
            <input
              type="text"
              name="document"
              id="document"
              value={documentRef}
              onChange={(e) => setDocumentRef(e.target.value)}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Ej: GD-2025-10-001"
            />
          </div>

          <div>
            <label
              htmlFor="motivoGeneral"
              className="block text-sm font-medium text-gray-700"
            >
              Motivo General de la Operación
            </label>
            <input
              type="text"
              name="motivoGeneral"
              id="motivoGeneral"
              value={motivoGeneral}
              onChange={(e) => setMotivoGeneral(e.target.value)}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Ej: Despacho a cliente / Ajuste por merma"
            />
          </div>
        </div>

        {/* TABLA DE LOTES */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold text-gray-700">
              Lotes implicados en la transacción
            </h4>
            <button
              type="button"
              onClick={addRow}
              className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md border border-indigo-600 text-indigo-600 hover:bg-indigo-50"
            >
              + Agregar línea
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-2 text-left font-medium text-gray-700">
                    Producto
                  </th>
                  <th className="px-3 py-2 text-left font-medium text-gray-700">
                    Lote
                  </th>
                  <th className="px-3 py-2 text-right font-medium text-gray-700">
                    Stock lote
                  </th>
                  <th className="px-3 py-2 text-left font-medium text-gray-700">
                    Fec. vencimiento
                  </th>
                  <th className="px-3 py-2 text-right font-medium text-gray-700">
                    Cantidad
                  </th>
                  <th className="px-3 py-2 text-left font-medium text-gray-700">
                    Motivo (línea)
                  </th>
                  <th className="px-3 py-2 text-center font-medium text-gray-700">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {rows.map((row, index) => {
                  const productName = getProductName(row.sku);
                  const lotes = getLotesForSku(row.sku);
                  const selectedLote = getSelectedLote(row);

                  return (
                    <tr key={index}>
                      {/* Producto */}
                      <td className="px-3 py-2 align-top">
                        <select
                          value={row.sku}
                          onChange={(e) =>
                            handleRowChange(index, "sku", e.target.value)
                          }
                          className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          disabled={loadingProducts}
                        >
                          <option value="">
                            {loadingProducts
                              ? "Cargando productos..."
                              : "Seleccionar producto"}
                          </option>
                          {products.map((p) => (
                            <option key={p.sku} value={p.sku}>
                              {p.nombre}
                            </option>
                          ))}
                        </select>
                        {productName && (
                          <p className="mt-1 text-[11px] text-gray-400">
                            {row.sku} · {productName}
                          </p>
                        )}
                      </td>

                      {/* Lote */}
                      <td className="px-3 py-2 align-top">
                        <select
                          value={row.loteId}
                          onChange={(e) =>
                            handleRowChange(index, "loteId", e.target.value)
                          }
                          disabled={!row.sku || lotes.length === 0}
                          className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:bg-gray-100 disabled:text-gray-400"
                        >
                          <option value="">
                            {row.sku
                              ? lotes.length > 0
                                ? "Seleccionar lote"
                                : "Sin lotes disponibles"
                              : "Selecciona un producto primero"}
                          </option>
                          {lotes.map((l) => (
                            <option key={l.idLote} value={l.idLote}>
                              {`Lote ${l.idLote} · ${
                                l.n_serie ? `Serie ${l.n_serie} · ` : ""
                              }Cant: ${l.cantidad}`}
                            </option>
                          ))}
                        </select>
                      </td>

                      {/* Stock del lote */}
                      <td className="px-3 py-2 align-top text-right">
                        <span className="inline-block min-w-[3rem]">
                          {selectedLote ? selectedLote.cantidad : "-"}
                        </span>
                      </td>

                      {/* Fecha de vencimiento */}
                      <td className="px-3 py-2 align-top">
                        <span className="text-xs text-gray-600">
                          {selectedLote && selectedLote.fechaVencimiento
                            ? selectedLote.fechaVencimiento
                            : "—"}
                        </span>
                      </td>

                      {/* Cantidad */}
                      <td className="px-3 py-2 align-top text-right">
                        <input
                          type="number"
                          min="1"
                          value={row.cantidad}
                          onChange={(e) =>
                            handleRowChange(index, "cantidad", e.target.value)
                          }
                          className="w-24 px-2 py-1 border rounded-md text-right focus:outline-none focus:ring-1 border-gray-300 focus:ring-indigo-500"
                        />
                      </td>

                      {/* Motivo línea */}
                      <td className="px-3 py-2 align-top">
                        <input
                          type="text"
                          value={row.motivo}
                          onChange={(e) =>
                            handleRowChange(index, "motivo", e.target.value)
                          }
                          className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          placeholder="Opcional"
                        />
                      </td>

                      {/* Acciones */}
                      <td className="px-3 py-2 align-top text-center">
                        <button
                          type="button"
                          onClick={() => removeRow(index)}
                          disabled={rows.length === 1}
                          className="text-xs text-red-600 hover:text-red-800 disabled:text-gray-300"
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Botones */}
        <div className="flex justify-end space-x-4 pt-4">
          <button
            type="button"
            onClick={handleReset}
            className="bg-gray-200 text-gray-700 font-bold py-2 px-6 rounded-lg hover:bg-gray-300"
            disabled={loading}
          >
            Limpiar
          </button>
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Registrando..." : "Registrar Movimiento"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default MovimientoSalidaAjusteForm;
