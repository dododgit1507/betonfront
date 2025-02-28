import React, { useState, useEffect } from 'react';
import PedidosTabla from './PedidoTabla';
import PedidosModal from './PedidoModal';
import LoadingSpinner from '../common/LoadingSpinner';
import './Pedidos.css';
import { useToast } from '@chakra-ui/react'

const Pedidos = () => {
  const toast = useToast();
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedProducto, setSelectedProducto] = useState('');
  const [productos, setProductos] = useState([]);
  const pedidosPorPagina = 15;

  const showToast = () => {
    toast({
      title: 'Pedido registrado',
      description: 'El pedido se ha registrado correctamente.',
      status: 'success',
      duration: 3000,
      position: 'bottom-right',
      isClosable: true,
      containerStyle: {
        marginBottom: '20px',
      },
    });
  }

  // Función para obtener los pedidos de la API
  const fetchPedidos = async () => {
    try {
      const response = await fetch('http://localhost:3000/pedidos');
      const data = await response.json();
      setPedidos(data);

      setTimeout(() => {
        const productosUnicos = [...new Set(data.map(pedido => pedido.nombre_producto))];
        setProductos(productosUnicos.sort());
        
        setLoading(false);
      }, 1000);   

    } catch (err) {
      setError('Error al cargar los pedidos.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPedidos();
  }, []);

  // Obtener años únicos de los pedidos
  const years = [...new Set(pedidos.map(pedido => 
    new Date(pedido.fecha).getFullYear()
  ))].sort((a, b) => b - a);

  // Obtener meses únicos del año seleccionado
  const months = selectedYear ? 
    [...new Set(pedidos
      .filter(pedido => new Date(pedido.fecha).getFullYear() === parseInt(selectedYear))
      .map(pedido => new Date(pedido.fecha).getMonth() + 1)
    )].sort((a, b) => a - b) 
    : [];

  // Obtener días únicos del mes y año seleccionados
  const days = selectedYear && selectedMonth ?
    [...new Set(pedidos
      .filter(pedido => {
        const fecha = new Date(pedido.fecha);
        return fecha.getFullYear() === parseInt(selectedYear) && 
               (fecha.getMonth() + 1) === parseInt(selectedMonth);
      })
      .map(pedido => new Date(pedido.fecha).getDate())
    )].sort((a, b) => a - b)
    : [];

  // Filtrar pedidos basado en búsqueda, fecha y producto
  const pedidosFiltrados = pedidos.filter(pedido => {
    const searchMatch = 
      pedido.nombre_proyecto_cup.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pedido.nombre_usuario.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pedido.codigo_pedido.toLowerCase().includes(searchTerm.toLowerCase());

    if (!searchMatch) return false;

    if (selectedProducto && pedido.nombre_producto !== selectedProducto) {
      return false;
    }

    if (!selectedYear) return true;

    const fecha = new Date(pedido.fecha);
    const cumpleYear = fecha.getFullYear() === parseInt(selectedYear);
    const cumpleMes = !selectedMonth || (fecha.getMonth() + 1) === parseInt(selectedMonth);
    const cumpleDia = !selectedDay || fecha.getDate() === parseInt(selectedDay);

    return cumpleYear && cumpleMes && cumpleDia;
  });

  // Calcular índices para la paginación
  const indexOfLastPedido = currentPage * pedidosPorPagina;
  const indexOfFirstPedido = indexOfLastPedido - pedidosPorPagina;
  const pedidosActuales = pedidosFiltrados.slice(indexOfFirstPedido, indexOfLastPedido);

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

  // Manejar cambio de producto
  const handleProductoChange = (e) => {
    setSelectedProducto(e.target.value);
    setCurrentPage(1);
  };

  // Función para agregar un nuevo pedido y actualizar la tabla
  const addPedido = async (nuevoPedido) => {
    try {
      const response = await fetch('http://localhost:3000/registrar_pedido', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoPedido),
      });

      if (response.ok) {
        // Si el pedido se agrega correctamente, obtenemos la lista actualizada
        await fetchPedidos(); // Llamamos a la API nuevamente para obtener los pedidos actualizados
        setIsModalOpen(false);
        showToast(); // Cerramos el modal
      } else {
        console.error('Error al registrar el pedido');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  return (
    <div className="pedidos-container">
      <div className="table-header">
        <h1>Gestión de Pedidos</h1>
        <button className='btn-nuevo' onClick={() => setIsModalOpen(true)}>Agregar Pedido</button>
      </div>
      <div className="filters-container">
        <div className="search-container">
          <input
            type="text"
            placeholder="Buscar por nombre de proyecto, usuario o código de pedido..."
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
        </div>
        
        <div className="filters-row">
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

          <div className="producto-filter">
            <select
              value={selectedProducto}
              onChange={handleProductoChange}
              className="producto-select"
            >
              <option value="">Tipo de Producto</option>
              {productos.map(producto => (
                <option key={producto} value={producto}>{producto}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      

      {loading ? (
        <LoadingSpinner/>
      ) : (
        <PedidosTabla 
          pedidos={pedidosActuales} 
          loading={loading} 
          error={error} 
        />
      )}

      {/* Componente de paginación */}
      {!loading && !error && pedidosFiltrados.length > 0 && (
        <div className="paginacion">
          {Array.from({ length: Math.ceil(pedidosFiltrados.length / pedidosPorPagina) }).map((_, index) => (
            <button
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
        <PedidosModal
          closeModal={() => setIsModalOpen(false)}
          addPedido={addPedido}
        />
      )}
    </div>
  );
};

export default Pedidos;