import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  IconButton,
  TextField,
  Box,
  Typography,
  styled,
  Select,
  MenuItem,
  FormControl,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ModalEditar from './ModalEditar'; // Importa el modal aquí

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  borderRadius: '10px',
  overflow: 'auto',
  maxWidth: '100%',
  maxHeight: 'calc(100vh - 300px)', 
  '& table': {
    minWidth: '1200px', 
  },
  '& .MuiTableCell-root': {
    whiteSpace: 'nowrap',  
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '200px',     
    padding: '16px 24px',  
  }
}));

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  '& .MuiTableCell-head': {
    backgroundColor: '#A65248',
    color: '#F0F1F1',
    fontWeight: '600',
    fontSize: '0.95rem',
    padding: '16px',
    whiteSpace: 'nowrap',
    '@media (max-width: 600px)': {
      fontSize: '0.85rem',
      padding: '8px 4px',
    },
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
  },
  '& .MuiTableCell-root': {
    padding: '12px 16px',
    '@media (max-width: 600px)': {
      padding: '8px 4px',
      fontSize: '0.85rem',
    },
  },
}));

const StyledSearchField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    backgroundColor: 'white',
    '& fieldset': {
      borderColor: theme.palette.primary.main,
    },
    '&:hover fieldset': {
      borderColor: theme.palette.primary.dark,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
      borderWidth: '2px',
    },
  },
  '& .MuiInputBase-input': {
    padding: '12px 14px',
  },
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: 'blue',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
  },
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  minWidth: 120,
  marginRight: theme.spacing(2),
  backgroundColor: 'white',
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.primary.main,
  },
}));

const PedidoTabla = ({
  pedidos,
  loading,
  error,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  searchTerm,
  onSearchChange,
  totalPedidos,
  years,
  months,
  days,
  selectedYear,
  selectedMonth,
  selectedDay,
  onYearChange,
  onMonthChange,
  onDayChange,
  onPedidoUpdated // Nuevo prop para manejar la actualización
}) => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedPedido, setSelectedPedido] = useState(null);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    // Obtener el rol del usuario desde localStorage
    const storedUserRole = localStorage.getItem('userRole');
    setUserRole(storedUserRole);
  }, []);

  if (loading) {
    return <Typography>Cargando pedidos...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  const handleEditClick = (pedido) => {
    setSelectedPedido(pedido);
    setEditModalOpen(true);
  };

  const handleEditClose = () => {
    setEditModalOpen(false);
    setSelectedPedido(null);
  };

  const handlePedidoUpdated = (updatedPedido) => {
    if (onPedidoUpdated) {
      onPedidoUpdated(updatedPedido);
    }
    handleEditClose();
  };

  // Determinar qué columnas mostrar según el rol del usuario
  const isClienteRole = userRole === 'CLIENTE';

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ mb: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <StyledSearchField
          sx={{ flex: 1, minWidth: '200px' }}
          variant="outlined"
          placeholder="Buscar por código de pedido..."
          value={searchTerm}
          onChange={onSearchChange}
          size="small"
        />
        <FormControl size="small">
          <StyledSelect value={selectedYear} onChange={onYearChange} displayEmpty>
            <MenuItem value="">Año</MenuItem>
            {years?.map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </StyledSelect>
        </FormControl>

        <FormControl size="small">
          <StyledSelect
            value={selectedMonth}
            onChange={onMonthChange}
            displayEmpty
            disabled={!selectedYear}
          >
            <MenuItem value="">Mes</MenuItem>
            {months?.map((month) => (
              <MenuItem key={month} value={month}>
                {new Date(2000, month - 1).toLocaleString('es', { month: 'long' })}
              </MenuItem>
            ))}
          </StyledSelect>
        </FormControl>

        <FormControl size="small">
          <StyledSelect
            value={selectedDay}
            onChange={onDayChange}
            displayEmpty
            disabled={!selectedMonth}
          >
            <MenuItem value="">Día</MenuItem>
            {days?.map((day) => (
              <MenuItem key={day} value={day}>
                {day}
              </MenuItem>
            ))}
          </StyledSelect>
        </FormControl>
      </Box>

      <StyledTableContainer component={Paper}>
        <Table stickyHeader aria-label="tabla de pedidos">
          <StyledTableHead>
            <TableRow>
              <TableCell style={{ minWidth: 150 }}>Proyecto</TableCell>
              <TableCell style={{ minWidth: 150 }}>Código</TableCell>
              {!isClienteRole && <TableCell style={{ minWidth: 100 }}>Tipo</TableCell>}
              {!isClienteRole && <TableCell style={{ minWidth: 120 }}>Programa</TableCell>}
              {!isClienteRole && <TableCell style={{ minWidth: 150 }}>Oficina Técnica</TableCell>}
              <TableCell style={{ minWidth: 100 }}>M2</TableCell>
              <TableCell style={{ minWidth: 100 }}>ML</TableCell>
              {!isClienteRole && <TableCell style={{ minWidth: 100 }}>KG</TableCell>}
              <TableCell style={{ minWidth: 100 }}>Frisos(ML)</TableCell>
              {!isClienteRole && <TableCell style={{ minWidth: 100 }}>Chatas(KG)</TableCell>}
              {!isClienteRole && <TableCell style={{ minWidth: 100 }}>Unidades</TableCell>}
              {!isClienteRole && <TableCell style={{ minWidth: 100 }}>Especiales</TableCell>}
              <TableCell style={{ minWidth: 120 }}>Fecha</TableCell>
              <TableCell style={{ minWidth: 120 }}>Ingeniero</TableCell>
              <TableCell style={{ minWidth: 120 }}>Hora</TableCell>
              {!isClienteRole && <TableCell style={{ minWidth: 120 }}>Piso</TableCell>}
              {!isClienteRole && <TableCell style={{ minWidth: 150 }}>Nivel</TableCell>}
              {!isClienteRole && <TableCell style={{ minWidth: 100 }}>Codigo Plano PL</TableCell>}
              {!isClienteRole && <TableCell style={{ minWidth: 100 }}>Planta</TableCell>}
              {!isClienteRole && <TableCell style={{ minWidth: 120 }}>Cliente</TableCell>}
              {!isClienteRole && <TableCell style={{ minWidth: 100 }}>CUP</TableCell>}
              {!isClienteRole && <TableCell style={{ minWidth: 100 }}>SUF</TableCell>}
              {!isClienteRole && <TableCell style={{ minWidth: 100 }}>Transporte</TableCell>}
              <TableCell style={{ minWidth: 100 }}>Acciones</TableCell>
            </TableRow>
          </StyledTableHead>
          <TableBody>
            {pedidos.length > 0 ? (
              pedidos.map((pedido, index) => (
                <StyledTableRow key={pedido.codigo_pedido || index}>
                  <TableCell>{pedido.nombre_proyecto_cup}</TableCell>
                  <TableCell>{pedido.codigo_pedido}</TableCell>
                  {!isClienteRole && <TableCell>{pedido.nombre_producto}</TableCell>}
                  {!isClienteRole && <TableCell>{pedido.oficina_especialidad}</TableCell>}
                  {!isClienteRole && <TableCell>{pedido.nombre_oficina}</TableCell>}
                  <TableCell>{pedido.m2}</TableCell>
                  <TableCell>{pedido.ml}</TableCell>
                  {!isClienteRole && <TableCell>{pedido.kg}</TableCell>}
                  <TableCell>{pedido.frisos_ml}</TableCell>
                  {!isClienteRole && <TableCell>{pedido.chatas_kg}</TableCell>}
                  {!isClienteRole && <TableCell>{pedido.unidades}</TableCell>}
                  {!isClienteRole && <TableCell>{pedido.especiales}</TableCell>}
                  <TableCell>{new Date(pedido.fecha).toLocaleDateString()}</TableCell>
                  <TableCell>{pedido.nombre_ingeniero}</TableCell>
                  <TableCell>{pedido.hora}</TableCell>
                  {!isClienteRole && <TableCell>{pedido.piso}</TableCell>}
                  {!isClienteRole && <TableCell>{pedido.nivel}</TableCell>}
                  {!isClienteRole && <TableCell>{pedido.codigo_plano}</TableCell>}
                  {!isClienteRole && <TableCell>{pedido.planta}</TableCell>}
                  {!isClienteRole && <TableCell>{pedido.nombre_usuario}</TableCell>}
                  {!isClienteRole && <TableCell>{pedido.id_proyecto_cup}</TableCell>}
                  {!isClienteRole && <TableCell>{pedido.suf}</TableCell>}
                  {!isClienteRole && <TableCell>{pedido.nombre_transporte}</TableCell>}
                  <TableCell>
                    <StyledIconButton onClick={() => handleEditClick(pedido)}>
                      <EditIcon />
                    </StyledIconButton>
                  </TableCell>
                </StyledTableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={isClienteRole ? 9 : 24}>No se encontraron pedidos.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </StyledTableContainer>

      <TablePagination
        component="div"
        count={totalPedidos}
        page={page}
        onPageChange={onPageChange}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={onRowsPerPageChange}
        labelRowsPerPage="Filas por página"
        labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
      />

      {editModalOpen && (
        <ModalEditar
          open={editModalOpen}
          onClose={handleEditClose}
          pedido={selectedPedido}
          onSave={handlePedidoUpdated}
        />
      )}
    </Box>
  );
};

export default PedidoTabla;
