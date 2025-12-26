// src/components/inventario/MovimientoSalidaAjusteForm.jsx
import React, { useState, useEffect, useMemo } from "react";
import { Api } from "../../utils/apiHelper";

const MovimientoSalidaAjusteForm = ({ movementType }) => {
  // Cabecera
  const [documentRef, setDocumentRef] = useState("");
  const [motivoGeneral, setMotivoGeneral] = useState("");

  // Productos y lotes
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);

  // Map { sku: { loading: bool, items: [] } }
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

  // --- Helpers de límites ---
  const clampInt = (v, min, max) => {
    const n = Number(v);
    if (Number.isNaN(n)) return min;
    if (max != null && max >= min && n > max) return max;
    if (n < min) return min;
    return Math.trunc(n);
  };

  // --- Cargar productos ---
  const ObtenerProductos = async () => {
    try {
      setLoadingProducts(true);
      const data = await Api(`catalogo/productos/?stock_actual=gt:0`, "GET");
      setProducts(Array.isArray(data) ? data : []);
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

  const productsBySku = useMemo(() => {
    const m = new Map();
    (products || []).forEach((p) => m.set(String(p.sku), p));
    return m;
  }, [products]);

  const getProductName = (sku) => productsBySku.get(String(sku))?.nombre || "";

  const getLotesForSku = (sku) => (sku ? availableLotsBySku[sku]?.items || [] : []);

  const isLoadingLotesForSku = (sku) => Boolean(sku && availableLotsBySku[sku]?.loading);

  const getSelectedLote = (row) => {
    const lotes = getLotesForSku(row.sku);
    return lotes.find((l) => String(l.idLote) === String(row.loteId));
  };

  // Devuelve el máximo permitido según lote seleccionado
  const getMaxCantidadForRow = (row) => {
    const lote = getSelectedLote(row);
    const max = lote ? Number(lote.cantidad) : 0;
    // si lote tiene 0 o no hay lote, max 0 (bloquea)
    return Number.isFinite(max) && max > 0 ? max : 0;
  };

  // --- Cargar lotes por SKU (FIFO desde backend) ---
  const fetchLotesBySku = async (sku) => {
    if (!sku) return;
    if (availableLotsBySku[sku]?.items?.length || availableLotsBySku[sku]?.loading) return;

    try {
      setAvailableLotsBySku((prev) => ({
        ...prev,
        [sku]: { loading: true, items: prev[sku]?.items || [] },
      }));

      const data = await Api(`catalogo/lotes/?sku=${encodeURIComponent(sku)}`, "GET");

      setAvailableLotsBySku((prev) => ({
        ...prev,
        [sku]: { loading: false, items: Array.isArray(data) ? data : [] },
      }));
    } catch (error) {
      console.error(`Error al cargar lotes para SKU ${sku}`, error);
      setAvailableLotsBySku((prev) => ({
        ...prev,
        [sku]: { loading: false, items: [] },
      }));
    }
  };

  // --- Helpers filas ---
  const addRow = () => setRows((prev) => [...prev, { ...filaBase }]);

  const removeRow = (index) => setRows((prev) => prev.filter((_, i) => i !== index));

  const handleRowChange = (index, field, value) => {
    setRows((prev) =>
      prev.map((row, i) => {
        if (i !== index) return row;

        const updated = { ...row };

        if (field === "sku") {
          updated.sku = value;
          updated.loteId = "";
          updated.cantidad = 1;
          fetchLotesBySku(value);
        }

        if (field === "loteId") {
          updated.loteId = value;

          // ✅ CLAMP automático al cambiar lote
          // cuando seleccionas lote, ajusta cantidad a [1..stockLote]
          const lotes = getLotesForSku(updated.sku);
          const lote = lotes.find((l) => String(l.idLote) === String(value));
          const max = lote ? Number(lote.cantidad) : 0;

          if (!max || max <= 0) {
            updated.cantidad = 0; // sin stock, deja 0
          } else {
            updated.cantidad = clampInt(updated.cantidad || 1, 1, max);
          }
        }

        if (field === "cantidad") {
          // ✅ CLAMP en tiempo real al tipear
          const max = getMaxCantidadForRow(updated);
          if (!row.loteId || max === 0) {
            // si no hay lote, no permitimos >0 (obligas a elegir lote primero)
            updated.cantidad = 0;
          } else {
            updated.cantidad = clampInt(value, 1, max);
          }
        }

        if (!["sku", "loteId", "cantidad"].includes(field)) {
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

      const lote = getSelectedLote(row);
      const max = lote ? Number(lote.cantidad) : 0;

      if (!row.cantidad || Number(row.cantidad) <= 0) {
        setErrorMsg(`Fila ${i + 1}: la cantidad debe ser mayor que 0.`);
        return;
      }

      if (max && Number(row.cantidad) > max) {
        setErrorMsg(
          `Fila ${i + 1}: la cantidad (${row.cantidad}) no puede superar el stock del lote (${max}).`
        );
        return;
      }
    }

const payload = {
  tipo_operacion: mapping.tipo_operacion,
  tipo_movimiento: mapping.tipo_movimiento,

  documento_referencia: documentRef?.trim() ? documentRef.trim() : null,
  motivo_general: motivoGeneral?.trim() ? motivoGeneral.trim() : null,

  lotes: rows.map((row) => ({
    lote_id: Number(row.loteId),          
    cantidad: Number(row.cantidad),
    motivo: row.motivo?.trim() ? row.motivo.trim() : null,
  })),
};

    try {
      setLoading(true);
      const data = await Api("operacion/por-lote/", "POST", payload);

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

  // --- UI: Lote submenu (igual al rediseño, pero usa handleRowChange) ---
  const LoteDropdown = ({ row, index }) => {
    const sku = row.sku;
    const lotes = getLotesForSku(sku);
    const selectedLote = getSelectedLote(row);
    const loadingLotes = isLoadingLotesForSku(sku);

    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");

    const filtered = useMemo(() => {
      const q = query.trim().toLowerCase();
      if (!q) return lotes;
      return lotes.filter((l) => {
        const blob = `${l.idLote} ${l.n_serie || ""} ${l.cantidad} ${l.fechaVencimiento || ""}`.toLowerCase();
        return blob.includes(q);
      });
    }, [lotes, query]);

    useEffect(() => {
      setOpen(false);
      setQuery("");
    }, [sku]);

    const disabled = !sku || (lotes.length === 0 && !loadingLotes);

    return (
      <div className="relative">
        <button
          type="button"
          onClick={() => {
            if (!sku) return;
            if (!availableLotsBySku[sku]) fetchLotesBySku(sku);
            if (!disabled) setOpen((v) => !v);
          }}
          disabled={!sku}
          className={[
            "w-full rounded-md border px-3 py-2 text-left text-sm",
            "focus:outline-none focus:ring-2 focus:ring-indigo-500",
            !sku ? "bg-gray-100 text-gray-400 border-gray-200" : "bg-white border-gray-300",
          ].join(" ")}
        >
          <div className="flex items-center justify-between gap-2">
            <span className="truncate">
              {!sku
                ? "Selecciona un producto primero"
                : selectedLote
                ? `Lote ${selectedLote.idLote}${selectedLote.n_serie ? ` · Serie ${selectedLote.n_serie}` : ""}`
                : loadingLotes
                ? "Cargando lotes..."
                : disabled
                ? "Sin lotes disponibles"
                : "Seleccionar lote"}
            </span>
            <span className="text-gray-400">{open ? "▲" : "▼"}</span>
          </div>

          {selectedLote && (
            <div className="mt-1 flex flex-wrap gap-2 text-[11px] text-gray-500">
              <span className="rounded bg-gray-100 px-2 py-0.5">
                Stock: {selectedLote.cantidad}
              </span>
              <span className="rounded bg-gray-100 px-2 py-0.5">
                Vence: {selectedLote.fechaVencimiento || "—"}
              </span>
            </div>
          )}
        </button>

        {open && sku && (
          <div className="absolute z-20 mt-2 w-[26rem] max-w-[90vw] rounded-lg border border-gray-200 bg-white shadow-lg">
            <div className="p-3 border-b bg-gray-50 rounded-t-lg">
              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-gray-700 truncate">
                    Lotes disponibles (FIFO)
                  </p>
                  <p className="text-[11px] text-gray-500 truncate">
                    {sku} · {getProductName(sku)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="text-xs rounded-md border px-2 py-1 hover:bg-white bg-gray-50"
                >
                  Cerrar
                </button>
              </div>

              <div className="mt-2">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Buscar por id, serie, fecha..."
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="max-h-64 overflow-auto p-2">
              {loadingLotes ? (
                <div className="p-3 text-sm text-gray-500">Cargando lotes...</div>
              ) : filtered.length === 0 ? (
                <div className="p-3 text-sm text-gray-500">No hay resultados.</div>
              ) : (
                <ul className="space-y-2">
                  {filtered.map((l) => (
                    <li key={l.idLote}>
                      <button
                        type="button"
                        onClick={() => {
                          handleRowChange(index, "loteId", String(l.idLote));
                          setOpen(false);
                        }}
                        className={[
                          "w-full rounded-lg border px-3 py-2 text-left",
                          "hover:bg-indigo-50 hover:border-indigo-200",
                          String(row.loteId) === String(l.idLote)
                            ? "border-indigo-300 bg-indigo-50"
                            : "border-gray-200 bg-white",
                        ].join(" ")}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-gray-800 truncate">
                              Lote {l.idLote}
                              {l.n_serie ? (
                                <span className="text-gray-500 font-normal">
                                  {" "}
                                  · Serie {l.n_serie}
                                </span>
                              ) : null}
                            </p>
                            <p className="text-[11px] text-gray-500">
                              Vence: {l.fechaVencimiento || "—"}
                            </p>
                          </div>
                          <div className="shrink-0 text-right">
                            <p className="text-sm font-semibold text-gray-800">{l.cantidad}</p>
                            <p className="text-[11px] text-gray-500">Stock</p>
                          </div>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <section className="bg-white p-6 rounded-lg border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Formulario de {movementLabels[movementType] || "Movimiento"}
      </h3>

      {errorMsg && (
        <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-700">{errorMsg}</div>
      )}
      {successMsg && (
        <div className="mb-4 rounded-md bg-green-50 p-3 text-sm text-green-700">
          {successMsg}
        </div>
      )}

      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* CABECERA (se mantienen) */}
        <div className="space-y-4 border-b pb-4">
          <div>
            <label htmlFor="document" className="block text-sm font-medium text-gray-700">
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
            <label htmlFor="motivoGeneral" className="block text-sm font-medium text-gray-700">
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

        {/* LÍNEAS */}
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

          <div className="space-y-3">
            {rows.map((row, index) => {
              const selectedLote = getSelectedLote(row);
              const maxCantidad = getMaxCantidadForRow(row);
              const disabledQty = !row.loteId || maxCantidad === 0;

              return (
                <div key={index} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-gray-800">Línea #{index + 1}</p>
                      <p className="text-[11px] text-gray-500">
                        El máximo de cantidad se limita por el stock del lote (GET lotes).
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeRow(index)}
                      disabled={rows.length === 1}
                      className="text-xs text-red-600 hover:text-red-800 disabled:text-gray-300"
                    >
                      Eliminar
                    </button>
                  </div>

                  <div className="mt-4 grid grid-cols-1 md:grid-cols-12 gap-3">
                    {/* Producto */}
                    <div className="md:col-span-5">
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Producto
                      </label>
                      <select
                        value={row.sku}
                        onChange={(e) => handleRowChange(index, "sku", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        disabled={loadingProducts}
                      >
                        <option value="">
                          {loadingProducts ? "Cargando productos..." : "Seleccionar producto"}
                        </option>
                        {products.map((p) => (
                          <option key={p.sku} value={p.sku}>
                            {p.nombre}
                          </option>
                        ))}
                      </select>
                      {row.sku && (
                        <p className="mt-1 text-[11px] text-gray-500 truncate">
                          {row.sku} · {getProductName(row.sku)}
                        </p>
                      )}
                    </div>

                    {/* Lote submenu */}
                    <div className="md:col-span-4">
                      <label className="block text-xs font-medium text-gray-700 mb-1">Lote</label>
                      <LoteDropdown row={row} index={index} />
                    </div>

                    {/* Cantidad (limitada por lote) */}
                    <div className="md:col-span-3">
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Cantidad
                      </label>
                      <input
                        type="number"
                        min={row.loteId ? 1 : 0}
                        max={row.loteId ? maxCantidad : 0}
                        step={1}
                        value={row.cantidad}
                        onChange={(e) => handleRowChange(index, "cantidad", e.target.value)}
                        disabled={disabledQty}
                        className={[
                          "w-full px-3 py-2 border rounded-md text-right focus:outline-none focus:ring-2",
                          disabledQty ? "bg-gray-100 text-gray-400 border-gray-200" : "border-gray-300 focus:ring-indigo-500",
                        ].join(" ")}
                      />
                      <p className="mt-1 text-[11px] text-gray-500">
                        Máx (stock lote): {row.loteId ? maxCantidad || "—" : "Selecciona lote"}
                      </p>
                    </div>

                    {/* Motivo línea */}
                    <div className="md:col-span-12">
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Motivo (línea)
                      </label>
                      <input
                        type="text"
                        value={row.motivo}
                        onChange={(e) => handleRowChange(index, "motivo", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Opcional"
                      />
                    </div>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="text-[11px] rounded-full bg-gray-100 px-3 py-1 text-gray-600">
                      Lote: {selectedLote ? selectedLote.idLote : "—"}
                    </span>
                    <span className="text-[11px] rounded-full bg-gray-100 px-3 py-1 text-gray-600">
                      Stock: {selectedLote ? selectedLote.cantidad : "—"}
                    </span>
                    <span className="text-[11px] rounded-full bg-gray-100 px-3 py-1 text-gray-600">
                      Vence: {selectedLote?.fechaVencimiento || "—"}
                    </span>
                    <span className="text-[11px] rounded-full bg-gray-100 px-3 py-1 text-gray-600">
                      Serie: {selectedLote?.n_serie || "—"}
                    </span>
                  </div>
                </div>
              );
            })}
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
