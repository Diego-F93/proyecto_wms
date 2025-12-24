import { useEffect, useState } from "react";

const inputClass =
  "w-full px-4 py-3 rounded-lg border border-gray-300 placeholder-gray-500 text-gray-900 " +
  "focus:outline-none focus:ring-2 focus:ring-indigo-500";

export default function UserForm({
  mode = "create",       // create | edit
  isAdmin = false,
  initialData = {},
  onSubmit,
  onCancel,
}) {
  const isEdit = mode === "edit";

  const [form, setForm] = useState({
    email: initialData.email || "",
    first_name: initialData.first_name || "",
    last_name: initialData.last_name || "",
    rut: initialData.rut || "",
    password: "",
    password2: "",
    groups_names: initialData.groups?.[0] || "",
  });

  const [error, setError] = useState(null);

  useEffect(() => {
    setForm({
      email: initialData.email || "",
      first_name: initialData.first_name || "",
      last_name: initialData.last_name || "",
      rut: initialData.rut || "",
      password: "",
      password2: "",
      groups_names: initialData.groups?.[0] || "",
    });
  }, [initialData]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    if (!isEdit && form.password !== form.password2) {
      setError("Las contraseñas no coinciden");
      return;
    }

    const payload = {
      first_name: form.first_name,
      last_name: form.last_name,
      rut: form.rut,
    };

    if (!isEdit) payload.email = form.email;

    if (form.password) {
      payload.password = form.password;
      payload.password2 = form.password2;
    }

    if (isAdmin && form.groups_names) {
      payload.groups_names = [form.groups_names];
    }

    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold">
          {isEdit ? "Editar usuario" : "Crear cuenta"}
        </h2>
        <p className="text-sm text-gray-500">
          {isEdit
            ? "Actualiza los datos del usuario"
            : "Completa tus datos para registrarte"}
        </p>
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 border border-red-200 rounded-lg px-4 py-2 text-sm">
          {error}
        </div>
      )}

      {!isEdit && (
        <input
          name="email"
          type="email"
          required
          placeholder="Correo corporativo"
          value={form.email}
          onChange={handleChange}
          className={inputClass}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input
          name="first_name"
          placeholder="Nombre"
          required
          value={form.first_name}
          onChange={handleChange}
          className={inputClass}
        />
        <input
          name="last_name"
          placeholder="Apellido"
          required
          value={form.last_name}
          onChange={handleChange}
          className={inputClass}
        />
      </div>

      <input
        name="rut"
        placeholder="RUT (12.345.678-9)"
        required
        value={form.rut}
        onChange={handleChange}
        className={inputClass}
      />

      <input
        name="password"
        type="password"
        placeholder={isEdit ? "Nueva contraseña (opcional)" : "Contraseña"}
        required={!isEdit}
        value={form.password}
        onChange={handleChange}
        className={inputClass}
      />

      <input
        name="password2"
        type="password"
        placeholder="Confirmar contraseña"
        required={!isEdit}
        value={form.password2}
        onChange={handleChange}
        className={inputClass}
      />

      {isAdmin && (
        <select
          name="groups_names"
          value={form.groups_names}
          onChange={handleChange}
          className={inputClass}
        >
          <option value="">Seleccione rol</option>
          <option value="Administrador">Administrador</option>
          <option value="Supervisor">Supervisor</option>
          <option value="Operador">Operador</option>
        </select>
      )}

      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="w-1/2 py-3 rounded-lg border border-gray-300"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="w-1/2 py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700"
        >
          {isEdit ? "Guardar" : "Registrarme"}
        </button>
      </div>
    </form>
  );
}
