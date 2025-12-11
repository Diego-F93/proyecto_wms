import React, { useState } from "react";
import MovimientoForm from "../auxiliares/formMovimiento";

const OperacionInventario = () => {
  const [movementType, setMovementType] = useState("entrada");

  const movementLabels = {
    entrada: "Entrada",
    salida: "Salida",
    ajuste_pos: "Ajuste Positivo",
    ajuste_neg: "Ajuste Negativo",
  };

  return (
    <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-8">
      <div className="container mx-auto space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Registrar Movimiento de Inventario
        </h2>

        {/* Selector de tipo de movimiento */}
        <section className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="grid gap-4 md:grid-cols-2 items-end">
            <div>
              <label
                htmlFor="movementType"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Tipo de Movimiento
              </label>
              <select
                id="movementType"
                name="movementType"
                value={movementType}
                onChange={(e) => setMovementType(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 sm:text-sm rounded-lg"
              >
                <option value="entrada">Entrada</option>
                <option value="salida">Salida</option>
                <option value="ajuste_pos">Ajuste Positivo (+)</option>
                <option value="ajuste_neg">Ajuste Negativo (–)</option>
              </select>
            </div>

            <div className="text-sm text-gray-600 md:text-right">
              <p>
                <span className="font-semibold">Seleccionado:</span>{" "}
                {movementLabels[movementType]}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                El formulario inferior se adapta según el tipo de movimiento
                seleccionado.
              </p>
            </div>
          </div>
        </section>

        {/* Formulario dinámico según movementType */}
        <MovimientoForm movementType={movementType} />
      </div>
    </main>
  );
};

export default OperacionInventario;
