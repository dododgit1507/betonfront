import React, { useState, useEffect } from 'react';
import ModalEnvios from './ModalEnvios';
import TablaEnvios from './TablaEnvios';
import './Envios.css';

const Envios = () => {
  const [envios, setEnvios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Función para obtener los envíos de la API
  const fetchEnvios = async () => {
    try {
      const response = await fetch('http://localhost:3000/envio');
      const data = await response.json();
      setEnvios(data);
      setLoading(false);
    } catch (err) {
      setError('Error al cargar los envíos.');
      setLoading(false);
    }
  };

  // Llamar a la API cuando el componente se monte
  useEffect(() => {
    fetchEnvios();
  }, []);

  // Función para agregar un nuevo envío y actualizar la tabla
  const addEnvio = async (nuevoEnvio) => {
    try {
      const response = await fetch('http://localhost:3000/registrar_envio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoEnvio),
      });

      if (response.ok) {
        // Actualizamos la lista de envíos
        await fetchEnvios();
        setIsModalOpen(false); // Cerramos el modal
      } else {
        console.error('Error al registrar el envío');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  return (
    <div className="envios-container">
      <div className="envios-header">
        <h1>Envíos</h1>
        <button className="btn-nuevo-envio" onClick={() => setIsModalOpen(true)}>
          + Nuevo Envío
        </button>
      </div>

      <TablaEnvios envios={envios} loading={loading} error={error} />

      {isModalOpen && (
        <ModalEnvios
          closeModal={() => setIsModalOpen(false)}
          addEnvio={addEnvio}
        />
      )}
    </div>
  );
};

export default Envios;
