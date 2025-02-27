import React, { useState, useEffect } from 'react';
import PedidosModal from './PedidoModal';
import PedidosTabla from './PedidoTabla';
import LoadingSpinner from '../common/LoadingSpinner';
import './Pedidos.css';

const Pedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Función para obtener los pedidos de la API
  const fetchPedidos = async () => {
    try {
      const response = await fetch('http://localhost:3000/pedidos'); // Actualiza la URL si es necesario
      const data = await response.json();
      
      // Añadimos un retraso artificial para mostrar el spinner
      setTimeout(() => {
        setPedidos(data);
        setLoading(false);
      }, 1000);
    } catch (err) {
      setTimeout(() => {
        setError('Error al cargar los pedidos.');
        setLoading(false);
      }, 2000);
    }
  };

  // Llamar a la API cuando el componente se monte
  useEffect(() => {
    fetchPedidos();
  }, []);

  // Función para agregar un nuevo pedido y actualizar la tabla
  const addPedido = async (nuevoPedido) => {
    try {
      const response = await fetch('http://localhost:3000/registrar_pedido', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoPedido),
      });

      if (response.ok) {
        // Si el pedido se agrega correctamente, obtenemos la lista actualizada
        await fetchPedidos(); // Llamamos a la API nuevamente para obtener los pedidos actualizados
        setIsModalOpen(false); // Cerramos el modal
      } else {
        console.error('Error al registrar el pedido');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  return (
    <div className="table-container">
      <div className="table-header">
        <h1>Pedidos</h1>
        <button className="btn-nuevo" onClick={() => setIsModalOpen(true)}>
          + Nuevo Pedido
        </button>
      </div>
      
      {loading ? (
        <LoadingSpinner />
      ) : (
        <PedidosTabla pedidos={pedidos} loading={loading} error={error} />
      )}

      {/* Modal para agregar un nuevo pedido */}
      {isModalOpen && (
        <PedidosModal
          closeModal={() => setIsModalOpen(false)}
          addPedido={addPedido} // Pasamos la función para agregar el pedido
        />
      )}
    </div>
  );
};

export default Pedidos;
