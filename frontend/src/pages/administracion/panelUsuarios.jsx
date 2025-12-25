import React, {useState, useEffect} from "react";
import Modal from "../auxiliares/Modal";
import UserForm from "../auxiliares/formSignUp";
import { useAuth  } from "../../context/AuthContext";

import { Api } from "../../utils/apiHelper";

export default function PanelUsuarios() {

    const [usuarios, setusuarios] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [mode, setMode] = useState("create"); // "create" | "edit"
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);

    const { user } = useAuth();
    const isAdmin = user.groups.includes("Administrador");

    const rolesDeUsuario = {Admin: "Administrador", 
                            Manager: "Supervisor",
                            User: "Operador"};
    
    const CargarUsuarios = async () => {
        try {
            const response = await Api("userlist/", "GET");
            console.log("Usuarios: ", response);
            setusuarios(response);
        } catch (error) {
            console.error("Error al cargar Usuarios: ", error);
        }
    }   

    useEffect(() => {
        CargarUsuarios();
    }, []);


    const onToggleEstado = async (userId) => {
        try {
            await Api(`userlist/${userId}/`, "DELETE");
            await CargarUsuarios();
        } catch (error) {
            console.error("Error al cargar Usuarios: ", error);
        }
    }

    const onCrearUsuario = () => {
    setMode("create");
    setUsuarioSeleccionado(null);
    setIsModalOpen(true);
  };

  const onEditarUsuario = (usuario) => {
    setMode("edit");
    setUsuarioSeleccionado(usuario);
    setIsModalOpen(true);
  };

const onSubmitForm = async (data) => {
  try {
    if (mode === "create") {
      await Api("signup/", "POST", data);
    } else {
      await Api(`userlist/${usuarioSeleccionado.id}/`, "PATCH", data);
    }

    await CargarUsuarios();
    setIsModalOpen(false);
  } catch (error) {
    console.error("Error al guardar usuario", error);
  }
};

const PasswordReset = async (userId) => {
    try {
        const response = await Api (`userlist/password-reset/${userId}/` , "POST");
        console.log("Respuesta de restablecimiento de contraseña: ", response);
    } catch (error) {
        console.error("Error al restablecer la contraseña: ", error);
    }
};

    return (
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-8">
        <div className="container mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">
                Administración de Usuarios y Roles
            </h2>

            <button
                onClick={onCrearUsuario}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg flex items-center space-x-2"
            >
                <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
                </svg>
                <span>Agregar Usuario</span>
            </button>
            </div>

            {/* Tabla */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                    <th className="px-6 py-3 font-medium">Nombre</th>
                    <th className="px-6 py-3 font-medium">Correo Electrónico</th>
                    <th className="px-6 py-3 font-medium">Rol</th>
                    <th className="px-6 py-3 font-medium">Estado</th>
                    <th colSpan={3} className="px-6 py-3 font-medium text-center">
                        Acciones
                    </th>
                    </tr>
                </thead>

                <tbody>
                    {usuarios.map((u) => (
                    <tr
                        key={u.id}
                        className="bg-white border-t border-gray-200 hover:bg-gray-50"
                    >
                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        {u.first_name} {u.last_name}
                        </td>

                        <td className="px-6 py-4">{u.email}</td>

                        <td className="px-6 py-4"> {u.groups}</td>

                        <td className= {"px-6 py-4"+ 
                            (u.is_active ?
                                " text-green-600 font-semibold" :
                                " text-red-600 font-semibold"
                            )
                        }
                        >{u.is_active ? "Activo" : "Inactivo"}</td>

                        <td className="px-2 py-4 text-center">
                        <button
                            onClick={() => onEditarUsuario(u)}
                            className="font-medium text-indigo-600 hover:underline mr-4"
                        >
                            Editar
                        </button>

                        <button
                            onClick={() => onToggleEstado(u.id)}
                            className={
                            u.is_active
                                ? "font-medium text-red-600 hover:underline"
                                : "font-medium text-green-600 hover:underline"
                            }
                        >
                            {u.is_active ? "Desactivar " : "Activar "}
                        </button>
                        
                        <button className="px-2 py-4 font-medium text-green-600 hover:underline mr-4"
                            onClick={() => PasswordReset(u.id)}>
                            Reset Password
                        </button>
                        
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
            </div>
            <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <UserForm
                mode={mode}
                isAdmin={isAdmin}
                initialData={usuarioSeleccionado || {}}
                onSubmit={onSubmitForm}
                onCancel={() => setIsModalOpen(false)}
                />
            </Modal>
        </div>
        </main>
    );
}