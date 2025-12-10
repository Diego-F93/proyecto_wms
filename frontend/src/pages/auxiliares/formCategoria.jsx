import React, { useEffect, useState } from "react";
import Modal from "./Modal";

export default function CategoriaFormModal({
  open,
  onClose,
  onSubmit,
  initialData = null,
}) {
  const [form, setForm] = useState({
    idCategoria: "",
    nombre: "",
    descripcion: "",
    estado: "True", // string para select
  });

  const [errors, setErrors] = useState({});

  // Inicializar formulario al abrir
  useEffect(() => {
    if (!open) return;

    if (initialData) {
      // MODO EDICIÓN
      setForm({
        idCategoria: initialData.idCategoria || "",
        nombre: initialData.nombre || "",
        descripcion: initialData.descripcion || "",
        estado: initialData.estado ? "True" : "False",
      });
    } else {
      // MODO CREAR
      setForm({
        idCategoria: "",
        nombre: "",
        descripcion: "",
        estado: "True",
      });
    }

    setErrors({});
  }, [open, initialData]);

  // Captura de campos
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Validación
  const validar = () => {
    const newErrors = {};

    if (!form.nombre.trim()) {
      newErrors.nombre = "El nombre es obligatorio.";
    }

    if (!form.descripcion.trim()) {
      newErrors.descripcion = "La descripción es obligatoria.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Enviar formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validar()) return;

    onSubmit({
      idCategoria: form.idCategoria,
      nombre: form.nombre.trim(),
      descripcion: form.descripcion.trim(),
      estado: form.estado === "True",
    });

    onClose();
  };

  const esEdicion = Boolean(initialData);

  return (
    <Modal open={open} onClose={onClose}>
      <h2 className="text-xl font-bold mb-4">
        {esEdicion ? "Editar Categoría" : "Crear Categoría"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* ID (solo edición, no editable) */}
        {esEdicion && (
          <div>
            <label className="block font-medium">ID Categoría</label>
            <input
              type="text"
              value={form.idCategoria}
              disabled
              className="w-full p-2 border rounded bg-gray-100"
            />
          </div>
        )}

        {/* Nombre */}
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

        {/* Descripción */}
        <div>
          <label className="block font-medium">Descripción</label>
          <textarea
            name="descripcion"
            value={form.descripcion}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            rows={3}
          />
          {errors.descripcion && (
            <p className="text-red-600 text-sm mt-1">{errors.descripcion}</p>
          )}
        </div>

        {/* Estado */}
        <div>
          <label className="block font-medium">Estado</label>
          <select
            name="estado"
            value={form.estado}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="True">Activo</option>
            <option value="False">Inactivo</option>
          </select>
        </div>

        {/* Botones */}
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
