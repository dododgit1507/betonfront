import React, { useState } from 'react';
import { Bell, Calendar, ChartBar, HelpCircle, Home, LogOut, Menu, Settings, Users, X } from 'lucide-react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
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
                  <Users size={20} />
                  <span>Oficina Técnica</span>
                </NavLink>
              </li>
            </ul>
          </div>

          <div className="menu-section">
            <h3 className="menu-title">GENERAL</h3>
            <ul>
              <li>
                <NavLink to="/dashboard/settings" className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}>
                  <Settings size={20} />
                  <span>Settings</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/logout" className="menu-item">
                  <LogOut size={20} />
                  <span>Logout</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Top Bar */}
        <div className="top-bar">
          <div className="search-bar">
            <input type="text" placeholder="Search task..." />
          </div>
          
          <div className="user-profile">
            <Bell className="notification-icon" size={20} />
            <div className="profile-info">
              <img 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                alt="Profile" 
                className="profile-image" 
              />
              <div className="profile-details">
                <span className="profile-name">Eduardo Dodod</span>
                <span className="profile-email">dododsolutions@email.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Content - Kept Empty as Requested */}
        <div className="dashboard-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;