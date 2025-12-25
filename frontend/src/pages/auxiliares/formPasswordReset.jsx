import { useEffect, useState } from "react";

const inputClass =
  "w-full px-4 py-3 rounded-lg border border-gray-300 placeholder-gray-500 text-gray-900 " +
  "focus:outline-none focus:ring-2 focus:ring-indigo-500";

export default function PasswordResetForm({
  onSubmit,
  onCancel,
}) {
  const [form, setForm] = useState({
    email: "",
    rut: ""});

  const [error, setError] = useState(null);

  useEffect(() => {
    setForm({
      email: "",
      rut:""});
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    const payload = {
        email: form.email,
        rut: form.rut,
    };
    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold">
          Restablecer contraseña
        </h2>
        <p className="text-sm text-gray-500">
            Ingresa tu correo y RUT para recibir instrucciones de restablecimiento
        </p>
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 border border-red-200 rounded-lg px-4 py-2 text-sm">
          {error}
        </div>
      )}

        <input
          name="email"
          type="email"
          required
          placeholder="Correo corporativo"
          value={form.email}
          onChange={handleChange}
          className={inputClass}
        />


      <input
        name="rut"
        placeholder="RUT (12.345.678-9)"
        required
        value={form.rut}
        onChange={handleChange}
        className={inputClass}
      />

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          className="w-1/2 py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700"
        >
          Restablecer contraseña
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="w-1/2 py-3 rounded-lg border border-gray-300"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
