import React, { useState, useEffect } from 'react';
import ProyectoTableMUI from './ProyectoTableMUI';
import ProyectosModal from './ProyectoModal';
import LoadingSpinner from '../common/LoadingSpinner';
import { useToast, Button, Box } from '@chakra-ui/react';
import './Proyectos.css';

const Proyectos = () => {
  const toast = useToast();
  const [proyectos, setProyectos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

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
  };

  const fetchProyectos = async () => {
    try {
      const response = await fetch('http://localhost:3000/proyecto');
      const data = await response.json();
      setProyectos(data);
      setLoading(false);
    } catch (err) {
      setError('Error al cargar los proyectos.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProyectos();
  }, []);

  const proyectosFiltrados = proyectos.filter(proyecto =>
    (proyecto.nombre && proyecto.nombre.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (proyecto.id_proyecto_cup && proyecto.id_proyecto_cup.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  const indexOfLastProyecto = (page + 1) * rowsPerPage;
  const indexOfFirstProyecto = page * rowsPerPage;
  const proyectosActuales = proyectosFiltrados.slice(indexOfFirstProyecto, indexOfLastProyecto);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

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
      await fetchProyectos();
      showToast();
      
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <Box p={4}>
      <div className='titulo-container'>
        <h1 className='titulo-table'>Gestión de Proyectos</h1>
        <Button className='boton-table' colorScheme="blue" onClick={() => setIsModalOpen(true)}>
         + Agregar Proyecto
        </Button>
      </div>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <ProyectoTableMUI
          proyectos={proyectosActuales}
          loading={loading}
          error={error}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          searchTerm={searchTerm}
          onSearchChange={handleSearch}
          totalProyectos={proyectosFiltrados.length}
        />
      )}

      {isModalOpen && (
        <ProyectosModal
          closeModal={() => setIsModalOpen(false)}
          addProyecto={addProyecto}
        />
      )}
    </Box>
  );
};

export default Proyectos;
