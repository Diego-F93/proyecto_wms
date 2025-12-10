import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";

export default function DashboardEjecutivo() {
  const [showDemoMsg, setShowDemoMsg] = useState(true);  // Mensaje temporal

  const valorChartRef = useRef(null);
  const rotacionChartRef = useRef(null);
  const valorChartInstance = useRef(null);
  const rotacionChartInstance = useRef(null);
  useEffect(() => {
    // Chart Valor Inventario
    if (valorChartRef.current) {
      const ctx = valorChartRef.current.getContext("2d");
      valorChartInstance.current = new Chart(ctx, {
        type: "pie",
        data: {
          labels: ["Electrónica", "Hogar", "Ropa", "Juguetes"],
          datasets: [
            {
              label: "Valor de Inventario",
              data: [550000, 320000, 210000, 120000],
              backgroundColor: ["#6366f1", "#38bdf8", "#34d399", "#f97316"],
              borderColor: "#f9fafb",
              borderWidth: 4,
              hoverOffset: 8,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: "bottom" },
          },
        },
      });
    }

    // Chart Rotación
    if (rotacionChartRef.current) {
      const ctx = rotacionChartRef.current.getContext("2d");
      rotacionChartInstance.current = new Chart(ctx, {
        type: "line",
        data: {
          labels: ["Abr", "May", "Jun", "Jul", "Ago", "Sep"],
          datasets: [
            {
              label: "Rotación de Inventario",
              data: [4.2, 4.0, 4.8, 5.1, 4.9, 4.5],
              borderColor: "#6366f1",
              backgroundColor: "rgba(99, 102, 241, 0.1)",
              fill: true,
              tension: 0.4,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: { beginAtZero: true },
          },
          plugins: {
            legend: { display: false },
          },
        },
      });
    }

    // Cleanup
    return () => {
      if (valorChartInstance.current) valorChartInstance.current.destroy();
      if (rotacionChartInstance.current) rotacionChartInstance.current.destroy();
    };
  }, []);

  const today = new Date().toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-8">
      {showDemoMsg && (
  <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="bg-white rounded-lg shadow-xl p-6 w-11/12 max-w-md relative border border-gray-200">
      
      {/* Botón cerrar */}
      <button
        onClick={() => setShowDemoMsg(false)}
        className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
      >
        ✕
      </button>

      <h3 className="text-lg font-semibold text-gray-800 mb-3">
        Información de Demostración
      </h3>

      <p className="text-gray-600 text-sm leading-relaxed">
        Los valores mostrados actualmente corresponden a datos de muestra.
        La integración con datos reales del sistema estará disponible en la
        siguiente etapa del proyecto.
      </p>
    </div>
  </div>
)}
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-2">
          <h2 className="text-2xl font-semibold text-gray-800">
            Dashboard Ejecutivo
          </h2>
          <p className="text-sm text-gray-500">Corte al {today}</p>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-5 rounded-lg border border-gray-200">
            <h3 className="text-sm font-medium text-gray-500">
              Valor Total del Inventario
            </h3>
            <p className="text-3xl font-bold text-gray-800 mt-1">$1.2M</p>
          </div>
          <div className="bg-white p-5 rounded-lg border border-gray-200">
            <h3 className="text-sm font-medium text-gray-500">
              Rotación de Inventario
            </h3>
            <p className="text-3xl font-bold text-gray-800 mt-1">4.5</p>
          </div>
          <div className="bg-white p-5 rounded-lg border border-gray-200">
            <h3 className="text-sm font-medium text-gray-500">
              Costo de Almacenamiento
            </h3>
            <p className="text-3xl font-bold text-gray-800 mt-1">$25K</p>
          </div>
          <div className="bg-white p-5 rounded-lg border border-gray-200">
            <h3 className="text-sm font-medium text-gray-500">
              Tasa de Exactitud
            </h3>
            <p className="text-3xl font-bold text-green-600 mt-1">99.2%</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="font-medium text-gray-700 mb-4">
              Valor del Inventario por Categoría
            </h3>
            <div className="h-80">
              <canvas ref={valorChartRef} />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="font-medium text-gray-700 mb-4">
              Tendencia de Rotación (Últimos 6 meses)
            </h3>
            <div className="h-80">
              <canvas ref={rotacionChartRef} />
            </div>
          </div>
        </div>

        {/* Tabla resumen */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="px-6 py-4">
            <h3 className="font-medium text-gray-700">
              Resumen Ejecutivo por Categoría
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th className="px-6 py-3 font-medium">Categoría</th>
                  <th className="px-6 py-3 font-medium">
                    Valor de Inventario
                  </th>
                  <th className="px-6 py-3 font-medium">Rotación</th>
                  <th className="px-6 py-3 font-medium">% del Total</th>
                  <th className="px-6 py-3 font-medium">Estado</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-t border-gray-200">
                  <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    Electrónica
                  </th>
                  <td className="px-6 py-4">$550K</td>
                  <td className="px-6 py-4">5.2</td>
                  <td className="px-6 py-4">45.8%</td>
                  <td className="px-6 py-4">
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      Saludable
                    </span>
                  </td>
                </tr>
                <tr className="bg-white border-t border-gray-200">
                  <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    Hogar
                  </th>
                  <td className="px-6 py-4">$320K</td>
                  <td className="px-6 py-4">3.8</td>
                  <td className="px-6 py-4">26.7%</td>
                  <td className="px-6 py-4">
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      Saludable
                    </span>
                  </td>
                </tr>
                <tr className="bg-white border-t border-gray-200">
                  <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    Ropa
                  </th>
                  <td className="px-6 py-4">$210K</td>
                  <td className="px-6 py-4">2.1</td>
                  <td className="px-6 py-4">17.5%</td>
                  <td className="px-6 py-4">
                    <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      Baja Rotación
                    </span>
                  </td>
                </tr>
                <tr className="bg-white border-t border-gray-200">
                  <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    Juguetes
                  </th>
                  <td className="px-6 py-4">$120K</td>
                  <td className="px-6 py-4">6.5</td>
                  <td className="px-6 py-4">10.0%</td>
                  <td className="px-6 py-4">
                    <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      Exceso de Stock
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
