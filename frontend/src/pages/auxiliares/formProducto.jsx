import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Api } from "../../utils/apiHelper";
import Modal from "./Modal";

function generarSkuSugerido(categoria, nombre, existingSkus = []) {
  const normalizar = (str) =>
    (str || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^A-Za-z0-9]/g, "")
      .toUpperCase();

  const catPart = normalizar(categoria).slice(0, 3);
  const prodPart = normalizar(nombre).slice(0, 5);

  const base = `${catPart}-${prodPart}`;
  let index = 0;
  let candidate = `${base}-00`;

  while (existingSkus.includes(candidate)) {
    index++;
    candidate = `${base}-${String(index).padStart(2, "0")}`;
  }

  return candidate;
}


export default function ProductoCrearModal({ open, onClose, onSubmit, existingSkus = [] }) {
  const [form, setForm] = useState({
    categoria_nombre: "",
    descripcion: "",
    estado: "",
    nombre: "",
    precio_venta: "",
    sku: "",
  });

  const [nombreCategoria, setNombreCategoria] = useState([]); // para poblar select
  const [errors, setErrors] = useState({}); // estado para errores

  const { user } = useAuth(); // para validar permisos de usuario

  useEffect(() => {
    async function categorias() {
      const setDato = await Api("catalogo/categorias/", "GET");
      console.log("categorias", setDato);
      setNombreCategoria(setDato);
    }
    if (open) {
      categorias();
    }
  }, [open]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const puedeCambiarEstado =
    user?.groups?.includes("Administrador") ||
    user?.groups?.includes("Supervisor");

  const validar = () => {
    const newErrors = {};

    // validar categoría (que exista en la lista)
    const categoriaValida = nombreCategoria.some(
      (cat) => cat.nombre === form.categoria_nombre
    );

    if (!form.categoria_nombre) {
      newErrors.categoria_nombre = "La categoría es obligatoria.";
    } else if (!categoriaValida) {
      newErrors.categoria_nombre = "Debe seleccionar una categoría válida.";
    }

    // validar nombre
    if (!form.nombre.trim()) {
      newErrors.nombre = "El nombre es obligatorio.";
    }

    // validar precio POSITIVO
    const precio = Number(form.precio_venta);

    if (!form.precio_venta) {
      newErrors.precio_venta = "El precio es obligatorio.";
    } else if (isNaN(precio)) {
      newErrors.precio_venta = "El precio debe ser numérico.";
    } else if (precio <= 0) {
      newErrors.precio_venta = "El precio debe ser mayor a 0.";
    }

    // validar estado SOLO si el usuario puede verlo/cambiarlo
    if (puedeCambiarEstado && !form.estado) {
      newErrors.estado = "Debe seleccionar un estado.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  if (!validar()) return;

  let skuFinal = form.sku.trim()
    ? form.sku
    : generarSkuSugerido(form.categoria_nombre, form.nombre, existingSkus);

  onSubmit({
    ...form,
    precio_venta: Number(form.precio_venta),
    sku: skuFinal,
  });

  onClose();
};
  useEffect(() => {
  // solo generar SKU si el usuario NO ingresó uno manualmente
  if (!form.sku.trim()) {
    const sugerido = generarSkuSugerido(
      form.categoria_nombre,
      form.nombre,
      existingSkus
    );
    setForm((prev) => ({
      ...prev,
      sku: sugerido,
    }));
  }
}, [form.categoria_nombre, form.nombre, existingSkus]);
  

  return (
    <Modal open={open} onClose={onClose}>
      <h2 className="text-xl font-bold mb-4">Crear Producto</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* NOMBRE */}
        <div>
          <label className="block font-medium">Nombre</label>
          <input
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {errors.nombre && (
            <p className="text-red-600 text-sm mt-1">{errors.nombre}</p>
          )}
        </div>

        {/* CATEGORÍA */}
        <div>
          <label className="block font-medium">Categoría</label>
          <select
            name="categoria_nombre"
            value={form.categoria_nombre}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Seleccione una categoría...</option>
            {nombreCategoria.map((cat) => (
              <option key={cat.id} value={cat.nombre}>
                {cat.nombre}
              </option>
            ))}
          </select>
          {errors.categoria_nombre && (
            <p className="text-red-600 text-sm mt-1">
              {errors.categoria_nombre}
            </p>
          )}
        </div>

        {/* SKU (por ahora obligatorio, luego lo hacemos opcional/autogenerado) */}
        <div>
        <label className="block font-medium">
            SKU <span className="text-gray-500 text-sm">(opcional)</span>
        </label>
        <input
            type="text"
            name="sku"
            value={form.sku}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Se autogenerará si lo deja vacío"
        />
        </div>

        {/* PRECIO */}
        <div>
          <label className="block font-medium">Precio Venta</label>
          <input
            type="number"
            name="precio_venta"
            value={form.precio_venta}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            min="0"
            step="10"
          />
          {errors.precio_venta && (
            <p className="text-red-600 text-sm mt-1">
              {errors.precio_venta}
            </p>
          )}
        </div>

        {/* ESTADO (solo para Admin / Supervisor) */}
        {puedeCambiarEstado && (
          <div>
            <label className="block font-medium">Estado</label>
            <select
              name="estado"
              value={form.estado}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="">Seleccione estado...</option>
              <option value="True">Activo</option>
              <option value="False">Inactivo</option>
            </select>
            {errors.estado && (
              <p className="text-red-600 text-sm mt-1">
                {errors.estado}
              </p>
            )}
          </div>
        )}

        {/* DESCRIPCIÓN */}
        <div>
          <label className="block font-medium">Descripción</label>
          <textarea
            name="descripcion"
            value={form.descripcion}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            rows="3"
          />
        </div>

        {/* BOTONES */}
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border rounded"
          >
            Cancelar
          </button>

          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Guardar
          </button>
        </div>
      </form>
    </Modal>
  );
}
