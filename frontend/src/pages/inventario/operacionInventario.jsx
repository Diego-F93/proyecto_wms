import React, { useState } from "react";
import MovimientoIngresoForm from "../auxiliares/MovimientoIngresoForm";
import MovimientoSalidaAjusteForm from "../auxiliares/MovimientoSalidaAjusteForm";

const MovimientoInventarioPage = () => {
  const [movementType, setMovementType] = useState("entrada"); 
  // 'entrada' | 'salida' | 'ajuste_pos' | 'ajuste_neg'

  return (
    <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-8">
      <div className="container mx-auto space-y-6">
        <div className="bg-white p-4 rounded-lg border border-gray-200 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
              Registrar Movimiento de Inventario
            </h2>
            <p className="text-sm text-gray-500">
              Selecciona el tipo de movimiento y completa el formulario.
            </p>
          </div>

          <div className="w-full md:w-64">
            <label
              htmlFor="movementType"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Tipo de Movimiento
            </label>
            <select
              id="movementType"
              value={movementType}
              onChange={(e) => setMovementType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="entrada">Entrada</option>
              <option value="salida">Salida</option>
              <option value="ajuste_pos">Ajuste Positivo</option>
              <option value="ajuste_neg">Ajuste Negativo</option>
            </select>
          </div>
        </div>

        {/* Aquí separamos formularios según el tipo */}
        {movementType === "entrada" ? (
          <MovimientoIngresoForm movementType="entrada" />
        ) : (
          <MovimientoSalidaAjusteForm movementType={movementType} />
        )}
      </div>
    </main>
  );
};

export default MovimientoInventarioPage;
