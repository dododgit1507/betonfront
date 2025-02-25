import React, { useState, useEffect } from 'react';
import ProyectosModal from './ProyectoModal';
import ProyectosTabla from './ProyectoTabla';
import './Proyectos.css';

const Proyectos = () => {
  const [proyectos, setProyectos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Función para obtener los proyectos de la API
  const fetchProyectos = async () => {
    try {
      const response = await fetch('http://localhost:3000/proyecto'); // Actualiza la URL si es necesario
      const data = await response.json();
      setProyectos(data);
      setLoading(false);
    } catch (err) {
      setError('Error al cargar los proyectos.');
      setLoading(false);
    }
  };

  // Llamar a la API cuando el componente se monte
  useEffect(() => {
    fetchProyectos();
  }, []);

  // Función para agregar un nuevo proyecto y actualizar la tabla
  const addProyecto = async (nuevoProyecto) => {
    try {
      const response = await fetch('http://localhost:3000/registrar_proyecto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoProyecto),
      });

      if (response.ok) {
        // Si el proyecto se agrega correctamente, obtenemos la lista actualizada
        await fetchProyectos(); // Llamamos a la API nuevamente para obtener los proyectos actualizados
        setIsModalOpen(false); // Cerramos el modal
      } else {
        console.error('Error al registrar el proyecto');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  return (
    <div className="table-container">
      <div className="table-header">
        <h1>Proyectos</h1>
        <button className="btn-nuevo" onClick={() => setIsModalOpen(true)}>
          + Nuevo Proyecto
        </button>
      </div>

      <ProyectosTabla proyectos={proyectos} loading={loading} error={error} />

      {/* Modal para agregar un nuevo proyecto */}
      {isModalOpen && (
        <ProyectosModal
          closeModal={() => setIsModalOpen(false)}
          addProyecto={addProyecto} // Pasamos la función para agregar el proyecto
        />
      )}
    </div>
  );
};

export default Proyectos;
