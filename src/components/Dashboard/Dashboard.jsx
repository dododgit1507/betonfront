import React, { useState, useEffect } from 'react';
import { Bell, Calendar, ChartBar, Computer, Gift, HelpCircle, Home, LogOut, Menu, Settings, Users, X } from 'lucide-react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [username, setUsername] = useState(''); // Estado para almacenar el username
  const location = useLocation();
  const navigate = useNavigate();

  // Extraer el rol del localStorage
  const [rol, setRol] = useState(null);

  useEffect(() => {
    // Obtener el rol desde el localStorage
    const storedRol = localStorage.getItem('userRole');
    setRol(storedRol);

    // Obtener el username desde el localStorage
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername); // Actualizar el estado con el username
    }
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    // Eliminar todas las credenciales del localStorage
    localStorage.clear(); // Esto elimina todo lo almacenado en el localStorage
    // Redirigir al usuario a la página de inicio de sesión
    navigate('/'); // O a la ruta donde esté tu página de inicio de sesión
  };

  return (
    <div className="dashboard-container">
      {/* Mobile Menu Button */}
      <button className="mobile-menu-button" onClick={toggleSidebar}>
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div className="sidebar-overlay" onClick={toggleSidebar}></div>
      )}

      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarOpen ? 'sidebar-open' : ''}`}>
        <div className="logo">
          <img src="/images/betondecken-logo.png" alt="Logo" className="logo-image"/>
        </div>
        
        <nav className="nav-menu">
          <div className="menu-section">
            <h3 className="menu-title">MENU</h3>
            <ul>
              {/* Mostrar solo los iconos para el rol de 'cliente' */}
              {rol === 'Cliente' && (
                <li>
                  <NavLink to="/dashboard/pedidos" className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}>
                    <Home size={20} />
                    <span>Pedidos</span>
                  </NavLink>
                </li>
              )}

              {rol === 'INGENIERO'  && (
                <>
                  <li>
                    <NavLink to="/dashboard/pedidos" className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}>
                      <Home size={20} />
                      <span>Pedidos</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/proyectos" className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}>
                      <Calendar size={20} />
                      <span>Proyectos</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/envios" className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}>
                      <ChartBar size={20} />
                      <span>Envíos</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/clientes" className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}>
                      <Users size={20} />
                      <span>Clientes</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/oficina" className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}>
                      <Computer size={20} />
                      <span>Oficina Técnica</span>
                    </NavLink>
                  </li>
                </>
              )}

              {rol === 'ADMIN'  && (
                <>
                  <li>
                    <NavLink to="/dashboard/pedidos" className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}>
                      <Home size={20} />
                      <span>Pedidos</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/proyectos" className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}>
                      <Calendar size={20} />
                      <span>Proyectos</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/envios" className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}>
                      <ChartBar size={20} />
                      <span>Envíos</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/clientes" className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}>
                      <Users size={20} />
                      <span>Clientes</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/oficina" className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}>
                      <Computer size={20} />
                      <span>Oficina Técnica</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/password" className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}>
                      <Gift size={20} />
                      <span>Generar Codigo</span>
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>

          <div className="menu-section">
            <h3 className="menu-title">GENERAL</h3>
            <ul>
              <li>
                <button className="menu-item" onClick={handleLogout}>
                  <LogOut size={20} />
                  <span>Logout</span>
                </button>
              </li>
            </ul>
          </div>

          <div className="profile-section">
            <h3 className="menu-title">CUENTA</h3>
            <div className="account-card">
              <div className="user-badge">
                <div className="user-initials">{username ? username.charAt(0).toUpperCase() : 'A'}</div>
                <div className="account-info">
                  <span className="account-name">{username || 'Admin'}</span>
                  <span className="account-role">Administrador</span>
                </div>
              </div>
              <div className="account-status">
                <span className="status-indicator"></span>
                <span className="status-text">Activo</span>
              </div>
            </div>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <div className="dashboard-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
