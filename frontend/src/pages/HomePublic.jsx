import React from 'react';
import {useAuth, isAuthenticated, logout } from '../context/AuthContext';

// Importacion de componentes para las diferentes vistas
import EnConstruccion from '../pages/EnConstruccion'
import SinPermiso from './SinPermiso';



export default function HomePublic() {
    
    const { user, isAuthenticated, logout } = useAuth();
    const [SelectedView, setSelectedView] = React.useState('dashboard');

    const rendercontent = () => {
        switch (SelectedView) {
            case 'dashboard':
                return <EnConstruccion />;
            
            case 'lista_movimientos':
                return <SinPermiso />;
            case 'registrar_es':
                return <EnConstruccion />;
            case 'productos':
                return <EnConstruccion />;
            case 'categorias':
                return <EnConstruccion />;
            case 'generar_reporte':
                return <EnConstruccion />;
            case 'dashboard_ejecutivo':
                return <EnConstruccion />;
            case 'usuarios_y_roles':
                return <EnConstruccion />;
            case 'alertas_y_umbrales':
                return <EnConstruccion />; 
            case 'mantenimiento':
                return <EnConstruccion />;
            
            default:
                return <div>Página no encontrada</div>;
        }
    };

// Script para mostrar la fecha actual
    const today = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = today.toLocaleDateString('es-ES', options);

    function dropdownToggle(event) {
        const menuToggle = event.currentTarget;
        const dropdownMenu = menuToggle.nextElementSibling;
        dropdownMenu.classList.toggle('hidden');
        menuToggle.querySelector('svg').classList.toggle('rotate-180');

    }

    if (!isAuthenticated) return null;

    return (
        <div class="flex h-screen">
        <aside class="w-64 flex-shrink-0 bg-white border-r border-gray-200 flex flex-col">
  
            <div class="h-16 flex items-center justify-center px-4 border-b border-gray-200">
                <img src="https://ticashoplatam.com/wp-content/themes/ticashop-latam/img/logo-header.png" 
                alt="WMS-TicaShop" width="85%" class="text-xl font-bold text-indigo-600 "></img>
            </div>
            
            <nav class="flex-1 px-4 py-4 overflow-y-auto flex flex-col justify-between">
                <ul class="space-y-1">
                    <li>
                        <button onClick={() => setSelectedView('dashboard')} class="flex items-center space-x-3 text-gray-700 p-2 rounded-md font-medium bg-gray-100 text-indigo-600">
                           <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10v11h6v-7h6v7h6V10L12 3z"></path></svg>
                           <span>Dashboard</span>
                        </button>
                    </li>
                    { (user.groups.includes("Administrador") || user.groups.includes("Supervisor") || user.groups.includes("Operador")) && <div>
                        <li class="pt-4">
                            <span class="px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">Gestión</span>
                        </li>
                        <li>
                                <button type="button" onClick={dropdownToggle} class="w-full flex items-center justify-between text-gray-600 p-2 rounded-md font-medium hover:bg-gray-100 focus:outline-none menu-toggle">
                                <div class="flex items-center space-x-3">
                                    <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg>
                                    <span>Inventario</span>
                                </div>
                                <svg class="w-4 h-4 transition-transform duration-200 transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                            </button>
                            <ul class="mt-1 space-y-1 pl-9 hidden">
                                <li><button onClick={() => setSelectedView('lista_movimientos')} class="block p-2 rounded-md text-sm text-gray-500 hover:bg-gray-100">Lista de movimientos</button></li>
                                <li><button onClick={() => setSelectedView('registrar_es')} class="block p-2 rounded-md text-sm text-gray-500 hover:bg-gray-100">Registrar E/S</button></li>
                            </ul>                        
                        </li>
                    
                        <li>
                            <button type="button" onClick={dropdownToggle} class="w-full flex items-center justify-between text-gray-600 p-2 rounded-md font-medium hover:bg-gray-100 focus:outline-none menu-toggle">
                                <div class="flex items-center space-x-3">
                                    <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z"></path></svg>
                                    <span>Catálogo</span>
                                </div>
                                <svg class="w-4 h-4 transition-transform duration-200 transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                            </button>
                            <ul class="mt-1 space-y-1 pl-9 hidden">
                                <li><button onClick={() => setSelectedView('productos')} class="block p-2 rounded-md text-sm text-gray-500 hover:bg-gray-100">Productos</button></li>
                                { (user.groups.includes("Administrador") || user.groups.includes("Supervisor")) && <div>
                                    <li><button onClick={() => setSelectedView('categorias')} class="block p-2 rounded-md text-sm text-gray-500 hover:bg-gray-100">Categorías</button></li>
                                </div>
                                }
                            </ul>
                        </li>
                    </div>
                    }


                    { (user.groups.includes("Supervisor") || user.groups.includes("Administrador")) && <div>
                        <li class="pt-4">
                            <span class="px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">Análisis</span>
                        </li>
                        <li>
                            <button type="button" onClick={dropdownToggle} class="w-full flex items-center justify-between text-gray-600 p-2 rounded-md font-medium hover:bg-gray-100 focus:outline-none menu-toggle">
                                <div class="flex items-center space-x-3">
                                    <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                                    <span>Reportes</span>
                                </div>
                                <svg class="w-4 h-4 transition-transform duration-200 transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                            </button>
                            <ul class="mt-1 space-y-1 pl-9 hidden">
                                <li><button onClick={() => setSelectedView('generar_reporte')} class="block p-2 rounded-md text-sm text-gray-500 hover:bg-gray-100">Generar Reporte</button></li>
                                <li><button onClick={() => setSelectedView('dashboard_ejecutivo')} class="block p-2 rounded-md text-sm text-gray-500 hover:bg-gray-100">Dashboard Ejecutivo</button></li>
                            </ul>
                        </li>
                    </div>
                    }
                    { user.groups.includes("Administrador") && <div>
                        <li class="pt-4">
                            <span class="px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">Configuración</span>
                        </li>    
                        <li>
                            <button type="button" onClick={dropdownToggle} class="w-full flex items-center justify-between text-gray-600 p-2 rounded-md font-medium hover:bg-gray-100 focus:outline-none menu-toggle">
                                <div class="flex items-center space-x-3">
                                <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21v-1a6 6 0 00-1-3.72M9 21v-1a6 6 0 012-4.991M15 21H3m12 0h6M9 21c-2.652 0-4.85-1.12-4.85-2.5V16c0-1.38 2.198-2.5 4.85-2.5h6c2.652 0 4.85 1.12 4.85 2.5v2.5c0 1.38-2.198 2.5-4.85 2.5H9z"></path></svg>
                                    <span>Administración</span>
                                </div>
                                <svg class="w-4 h-4 transition-transform duration-200 transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                            </button>
                            <ul class="mt-1 space-y-1 pl-9 hidden">
                                <li><button onClick={() => setSelectedView('usuarios_y_roles')} class="block p-2 rounded-md text-sm text-gray-500 hover:bg-gray-100">Usuarios y Roles</button></li>
                                <li><button onClick={() => setSelectedView('alertas_y_umbrales')} class="block p-2 rounded-md text-sm text-gray-500 hover:bg-gray-100">Alertas y Umbrales</button></li>
                                <li><button onClick={() => setSelectedView('mantenimiento')} class="block p-2 rounded-md text-sm text-gray-500 hover:bg-gray-100">Mantenimiento</button></li>
                            </ul>
                        </li>
                    </div>
                    }
                </ul>
                {/* Funcionalidad de cierre de sesión */}
                <div>
                    <button type="submit" onClick={logout} class="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-transform transform hover:scale-105">
                        Cerrar sesión
                    </button>
                </div>
            </nav>
        </aside>

        <div class="flex-1 flex flex-col overflow-hidden">
           <header class="h-16 bg-white border-b border-gray-200 flex items-center justify-end px-8">
                 <div class="text-right flex ">
                    <div class="img pro">
                        <img src="https://i.pravatar.cc/40" alt="Avatar" class="w-10 h-10 rounded-full inline-block">
                        {/* Imagen de usuario /// reemplazar con la del usuario actual */}
                        </img>
                    </div>
                    <div class="ml-3 text-sm">
                        <p class="text-sm font-medium text-gray-800">{(user.first_name + " " + user.last_name)}</p>
                        <p class="text-xs text-gray-500">{user.groups.join(", ")}</p>
                        <p class="text-xs text-gray-500" id="current-date">{(formattedDate)}</p>
                    </div>
                </div>
            </header>
            
            <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-8">
                <div class="container mx-auto">
                    <div className='Dinamic'>
                        {rendercontent()}
                    </div>
                </div>
            </main>
        </div>
</div>
); 
}

