import React, { useState, useEffect } from 'react';
import ClientesModal from './ClientesModal';
import ClientesTabla from './ClientesTabla';
import './Clientes.css';

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Función para obtener los clientes de la API
  const fetchClientes = async () => {
    try {
      const response = await fetch('http://localhost:3000/usuario'); // Actualiza la URL si es necesario
      const data = await response.json();
      setClientes(data);
      setLoading(false);
    } catch (err) {
      setError('Error al cargar los clientes.');
      setLoading(false);
    }
  };

  // Llamar a la API cuando el componente se monte
  useEffect(() => {
    fetchClientes();
  }, []);

  // Función para agregar un nuevo cliente y actualizar la tabla
  const addCliente = async (nuevoCliente) => {
    try {
      const response = await fetch('http://localhost:5060/registrar_cliente', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoCliente),
      });

      if (response.ok) {
        // Si el cliente se agrega correctamente, obtenemos la lista actualizada
        await fetchClientes(); // Llamamos a la API nuevamente para obtener los clientes actualizados
        setIsModalOpen(false); // Cerramos el modal
      } else {
        console.error('Error al registrar el cliente');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  return (
    <div className="clientes-container">
      <div className="clientes-header">
        <h1>Clientes</h1>
        <button className="btn-nuevo-cliente" onClick={() => setIsModalOpen(true)}>
          + Nuevo Cliente
        </button>
      </div>

      <ClientesTabla clientes={clientes} loading={loading} error={error} />

      {/* Modal para agregar un nuevo cliente */}
      {isModalOpen && (
        <ClientesModal
          closeModal={() => setIsModalOpen(false)}
          addCliente={addCliente} // Pasamos la función para agregar el cliente
        />
      )}
    </div>
  );
};

export default Clientes;