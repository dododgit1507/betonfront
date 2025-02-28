import React, { useState, useEffect } from 'react';
import ClientesModal from './ClientesModal';
import ClientesTabla from './ClientesTabla';
import LoadingSpinner from '../common/LoadingSpinner';
import { useToast } from '@chakra-ui/react'
import './Clientes.css';

const Clientes = () => {
  const toast = useToast();
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [clientesOrdenados, setClientesOrdenados] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const clientesPorPagina = 10;

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
  }

  // Función para obtener los clientes de la API
  const fetchClientes = async () => {
    try {
      const response = await fetch('http://localhost:3000/usuario'); // Actualiza la URL si es necesario
      if (!response.ok) throw new Error('Error al obtener los datos.');
      
      const data = await response.json();
      const clientesOrdenados = [...data].sort((a, b) => 
        a.nombre.localeCompare(b.nombre)
      );
      console.log('mostrando spinner');


      setTimeout(() => {
        setClientesOrdenados(clientesOrdenados);
        setClientes(clientesOrdenados);
        setLoading(false);
      }, 1000);

    } catch (err) {
      setError('Error al cargar los clientes.');
      setLoading(false);
    }
  };

  // Filtrar clientes basado en el término de búsqueda
  const clientesFiltrados = clientes.filter(cliente => 
    cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.telefono.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calcular índices para la paginación
  const indexOfLastCliente = currentPage * clientesPorPagina;
  const indexOfFirstCliente = indexOfLastCliente - clientesPorPagina;
  const clientesActuales = clientesFiltrados.slice(indexOfFirstCliente, indexOfLastCliente);

  // Cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Manejar cambios en la búsqueda
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Resetear a la primera página cuando se busca
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

      if (!response.ok) throw new Error('Error al registrar el cliente');
      
      await fetchClientes(); // Refrescar la lista de clientes
      setIsModalOpen(false);

      // Mostrar alerta de éxito usando SweetAlert2
      showToast();
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  return (
    <div className="table-container">
      <div className="table-header">
        <h1 className=''>Gestión de Clientes</h1>
        <button className='btn-nuevo' onClick={() => setIsModalOpen(true)}>Agregar Cliente</button>
      </div>
      <div className="search-container">
        <input
          type="text"
          placeholder="Buscar por nombre o teléfono..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
      </div>

      

      {loading ? (
          <LoadingSpinner />
        ) : (
          <ClientesTabla 
            clientes={clientesActuales} 
            loading={loading} 
            error={error} 
          />
        )}

      {!loading && !error && clientesFiltrados.length > 0 && (
        <div className="paginacion">
          {Array.from({ length: Math.ceil(clientesFiltrados.length / clientesPorPagina) }).map((_, index) => (
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
        <ClientesModal
          closeModal={() => setIsModalOpen(false)}
          addCliente={addCliente} 
        />
      )}
    </div>
  );
};

export default Clientes;
