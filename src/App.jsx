import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Dashboard from './components/Dashboard/Dashboard';
import Pedidos from './components/Pedidos/Pedidos';
import Proyectos from './components/Proyectos/Proyectos';
import Envios from './components/Envios/Envios';
import Clientes from './components/Clientes/Clientes';
import Settings from './components/Settings/Settings';
import Oficina from './components/Oficina/Oficina';
import Password from './components/Password/Password';

// Simulación del rol actual del usuario (esto se obtendría de tu estado global o autenticación real)
const getUserRole = () => {
  return localStorage.getItem('userRole'); // 'cliente', 'INGENIERO', 'ADMIN' o null si no está autenticado
};

// Simulación de verificación de autenticación
const isAuthenticated = () => {
  return !!localStorage.getItem('token'); // Asume que tienes un token de autenticación almacenado
};

// Componente de ruta protegida
const PrivateRoute = ({ children, allowedRoles }) => {
  const userRole = getUserRole();
  const authenticated = isAuthenticated();

  // Si no está autenticado, redirigir a la página de inicio de sesión
  if (!authenticated) {
    return <Navigate to="/" />;
  }

  // Si el usuario no tiene ningún rol, también redirigir al inicio de sesión
  if (!userRole) {
    return <Navigate to="/" />;
  }

  // Si el rol del usuario no está permitido para la ruta, redirigir según el rol
  if (!allowedRoles.includes(userRole)) {
    if (userRole === 'Cliente') {
      return <Navigate to="/dashboard/pedidos" />;
    } else if (userRole === 'INGENIERO') {
      return <Navigate to="/dashboard" />;
    } else {
      return <Navigate to="/" />;
    }
  }

  return children;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />

      {/* Protegemos el dashboard */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute allowedRoles={['Cliente', 'INGENIERO', 'ADMIN']}>
            <Dashboard />
          </PrivateRoute>
        }
      >
        {/* Solo el cliente puede acceder a pedidos */}
        <Route
          path="pedidos"
          element={
            <PrivateRoute allowedRoles={['Cliente', 'INGENIERO', 'ADMIN']}>
              <Pedidos />
            </PrivateRoute>
          }
        />

        {/* Ingenieros y admin pueden acceder a todas estas rutas */}
        <Route
          path="proyectos"
          element={
            <PrivateRoute allowedRoles={['INGENIERO', 'ADMIN']}>
              <Proyectos />
            </PrivateRoute>
          }
        />
        <Route
          path="envios"
          element={
            <PrivateRoute allowedRoles={['INGENIERO', 'ADMIN']}>
              <Envios />
            </PrivateRoute>
          }
        />
        <Route
          path="oficina"
          element={
            <PrivateRoute allowedRoles={['INGENIERO', 'ADMIN']}>
              <Oficina />
            </PrivateRoute>
          }
        />
        <Route
          path="clientes"
          element={
            <PrivateRoute allowedRoles={['INGENIERO', 'ADMIN']}>
              <Clientes />
            </PrivateRoute>
          }
        />
        <Route
          path="settings"
          element={
            <PrivateRoute allowedRoles={['INGENIERO', 'ADMIN']}>
              <Settings />
            </PrivateRoute>
          }
        />

        {/* Solo el admin puede acceder a la ruta de contraseña */}
        <Route
          path="password"
          element={
            <PrivateRoute allowedRoles={['ADMIN']}>
              <Password />
            </PrivateRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
