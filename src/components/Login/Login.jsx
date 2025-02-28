import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InfiniteLooper from '../InfiniteLooper/InfiniteLooper';
import { carruselContent } from '../../helpers/carrusel';
import { useToast } from '@chakra-ui/react'; // Importar useToast de Chakra UI
import './Login.css';

const Login = () => {
  const toast = useToast(); // Instanciar el hook useToast
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Mostrar un estado de carga mientras se realiza la petición

    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Redirigir al dashboard si el login es exitoso
        navigate('/dashboard/pedidos');
      } else {
        // Mostrar mensaje de error con toast si hay algún problema con la autenticación
        setError(data.message);
        toast({
          title: 'Error',
          description: 'Correo o contraseña incorrectos.',
          status: 'error',
          duration: 3000,
          position: 'bottom-right',
          isClosable: true,
          containerStyle: {
            marginBottom: '20px',
          },
        });
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setError('Error en el servidor. Inténtalo más tarde.');
      toast({
        title: 'Error en el servidor',
        description: 'Inténtalo más tarde.',
        status: 'error',
        duration: 3000,
        position: 'bottom-right',
        isClosable: true,
        containerStyle: {
          marginBottom: '20px',
        },
      });
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="login-container">
      <div className="login-left">
        <div className="logo-container">
          <img src="/images/betondecken-logo.png" alt="Betondecken Logo" />
        </div>
        <div className="carrusel">
          <InfiniteLooper speed={40} direction="left">
            {carruselContent.map((item) => (
              <div className="carrusel-item" key={item.id}>
                <img src={`/images/proyecto${item.id}.webp`} alt={item.nombre} />
                <div className="carrusel-content">
                  <h3>{item.nombre}</h3>
                  <p>{item.m2}</p>
                </div>
              </div>
            ))}
          </InfiniteLooper>
        </div>
      </div>
      
      <div className="login-right">
        <div className="login-form-container">
          <h1>BIENVENIDO A<br />BETONDECKEN</h1>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group-login">
              <label>Email</label>
              <input
                type="email"
                placeholder="Coloca tu correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group-login">
              <label>Contraseña</label>
              <div className="password-input-login">
                <input
                  type="password"
                  placeholder="Coloca tu contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button type="button" className="toggle-password-login">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                </button>
              </div>
            </div>

            <div className="forgot-password-login">
              <a href="#">¿Olvidaste tu contraseña?</a>
            </div>

            <button type="submit" className="login-button">
              Ingresar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;