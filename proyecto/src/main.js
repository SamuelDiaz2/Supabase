// src/main.js
import { mostrarRegistro } from './register.js';
import { mostrarLogin } from './login.js';
import { mostrarMVP } from './mvp.js';
import { mostrarUser } from './user.js';
import { mostrarAdmin } from './admin.js';
import { supabase } from './supabase.js';

const routes = {
 'registro': mostrarRegistro,
 'login': mostrarLogin,
 'actividades': mostrarMVP,
 'usuarios': mostrarUser,
 'admin': mostrarAdmin
};

async function CerrarSesion() {
 await supabase.auth.signOut();
 // Después de cerrar sesión, recargar el menú y mostrar el registro
 await cargarMenu();
 mostrarRegistro();
}

// 🧩 Control de navegación según el estado del usuario
export async function cargarMenu() { // Exportar por si se necesita desde CerrarSesion
 const menu = document.getElementById('app');

    // 🌟 VERIFICACIÓN DE SEGURIDAD: Previene el error si el elemento 'menu' no existe
    if (!menu) {
        console.error("Error: Elemento con ID 'menu' no encontrado en el HTML.");
        // Opcional: Puedes detener la ejecución si el elemento es crucial
        return; 
    }

 const { data: { user } } = await supabase.auth.getUser();

 // 🔹 Si NO hay usuario logueado
 if (!user) {
 menu.innerHTML = `
 <div>
 <button data-action="registro">Registrarse</button>
 <button data-action="login">Iniciar sesión</button>
 </div>
 `;
 } else {
 // Código para usuario logueado
 menu.innerHTML = `
  <div>
  <button data-action="actividades">Actividades</button>
  <button data-action="usuarios">Usuarios</button>
  <button data-action="logout">Cerrar sesión</button>
  ${user.email === 'admin@mail.com' ? '<button data-action="admin">Admin</button>' : ''}
  </div>
 `;
 }

// 🌟 ASIGNACIÓN DE EVENT LISTENERS
 menu.querySelectorAll('button').forEach(button => {
 const action = button.getAttribute('data-action');

 if (action === 'logout') {
 button.addEventListener('click', CerrarSesion);
 } else if (routes[action]) {
 // Asigna la función importada correspondiente al evento click
 button.addEventListener('click', routes[action]);
 }
 });
}

// 🌀 LLAMADA FINAL: Ejecuta cargarMenu SÓLO cuando el HTML está listo
document.addEventListener("DOMContentLoaded", cargarMenu);