import React, { useState, useEffect } from 'react';
import PedidosTabla from './PedidoTabla';
import PedidosModal from './PedidoModal';
import LoadingSpinner from '../common/LoadingSpinner';
import './Pedidos.css';
import { useToast, Button, Box } from '@chakra-ui/react';


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
  const pedidosPorPagina = 10;

  const username = localStorage.getItem('username'); //


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
  };

  useEffect(() => {
    toast({
      title: `Bienvenido a Betondecken, ${username}`,
      status: 'info',
      duration: 3000,
      position: 'bottom-right',
      isClosable: true,
      containerStyle: {
        marginBottom: '20px',
      },
    });
  }, [toast, username]);

  const userId = localStorage.getItem('userId');
  const userRole = localStorage.getItem('userRole');
  const token = localStorage.getItem('token');

  const fetchPedidos = async () => {
    try {
      const response = await fetch('http://localhost:3000/pedidos', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      const data = await response.json();
      if (!Array.isArray(data)) {
        throw new Error('La respuesta no es un array');
      }
  
      let pedidosFiltrados;
      if (userRole === 'ADMIN' || userRole === 'INGENIERO') {
        pedidosFiltrados = data;
      } else {
        pedidosFiltrados = data.filter(pedido =>
          pedido.nombre_usuario.toLowerCase() ===
          localStorage.getItem('username').toLowerCase()
        );
      }
  
      setPedidos(pedidosFiltrados);
      setProductos([...new Set(pedidosFiltrados.map(p => p.nombre_producto))]);
      setLoading(false);
    } catch (err) {
      setError(err.message);
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

  const indexOfLastPedido = currentPage * pedidosPorPagina;
  const indexOfFirstPedido = indexOfLastPedido - pedidosPorPagina;
  const pedidosActuales = pedidosFiltrados.slice(indexOfFirstPedido, indexOfLastPedido);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

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

  const handleProductoChange = (e) => {
    setSelectedProducto(e.target.value);
    setCurrentPage(1);
  };

  const addPedido = async (nuevoPedido) => {
    try {
      const response = await fetch('http://localhost:3000/registrar_pedido', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoPedido),
      });

      if (response.ok) {
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

  const handlePedidoUpdated = (updatedPedido) => {
    // Actualizar la lista de pedidos
    fetchPedidos();
    
    // Mostrar mensaje de éxito
    toast({
      title: 'Pedido actualizado',
      description: 'El pedido se ha actualizado correctamente.',
      status: 'success',
      duration: 3000,
      position: 'bottom-right',
      isClosable: true,
      containerStyle: {
        marginBottom: '20px',
      },
    });
  };

  return (
    <Box p={4}>
      <div className="titulo-container">
        <h1 className='titulo-table'>Gestión de Pedidos</h1>
        <button className='boton-table' onClick={() => setIsModalOpen(true)}> + Agregar Pedido</button>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <PedidosTabla
          pedidos={pedidosActuales}
          loading={loading}
          error={error}
          page={currentPage - 1}
          rowsPerPage={pedidosPorPagina}
          onPageChange={(event, newPage) => setCurrentPage(newPage + 1)}
          onRowsPerPageChange={(event) => {
            setPedidosPorPagina(parseInt(event.target.value, 10));
            setCurrentPage(1);
          }}
          searchTerm={searchTerm}
          onSearchChange={handleSearch}
          totalPedidos={pedidosFiltrados.length}
          years={years}
          months={months}
          days={days}
          selectedYear={selectedYear}
          selectedMonth={selectedMonth}
          selectedDay={selectedDay}
          onYearChange={handleYearChange}
          onMonthChange={handleMonthChange}
          onDayChange={handleDayChange}
          onPedidoUpdated={handlePedidoUpdated}
        />
      )}

      <PedidosModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        addPedido={addPedido}
      />
    </Box>
  );
};

export default Pedidos;
