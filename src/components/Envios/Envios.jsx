import React, { useState, useEffect } from 'react';
import TablaEnvios from './TablaEnvios';
import ModalEnvios from './ModalEnvios';
import LoadingSpinner from '../common/LoadingSpinner'; // Asegúrate de que exista este componente
import './Envios.css';
import { useToast } from '@chakra-ui/react'

const Envios = () => {
  const toast = useToast(); // Acceder al toast
  const [envios, setEnvios] = useState([]);
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedDay, setSelectedDay] = useState('');
  const enviosPorPagina = 15;


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
  }

  // Función para obtener los envíos de la API
  const fetchEnvios = async () => {
    try {
      const response = await fetch('http://localhost:3000/envio');
      const data = await response.json();
      
      // Añadimos un retraso artificial para mostrar el spinner
      setTimeout(() => {
        setEnvios(data);
        setLoading(false); // Desactivamos el estado de carga
      }, 1000);
    } catch (err) {
      setTimeout(() => {
        setError('Error al cargar los envíos.');
        setLoading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    fetchEnvios();
  }, []);

  // Obtener años únicos de los envíos
  const years = [...new Set(envios.map(envio => 
    new Date(envio.fecha_envio).getFullYear()
  ))].sort((a, b) => b - a);

  // Obtener meses únicos del año seleccionado
  const months = selectedYear ? 
    [...new Set(envios
      .filter(envio => new Date(envio.fecha_envio).getFullYear() === parseInt(selectedYear))
      .map(envio => new Date(envio.fecha_envio).getMonth() + 1)
    )].sort((a, b) => a - b) 
    : [];

  // Obtener días únicos del mes y año seleccionados
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

  // Filtrar envíos basado en búsqueda y fecha
  const enviosFiltrados = envios.filter(envio => {
    const cumpleBusqueda = envio.codigo_pedido.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (!selectedYear) return cumpleBusqueda;

    const fecha = new Date(envio.fecha_envio);
    const cumpleYear = fecha.getFullYear() === parseInt(selectedYear);
    const cumpleMes = !selectedMonth || (fecha.getMonth() + 1) === parseInt(selectedMonth);
    const cumpleDia = !selectedDay || fecha.getDate() === parseInt(selectedDay);

    return cumpleBusqueda && cumpleYear && cumpleMes && cumpleDia;
  });

  // Calcular índices para la paginación
  const indexOfLastEnvio = currentPage * enviosPorPagina;
  const indexOfFirstEnvio = indexOfLastEnvio - enviosPorPagina;
  const enviosActuales = enviosFiltrados.slice(indexOfFirstEnvio, indexOfLastEnvio);

  // Cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Manejar cambios en la búsqueda
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  // Manejar cambios en los filtros de fecha
  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
    setSelectedMonth('');
    setSelectedDay('');
    setCurrentPage(1);
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
    setSelectedDay('');
    setCurrentPage(1);
  };

  const handleDayChange = (e) => {
    setSelectedDay(e.target.value);
    setCurrentPage(1);
  };

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
        showToast();
      } else {
        console.error('Error al registrar el envío');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  return (
    <div className="envios-container">
      <div className="table-header">
        <h1>Gestión de Envíos</h1>
        <button className='btn-nuevo' onClick={() => setIsModalOpen(true)}>Agregar Envío</button>
      </div>
      <div className="filters-container">
        <div className="search-container">
          <input
            type="text"
            placeholder="Buscar por código de pedido..."
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
        </div>
        
        <div className="date-filters">
          <select 
            value={selectedYear} 
            onChange={handleYearChange}
            className="date-select"
          >
            <option value="">Año</option>
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>

          <select 
            value={selectedMonth} 
            onChange={handleMonthChange}
            className="date-select"
            disabled={!selectedYear}
          >
            <option value="">Mes</option>
            {months.map(month => (
              <option key={month} value={month}>
                {new Date(2000, month - 1).toLocaleString('es', { month: 'long' })}
              </option>
            ))}
          </select>

          <select 
            value={selectedDay} 
            onChange={handleDayChange}
            className="date-select"
            disabled={!selectedMonth}
          >
            <option value="">Día</option>
            {days.map(day => (
              <option key={day} value={day}>{day}</option>
            ))}
          </select>
        </div>
      </div>

      

      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <TablaEnvios 
            envios={enviosActuales} 
            loading={loading} 
            error={error} 
          />

          {/* Componente de paginación */}
          {!loading && !error && enviosFiltrados.length > 0 && (
            <div className="paginacion">
              {Array.from({ length: Math.ceil(enviosFiltrados.length / enviosPorPagina) }).map((_, index) => (
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
        </>
      )}

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
