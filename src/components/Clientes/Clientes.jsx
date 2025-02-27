import React, { useState, useEffect } from 'react';
import ClientesModal from './ClientesModal';
import ClientesTabla from './ClientesTabla';
import LoadingSpinner from '../common/LoadingSpinner';
import Swal from 'sweetalert2';  // Importa SweetAlert2
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
      
      // Añadimos un retraso artificial para mostrar el spinner
      setTimeout(() => {
        setClientes(data);
        setLoading(false);
      }, 1000);
    } catch (err) {
      setTimeout(() => {
        setError('Error al cargar los clientes.');
        setLoading(false);
      }, 2000);
    }
  };

  // Llamar a la API cuando el componente se monte
  useEffect(() => {
    fetchClientes();
  }, []);

  // Función para agregar un nuevo cliente y actualizar la tabla
  const addCliente = async (nuevoCliente) => {
    try {
      const response = await fetch('http://localhost:3000/registrar_cliente', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoCliente),
      });

      if (response.ok) {
        // Si el cliente se agrega correctamente, obtenemos la lista actualizada
        await fetchClientes(); // Llamamos a la API nuevamente para obtener los clientes actualizados
        setIsModalOpen(false); // Cerramos el modal

        // Mostrar alerta de éxito usando SweetAlert2
        Swal.fire({
          title: 'Usuario Creado',
          text: 'El nuevo usuario se ha creado correctamente',
          icon: 'success',
          confirmButtonText: 'OK',
        });
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
        <button className="btn-nuevo" onClick={() => setIsModalOpen(true)}>
          + Nuevo Cliente
        </button>
      </div>
      
      {loading ? (
        <LoadingSpinner />
      ) : (
        <ClientesTabla clientes={clientes} loading={loading} error={error} />
      )}

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
