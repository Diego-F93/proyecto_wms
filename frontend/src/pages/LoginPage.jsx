import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import UserForm  from './auxiliares/formSignUp.jsx';
import PasswordResetForm from './auxiliares/formPasswordReset.jsx';
import Modal from './auxiliares/Modal.jsx';
import { Api } from '../utils/apiHelper.js';

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] = useState(false);
  const [mode, setMode] = useState("create"); // "create" | "edit"

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      navigate('/main');
    } catch (err) {
      setError(`Problemas al iniciar sesión, ${err || "Desconocido"} `);
  };

  };

  const onSubmitForm = async (data) => {
    try {
      if (mode === "create") {
        await Api("signup/", "POST", data);
      }
    } catch (error) {
      console.error("Error al crear usuario: ", error);
    }

    setIsModalOpen(false);
  }

  const onSubmitPasswordResetForm = async (data) => {
    try {
      await Api("password-reset/", "POST", data);
    } catch (error) {
      console.error("Error al solicitar restablecimiento de contraseña: ", error);
    }

    setIsResetPasswordModalOpen(false);
  }

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-8 border border-gray-100 mx-auto mt-10">
      <div className="h-16 flex items-center justify-center px-4 border-b border-gray-200">
        <img
          src="https://ticashoplatam.com/wp-content/themes/ticashop-latam/img/logo-header.png"
          alt="WMS-TicaShop"
          width="200"
          className="text-xl font-bold text-indigo-600"
        />
      </div>

      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Bienvenido</h1>
        <p className="mt-2 text-sm text-gray-500">Inicia sesión para continuar</p>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="sr-only">
            Correo electrónico
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
            placeholder="Correo electrónico"
          />
        </div>

        <div>
          <label htmlFor="password" className="sr-only">
            Contraseña
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
            placeholder="Contraseña"
          />
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-transform transform hover:scale-105"
        >
          Iniciar sesión
        </button>

        <button
          type="button"
          onClick={() => (setIsModalOpen(true), setMode("create"))}
          className="w-full flex justify-center py-3 px-4 border border-indigo-200 rounded-lg shadow-sm text-sm font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400 transition-transform transform hover:scale-105"
        >
          Solicitar acceso al administrador
        </button>

        <button 
        type='button'
        onClick={() => (setIsResetPasswordModalOpen(true))}
        className="w-full flex justify-center py-3 px-4 border border-indigo-200 rounded-lg shadow-sm text-sm font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400 transition-transform transform hover:scale-105">
            Olvidé la contraseña
        </button>
      </form>
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
                      <UserForm
                      mode={mode}
                      isAdmin={false}
                      initialData={{}}
                      onSubmit={onSubmitForm}
                      onCancel={() => setIsModalOpen(false)}
                      />
      </Modal>

      <Modal open={isResetPasswordModalOpen} onClose={() => setIsResetPasswordModalOpen(false)}>
                      <PasswordResetForm
                      initialData={{}}
                      onSubmit={onSubmitPasswordResetForm}
                      onCancel={() => setIsResetPasswordModalOpen(false)}
                      />
      </Modal>

    </div>
  );
}

export default LoginPage;
