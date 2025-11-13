import React, { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/token/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Inicio de sesión exitoso');
        console.log(data);
        // Aquí puedes redirigir o guardar el token JWT, por ejemplo:
        // localStorage.setItem('token', data.access);
        // navigate('/dashboard');
      } else {
        alert(data.detail || 'Error en las credenciales');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      alert('Error de conexión con el servidor');
    }
  };

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
          onClick={() => (window.location.href = 'registro.html')}
          className="w-full flex justify-center py-3 px-4 border border-indigo-200 rounded-lg shadow-sm text-sm font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400 transition-transform transform hover:scale-105"
        >
          Solicitar acceso al administrador
        </button>

        <div className="text-center">
          <a
            href="recuperar_contraseña.html"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-800 hover:underline"
          >
            Olvidé la contraseña
          </a>
        </div>
      </form>
    </div>
  );
}

export default Login;
