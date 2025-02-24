import { Routes, Route } from 'react-router-dom'; 
import LoginPage from './pages/LoginPage';
import Dashboard from './components/Dashboard/Dashboard';
import Pedidos from './components/Pedidos/Pedidos';
import Proyectos from './components/Proyectos/Proyectos';
import Envios from './components/Envios/Envios';
import Clientes from './components/Clientes/Clientes';
import Settings from './components/Settings/Settings';

function App() {

  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/dashboard" element={<Dashboard />}>
        <Route path="pedidos" element={<Pedidos />} />
        <Route path="proyectos" element={<Proyectos />} />
        <Route path="envios" element={<Envios />} />
        <Route path="clientes" element={<Clientes />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  )
}

export default App
