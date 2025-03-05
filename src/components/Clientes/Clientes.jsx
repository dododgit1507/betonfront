import React, { useState, useEffect } from 'react';
import ClientesModal from './ClientesModal';
import ClienteTableMUI from './ClienteTableMUI';
import LoadingSpinner from '../common/LoadingSpinner';
import { useToast, Button, Box } from '@chakra-ui/react';
import './Clientes.css';

const Clientes = () => {
  const toast = useToast();
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  const showToast = () => {
    toast({
      title: 'Cliente registrado',
      description: 'El cliente se ha registrado correctamente.',
      status: 'success',
      duration: 3000,
      position: 'bottom-right',
      isClosable: true,
      containerStyle: {
        marginBottom: '20px',
      },
    });
  };

  const fetchClientes = async () => {
    try {
      const response = await fetch('http://localhost:3000/usuario');
      if (!response.ok) throw new Error('Error al obtener los datos.');
      
      const data = await response.json();
      const clientesOrdenados = [...data].sort((a, b) => 
        a.nombre.localeCompare(b.nombre)
      );
      
      setClientes(clientesOrdenados);
      setLoading(false);
    } catch (err) {
      setError('Error al cargar los clientes.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  const clientesFiltrados = clientes.filter(cliente => 
    cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.telefono.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastCliente = (page + 1) * rowsPerPage;
  const indexOfFirstCliente = page * rowsPerPage;
  const clientesActuales = clientesFiltrados.slice(indexOfFirstCliente, indexOfLastCliente);

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

  const addCliente = async (nuevoCliente) => {
    try {
      const response = await fetch('http://localhost:3000/registrar_cliente', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoCliente),
      });

      if (!response.ok) throw new Error('Error al registrar el cliente');
      
      await fetchClientes();
      setIsModalOpen(false);
      showToast();
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  return (
    <Box p={4}>
      <div className='titulo-container'>
        <h1 className='titulo-table'>Gestión de Clientes</h1>
        <Button className='boton-table' colorScheme="blue" onClick={() => setIsModalOpen(true)}>
          + Agregar Cliente
        </Button>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <ClienteTableMUI
          clientes={clientesActuales}
          loading={loading}
          error={error}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          searchTerm={searchTerm}
          onSearchChange={handleSearch}
          totalClientes={clientesFiltrados.length}
        />
      )}

      {isModalOpen && (
        <ClientesModal
          closeModal={() => setIsModalOpen(false)}
          addCliente={addCliente}
        />
      )}
    </Box>
  );
};

export default Clientes;