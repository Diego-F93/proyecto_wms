import React, { useState, useEffect } from "react";
import { Api } from "../../utils/apiHelper";

const MovimientoIngresoForm  = ({ movementType }) => {
  // Datos cabecera
  const [documentRef, setDocumentRef] = useState("");
  const [motivoGeneral, setMotivoGeneral] = useState("");

  // Productos disponibles (SKU + nombre)
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);

  // Filas de lotes
  const filaBase = {
    sku: "",
    hasSerial: false,
    n_serie: "",
    cantidad: 1,
    motivo: "",
    precio_compra: "",
    tieneVencimiento: false,
    fechaVencimiento: "",
  };

  const [rows, setRows] = useState([filaBase]);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const movementLabels = {
    entrada: "Entrada",
    salida: "Salida",
    ajuste_pos: "Ajuste Positivo",
    ajuste_neg: "Ajuste Negativo",
  };

  // Mapeo a los tipos del backend
  const movementMapping = {
    entrada: { tipo_operacion: "ENTRADA", tipo_movimiento: "ENTRADA" },
    salida: { tipo_operacion: "SALIDA", tipo_movimiento: "SALIDA" },
    ajuste_pos: { tipo_operacion: "AJUSTE", tipo_movimiento: "AJUSTE_POST" },
    ajuste_neg: { tipo_operacion: "AJUSTE", tipo_movimiento: "AJUSTE_NEG" },
  };

  const isEntrada = movementType === "entrada";

  // --- Cargar productos vía Api helper ---
  const ObtenerProductos = async () => {
    try {
      setLoadingProducts(true);
      const data = await Api("catalogo/productos/", "GET");
      console.log("Productos:", data);
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

  // Limpiar mensajes cuando cambia el tipo de movimiento
  useEffect(() => {
    setErrorMsg("");
    setSuccessMsg("");
  }, [movementType]);

  // --- Helpers productos ---

  const getProductName = (sku) => {
    if (!sku) return "";
    const product = products.find((p) => p.sku === sku);
    return product ? product.nombre : "";
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

        if (field === "hasSerial") {
          const checked = value;
          updated.hasSerial = checked;
          if (checked) {
            updated.cantidad = 1;
          } else {
            updated.n_serie = "";
          }
        } else if (field === "cantidad") {
          const cant = Number(value) || 0;
          updated.cantidad = cant;
          if (cant > 1) {
            updated.hasSerial = false;
            updated.n_serie = "";
          }
        } else if (field === "n_serie") {
          updated.n_serie = value;
          if (value && value.trim() !== "") {
            updated.hasSerial = true;
            updated.cantidad = 1;
          } else {
            updated.hasSerial = false;
          }
        } else if (field === "sku") {
          updated.sku = value;
        } else if (field === "tieneVencimiento") {
          const checked = value;
          updated.tieneVencimiento = checked;
          if (!checked) {
            updated.fechaVencimiento = "";
          }
        } else if (field === "fechaVencimiento") {
          updated.fechaVencimiento = value;
        } else if (field === "precio_compra") {
          updated.precio_compra = value;
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

    const mapping = movementMapping[movementType];
    if (!mapping) {
      setErrorMsg("Tipo de movimiento no válido.");
      return;
    }

    if (rows.length === 0) {
      setErrorMsg("Debes agregar al menos un lote en la transacción.");
      return;
    }

    // Validación por fila
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];

      if (!row.sku || row.sku.trim() === "") {
        setErrorMsg(`Fila ${i + 1}: debes seleccionar un producto.`);
        return;
      }

      if (row.hasSerial) {
        if (!row.n_serie || row.n_serie.trim() === "") {
          setErrorMsg(
            `Fila ${i + 1}: si el lote tiene número de serie, debes ingresarlo.`
          );
          return;
        }
        if (Number(row.cantidad) !== 1) {
          setErrorMsg(
            `Fila ${i + 1}: para lotes con número de serie, la cantidad debe ser exactamente 1.`
          );
          return;
        }
      } else {
        if (!row.cantidad || Number(row.cantidad) <= 0) {
          setErrorMsg(
            `Fila ${i + 1}: la cantidad debe ser mayor que 0 si no tiene número de serie.`
          );
          return;
        }
      }

      // Validación de fecha de vencimiento cuando el checkbox está activo
      if (row.tieneVencimiento && !row.fechaVencimiento) {
        setErrorMsg(
          `Fila ${i + 1}: marcaste que tiene fecha de vencimiento, pero no ingresaste la fecha.`
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
        sku: row.sku.trim(),
        n_serie: row.hasSerial ? row.n_serie.trim() : null,
        cantidad: row.hasSerial ? 1 : Number(row.cantidad),
        motivo: row.motivo || null,
        // Solo mandamos fecha si el checkbox está activo y hay fecha
        fechaVencimiento:
          row.tieneVencimiento && row.fechaVencimiento
            ? row.fechaVencimiento
            : null,
        // Si viene vacío, mandamos null
        precio_compra:
          row.precio_compra !== "" ? Number(row.precio_compra) : null,
      })),
    };

    try {
      setLoading(true);

      const data = await Api("operacion/ingreso/", "POST", payload);
      console.log("Respuesta backend:", data);

      const codigo =
        data?.operacion?.codigo || data?.codigo || data?.id || "sin código";

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
              placeholder="Ej: OC-2025-10-123"
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
              placeholder="Ej: Ajuste por conteo físico"
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
              + Agregar lote
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
                    SKU
                  </th>
                  <th className="px-3 py-2 text-center font-medium text-gray-700">
                    Con N° Serie
                  </th>
                  <th className="px-3 py-2 text-left font-medium text-gray-700">
                    N° Serie
                  </th>
                  <th className="px-3 py-2 text-right font-medium text-gray-700">
                    Cantidad
                  </th>
                  {isEntrada && (
                    <>
                      <th className="px-3 py-2 text-right font-medium text-gray-700">
                        Precio compra
                      </th>
                      <th className="px-3 py-2 text-center font-medium text-gray-700">
                        Tiene vencimiento
                      </th>
                      <th className="px-3 py-2 text-left font-medium text-gray-700">
                        Fecha vencimiento
                      </th>
                    </>
                  )}
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
                      </td>

                      {/* SKU */}
                      <td className="px-3 py-2 align-top">
                        <input
                          type="text"
                          value={row.sku || ""}
                          readOnly
                          className="w-full px-2 py-1 border border-gray-200 rounded-md bg-gray-50 text-gray-700"
                          placeholder="SKU"
                        />
                        <p className="mt-1 text-[11px] text-gray-400">
                          {productName && row.sku
                            ? `${row.sku} · ${productName}`
                            : ""}
                        </p>
                      </td>

                      {/* Check N° serie */}
                      <td className="px-3 py-2 align-top text-center">
                        <input
                          type="checkbox"
                          checked={row.hasSerial}
                          onChange={(e) =>
                            handleRowChange(
                              index,
                              "hasSerial",
                              e.target.checked
                            )
                          }
                          className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                        />
                      </td>

                      {/* N° serie */}
                      <td className="px-3 py-2 align-top">
                        <input
                          type="text"
                          value={row.n_serie}
                          onChange={(e) =>
                            handleRowChange(index, "n_serie", e.target.value)
                          }
                          disabled={!row.hasSerial}
                          className={`w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-1 ${
                            row.hasSerial
                              ? "border-gray-300 focus:ring-indigo-500"
                              : "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
                          }`}
                          placeholder={
                            row.hasSerial ? "Ej: SN-0001" : "No aplica"
                          }
                        />
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
                          disabled={row.hasSerial}
                          className={`w-24 px-2 py-1 border rounded-md text-right focus:outline-none focus:ring-1 ${
                            row.hasSerial
                              ? "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
                              : "border-gray-300 focus:ring-indigo-500"
                          }`}
                        />
                      </td>

                      {/* SOLO EN ENTRADA: precio + vencimiento */}
                      {isEntrada && (
                        <>
                          {/* Precio compra */}
                          <td className="px-3 py-2 align-top text-right">
                            <input
                              type="number"
                              min="0"
                              step="0.01"
                              value={row.precio_compra}
                              onChange={(e) =>
                                handleRowChange(
                                  index,
                                  "precio_compra",
                                  e.target.value
                                )
                              }
                              className="w-28 px-2 py-1 border border-gray-300 rounded-md text-right focus:outline-none focus:ring-1 focus:ring-indigo-500"
                              placeholder="0.00"
                            />
                          </td>

                          {/* Checkbox tiene vencimiento */}
                          <td className="px-3 py-2 align-top text-center">
                            <input
                              type="checkbox"
                              checked={row.tieneVencimiento}
                              onChange={(e) =>
                                handleRowChange(
                                  index,
                                  "tieneVencimiento",
                                  e.target.checked
                                )
                              }
                              className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                            />
                          </td>

                          {/* Fecha vencimiento */}
                          <td className="px-3 py-2 align-top">
                            <input
                              type="date"
                              value={row.fechaVencimiento}
                              onChange={(e) =>
                                handleRowChange(
                                  index,
                                  "fechaVencimiento",
                                  e.target.value
                                )
                              }
                              disabled={!row.tieneVencimiento}
                              className={`w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-1 ${
                                row.tieneVencimiento
                                  ? "border-gray-300 focus:ring-indigo-500"
                                  : "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
                              }`}
                            />
                          </td>
                        </>
                      )}

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

export default MovimientoIngresoForm ;
