//Función requireAuth verifica si el usuario ha iniciado sesión 
// antes de permitirle acceder a ciertas páginas de la aplicación
export function requireAuth() {
    const token = sessionStorage.getItem('accessToken');
    if (!token) {
      alert('Debe iniciar sesión para acceder.');
      window.location.href = './login.html';
    }
  }
  