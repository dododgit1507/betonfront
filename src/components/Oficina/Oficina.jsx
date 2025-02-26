import React, { useState, useEffect } from 'react';
import ModalOficina from './ModalOficina';
import TablaOficina from './TablaOficina';
import LoadingSpinner from '../common/LoadingSpinner';
import './Oficina.css';

const Oficina = () => {
  const [oficinas, setOficinas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Función para obtener las oficinas técnicas de la API
  const fetchOficinas = async () => {
    try {
      const response = await fetch('http://localhost:3000/oficina_tecnica');
      const data = await response.json();
      
      // Añadimos un retraso artificial para mostrar el spinner
      setTimeout(() => {
        setOficinas(data);
        setLoading(false);
      }, 2000);
    } catch (err) {
      setTimeout(() => {
        setError('Error al cargar las oficinas técnicas.');
        setLoading(false);
      }, 2000);
    }
  };

  // Llamar a la API cuando el componente se monte
  useEffect(() => {
    fetchOficinas();
  }, []);

  // Función para agregar una nueva oficina técnica y actualizar la tabla
  const addOficina = async (nuevaOficina) => {
    try {
      const response = await fetch('http://localhost:3000/registrar_oficina', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevaOficina),
      });

      if (response.ok) {
        // Actualizamos la lista de oficinas
        await fetchOficinas();
        setIsModalOpen(false); // Cerramos el modal
      } else {
        console.error('Error al registrar la oficina técnica');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  return (
    <div className="table-container">
      <div className="table-header">
        <h1>Oficina Técnica</h1>
        <button className="btn-nuevo" onClick={() => setIsModalOpen(true)}>
          + Nueva Oficina
        </button>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <TablaOficina oficinas={oficinas} loading={loading} error={error} />
      )}

      {isModalOpen && (
        <ModalOficina
          closeModal={() => setIsModalOpen(false)}
          addOficina={addOficina}
        />
      )}
    </div>
  );
};

export default Oficina;
