import React, { useEffect, useRef, useState } from "react";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export default function DashboardPrincipal() {
  const [showDemoMsg, setShowDemoMsg] = useState(true);

  const stockChartRef = useRef(null);
  const pedidosChartRef = useRef(null);
  const stockChartInstance = useRef(null);
  const pedidosChartInstance = useRef(null);

  useEffect(() => {
    // Fuente por defecto
    Chart.defaults.font.family = "'Inter', sans-serif";

    // Gráfico de Donut para Stock
    if (stockChartRef.current) {
      const ctx = stockChartRef.current.getContext("2d");
      stockChartInstance.current = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: [
            "Producto Bodega",
            "Producto Central",
            "Producto Sucursal",
            "Otros",
          ],
          datasets: [
            {
              label: "Stock por Ubicación",
              data: [3500, 2500, 4000, 2450],
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
          cutout: "80%",
          plugins: {
            legend: {
              position: "bottom",
              labels: {
                usePointStyle: true,
                pointStyle: "circle",
              },
            },
          },
        },
      });
    }

    // Gráfico de Barras para Pedidos
    if (pedidosChartRef.current) {
      const ctx = pedidosChartRef.current.getContext("2d");
      pedidosChartInstance.current = new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["Procesando", "En Espera", "Para Envío"],
          datasets: [
            {
              label: "Nº de Pedidos",
              data: [45, 15, 26],
              backgroundColor: "#60a5fa",
              borderRadius: 4,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                drawBorder: false,
              },
            },
            x: {
              grid: {
                display: false,
              },
            },
          },
          plugins: {
            legend: { display: false },
          },
        },
      });
    }

    // Cleanup
    return () => {
      if (stockChartInstance.current) stockChartInstance.current.destroy();
      if (pedidosChartInstance.current) pedidosChartInstance.current.destroy();
    };
  }, []);

  return (
    <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-8">
      {/* Overlay de aviso de datos de prueba */}
      {showDemoMsg && (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-11/12 max-w-md relative border border-gray-200">
            <button
              onClick={() => setShowDemoMsg(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Datos de Demostración
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Los valores mostrados en este dashboard corresponden
              actualmente a datos de prueba. La integración con datos
              reales del sistema se realizará en una etapa posterior del
              proyecto.
            </p>
          </div>
        </div>
      )}

      <div className="container mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Dashboard
        </h2>

        {/* Gráficos superiores */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="font-medium text-gray-700 mb-4">
              Resumen de Stock por Categoría
            </h3>
            <div className="h-64">
              <canvas ref={stockChartRef} />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="font-medium text-gray-700 mb-4">
              Estado de Pedidos Pendientes
            </h3>
            <div className="h-64">
              <canvas ref={pedidosChartRef} />
            </div>
          </div>
        </div>

        {/* Tarjetas KPI */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
          <div className="bg-white p-5 rounded-lg border border-gray-200">
            <h3 className="text-sm font-medium text-gray-500">Envíos Hoy</h3>
            <p className="text-3xl font-bold text-gray-800 mt-1">22</p>
          </div>
          <div className="bg-white p-5 rounded-lg border border-gray-200">
            <h3 className="text-sm font-medium text-gray-500">
              Alertas Activas
            </h3>
            <p className="text-3xl font-bold text-red-500 mt-1">3</p>
          </div>
        </div>

        {/* Tabla de movimientos */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="px-6 py-4">
            <h3 className="font-medium text-gray-700">
              Movimientos Recientes
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th className="px-6 py-3 font-medium">Producto</th>
                  <th className="px-6 py-3 font-medium">Tipo</th>
                  <th className="px-6 py-3 font-medium">Cantidad</th>
                  <th className="px-6 py-3 font-medium">Fecha</th>
                  <th className="px-6 py-3 font-medium">Usuario</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-t border-gray-200">
                  <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    SKU-00123
                  </th>
                  <td className="px-6 py-4">
                    <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">
                      Entrada
                    </span>
                  </td>
                  <td className="px-6 py-4">+ 200</td>
                  <td className="px-6 py-4">13/10/2025</td>
                  <td className="px-6 py-4">Ana Gómez</td>
                </tr>
                <tr className="bg-white border-t border-gray-200">
                  <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    SKU-00456
                  </th>
                  <td className="px-6 py-4">
                    <span className="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">
                      Salida
                    </span>
                  </td>
                  <td className="px-6 py-4">- 50</td>
                  <td className="px-6 py-4">13/10/2025</td>
                  <td className="px-6 py-4">Carlos Ruiz</td>
                </tr>
                <tr className="bg-white border-t border-gray-200">
                  <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    SKU-00789
                  </th>
                  <td className="px-6 py-4">
                    <span className="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">
                      Ajuste
                    </span>
                  </td>
                  <td className="px-6 py-4">- 5</td>
                  <td className="px-6 py-4">12/10/2025</td>
                  <td className="px-6 py-4">Sistema</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
