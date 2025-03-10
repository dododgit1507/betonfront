import React, { useState, useEffect } from 'react';
import ModalOficina from './ModalOficina';
import OficinaTableMUI from './OficinaTableMUI';
import LoadingSpinner from '../common/LoadingSpinner';
import { useToast, Button, Box } from '@chakra-ui/react';
import './Oficina.css';

const Oficina = () => {
  const toast = useToast();
  const [oficinas, setOficinas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  const showToast = () => {
    toast({
      title: 'Oficina registrada',
      description: 'La oficina se ha registrado correctamente.',
      status: 'success',
      duration: 3000,
      position: 'bottom-right',
      isClosable: true,
      containerStyle: {
        marginBottom: '20px',
      },
    });
  };

  const fetchOficinas = async () => {
    try {
      const response = await fetch('http://localhost:3000/oficina_tecnica');
      const data = await response.json();
      setOficinas(data);
      setLoading(false);
    } catch (err) {
      setError('Error al cargar las oficinas técnicas.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOficinas();
  }, []);

  const oficinasFiltradas = oficinas.filter(oficina =>
    oficina.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastOficina = (page + 1) * rowsPerPage;
  const indexOfFirstOficina = page * rowsPerPage;
  const oficinasActuales = oficinasFiltradas.slice(indexOfFirstOficina, indexOfLastOficina);

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

  const addOficina = async (nuevaOficina) => {
    try {
      const response = await fetch('http://localhost:3000/registrar_oficina', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevaOficina),
      });

      if (response.ok) {
        await fetchOficinas();
        setIsModalOpen(false);
        showToast();
      } else {
        console.error('Error al registrar la oficina técnica');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  return (
    <Box p={4}>
      <div className='titulo-container'>
        <h1 className='titulo-table'>Gestión de Oficinas</h1>
        <Button className='boton-table' colorScheme="blue" onClick={() => setIsModalOpen(true)}>
          + Nueva Oficina
        </Button>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <OficinaTableMUI
          oficinas={oficinasActuales}
          loading={loading}
          error={error}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          searchTerm={searchTerm}
          onSearchChange={handleSearch}
          totalOficinas={oficinasFiltradas.length}
        />
      )}

      {isModalOpen && (
        <ModalOficina
          closeModal={() => setIsModalOpen(false)}
          addOficina={addOficina}
        />
      )}
    </Box>
  );
};

export default Oficina;
