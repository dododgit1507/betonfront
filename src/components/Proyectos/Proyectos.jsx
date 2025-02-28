import React, { useState, useEffect } from 'react';
import ProyectosTabla from './ProyectoTabla';
import ProyectosModal from './ProyectoModal';
import LoadingSpinner from '../common/LoadingSpinner';
import './Proyectos.css';
import { useToast } from '@chakra-ui/react'


const Proyectos = () => {
  const toast = useToast(); // Acceder al toast

  const [proyectos, setProyectos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const proyectosPorPagina = 10;

  const showToast = () => {
    toast({
      title: 'Proyecto registrado',
      description: 'El proyecto se ha registrado correctamente.',
      status: 'success',
      duration: 3000,
      position: 'bottom-right',
      isClosable: true,
      containerStyle: {
        marginBottom: '20px',
      },
    });
  }

  // Función para obtener los proyectos de la API
  const fetchProyectos = async () => {
    try {
      const response = await fetch('http://localhost:3000/proyecto');
      const data = await response.json();

      setTimeout(() => {
        setProyectos(data);
        setLoading(false);
      }, 1000); // Retraso de 2 segundos
    } catch (err) {
      setError('Error al cargar los proyectos.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProyectos();
  }, []);

  // Filtrar proyectos basado en el término de búsqueda
  const proyectosFiltrados = proyectos.filter(proyecto =>
    (proyecto.nombre && proyecto.nombre.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (proyecto.id_proyecto_cup && proyecto.id_proyecto_cup.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  // Calcular índices para la paginación
  const indexOfLastProyecto = currentPage * proyectosPorPagina;
  const indexOfFirstProyecto = indexOfLastProyecto - proyectosPorPagina;
  const proyectosActuales = proyectosFiltrados.slice(indexOfFirstProyecto, indexOfLastProyecto);

  // Cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Manejar cambios en la búsqueda
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Resetear a la primera página cuando se busca
  };

  // Función para agregar un nuevo proyecto y actualizar la tabla
  const addProyecto = async (nuevoProyecto) => {
    try {
      const response = await fetch('http://localhost:3000/registrar_proyecto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoProyecto),
      });
  
      if (!response.ok) {
        throw new Error('Error al crear el proyecto');
      }
  
      const proyectoCreado = await response.json();
      setIsModalOpen(false);
  
      // Recargar la lista completa de proyectos
      await fetchProyectos();

      // Mostrar alerta de éxito con SweetAlert2
      showToast();
      
    } catch (err) {
      console.error('Error:', err);
      // Mostrar alerta de error con SweetAlert2
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al agregar el proyecto.',
        confirmButtonText: 'Aceptar'
      });
    }
  };

  return (
    <div className="table-container">
      <div className="table-header">
        <h1>Gestión de Proyectos</h1>
        <button className="btn-nuevo" onClick={() => setIsModalOpen(true)}>Agregar Proyecto</button>
      </div>
      <div className="search-container">
        <input
          type="text"
          placeholder="Buscar por nombre o CUP..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <ProyectosTabla
          proyectos={proyectosActuales}
          loading={loading}
          error={error}
        />
      )}

      {/* Componente de paginación */}
      {!loading && !error && proyectosFiltrados.length > 0 && (
        <div className="paginacion">
          {Array.from({ length: Math.ceil(proyectosFiltrados.length / proyectosPorPagina) }).map((_, index) => (
            <button
              id='page-button'
              key={index + 1}
              onClick={() => paginate(index + 1)}
              className={currentPage === index + 1 ? 'active' : ''}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}

      {isModalOpen && (
        <ProyectosModal
          closeModal={() => setIsModalOpen(false)}
          addProyecto={addProyecto}
        />
      )}
    </div>
  );
};

export default Proyectos;
