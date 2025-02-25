import { useState, useEffect } from 'react';
import axios from 'axios';

const useClientes = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Función para obtener los clientes desde el backend
  const fetchClientes = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3000/usuario');
      setClientes(response.data); // Actualizamos el estado con los clientes obtenidos
    } catch (err) {
      setError('Error al obtener clientes');
    } finally {
      setLoading(false);
    }
  };

  // Función para agregar un nuevo cliente
  const addCliente = async (newClient) => {
    try {
      const response = await axios.post('http://localhost:3000/registrar_cliente', newClient);
      setClientes((prevClientes) => [...prevClientes, response.data]); // Agregamos el nuevo cliente al estado sin perder los anteriores
    } catch (err) {
      setError('Error al agregar cliente');
    }
  };

  // Usamos useEffect para obtener los clientes cuando el componente se monte
  useEffect(() => {
    fetchClientes();
  }, []);

  return { clientes, loading, error, addCliente };
};

export default useClientes;
