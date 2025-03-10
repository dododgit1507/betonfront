import React, { useState, useEffect } from 'react';
import EnvioTableMUI from './EnvioTableMUI';
import ModalEnvios from './ModalEnvios';
import LoadingSpinner from '../common/LoadingSpinner';
import { useToast, Button, Box } from '@chakra-ui/react';
import './Envios.css';

const Envios = () => {
  const toast = useToast();
  const [envios, setEnvios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedDay, setSelectedDay] = useState('');

  const showToast = () => {
    toast({
      title: 'Envío registrado',
      description: 'El envío se ha registrado correctamente.',
      status: 'success',
      duration: 3000,
      position: 'bottom-right',
      isClosable: true,
      containerStyle: {
        marginBottom: '20px',
      },
    });
  };

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

  useEffect(() => {
    fetchEnvios();
  }, []);

  const years = [...new Set(envios.map(envio => 
    new Date(envio.fecha_envio).getFullYear()
  ))].sort((a, b) => b - a);

  const months = selectedYear ? 
    [...new Set(envios
      .filter(envio => new Date(envio.fecha_envio).getFullYear() === parseInt(selectedYear))
      .map(envio => new Date(envio.fecha_envio).getMonth() + 1)
    )].sort((a, b) => a - b) 
    : [];

  const days = selectedYear && selectedMonth ?
    [...new Set(envios
      .filter(envio => {
        const fecha = new Date(envio.fecha_envio);
        return fecha.getFullYear() === parseInt(selectedYear) && 
               (fecha.getMonth() + 1) === parseInt(selectedMonth);
      })
      .map(envio => new Date(envio.fecha_envio).getDate())
    )].sort((a, b) => a - b)
    : [];

  const enviosFiltrados = envios.filter(envio => {
    const cumpleBusqueda = envio.codigo_pedido.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (!selectedYear) return cumpleBusqueda;

    const fecha = new Date(envio.fecha_envio);
    const cumpleYear = fecha.getFullYear() === parseInt(selectedYear);
    const cumpleMes = !selectedMonth || (fecha.getMonth() + 1) === parseInt(selectedMonth);
    const cumpleDia = !selectedDay || fecha.getDate() === parseInt(selectedDay);

    return cumpleBusqueda && cumpleYear && cumpleMes && cumpleDia;
  });

  const indexOfLastEnvio = (page + 1) * rowsPerPage;
  const indexOfFirstEnvio = page * rowsPerPage;
  const enviosActuales = enviosFiltrados.slice(indexOfFirstEnvio, indexOfLastEnvio);

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

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
    setSelectedMonth('');
    setSelectedDay('');
    setPage(0);
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
    setSelectedDay('');
    setPage(0);
  };

  const handleDayChange = (e) => {
    setSelectedDay(e.target.value);
    setPage(0);
  };

  const addEnvio = async (nuevoEnvio) => {
    try {
      const response = await fetch('http://localhost:3000/registrar_envio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoEnvio),
      });

      if (response.ok) {
        await fetchEnvios();
        setIsModalOpen(false);
        showToast();
      } else {
        console.error('Error al registrar el envío');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  return (
    <Box p={4}>
      <div className='titulo-container'>
        <h1 className='titulo-table'>Gestión de Envios</h1>
        <Button className='boton-table' colorScheme="blue" onClick={() => setIsModalOpen(true)}>
          + Agregar Envío
        </Button>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <EnvioTableMUI
          envios={enviosActuales}
          loading={loading}
          error={error}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          searchTerm={searchTerm}
          onSearchChange={handleSearch}
          totalEnvios={enviosFiltrados.length}
          years={years}
          months={months}
          days={days}
          selectedYear={selectedYear}
          selectedMonth={selectedMonth}
          selectedDay={selectedDay}
          onYearChange={handleYearChange}
          onMonthChange={handleMonthChange}
          onDayChange={handleDayChange}
        />
      )}

      {isModalOpen && (
        <ModalEnvios
          closeModal={() => setIsModalOpen(false)}
          addEnvio={addEnvio}
        />
      )}
    </Box>
  );
};

export default Envios;
