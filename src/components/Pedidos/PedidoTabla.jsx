import React from 'react';
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
    whiteSpace: 'nowrap',  
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    padding: '16px 24px',  
    position: 'sticky',    
    top: 0,
    zIndex: 1,
  }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
  },
  '& .MuiTableCell-root': {
    padding: '12px 24px',  
    whiteSpace: 'nowrap',  
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }
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
    }
  },
  '& .MuiInputBase-input': {
    padding: '12px 14px',
  }
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: 'blue',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
  }
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
  onEditClick
}) => {
  if (loading) {
    return <Typography>Cargando pedidos...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

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
          <StyledSelect
            value={selectedYear}
            onChange={onYearChange}
            displayEmpty
          >
            <MenuItem value="">Año</MenuItem>
            {years?.map(year => (
              <MenuItem key={year} value={year}>{year}</MenuItem>
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
            {months?.map(month => (
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
            {days?.map(day => (
              <MenuItem key={day} value={day}>{day}</MenuItem>
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
              <TableCell style={{ minWidth: 100 }}>Tipo</TableCell>
              <TableCell style={{ minWidth: 120 }}>Programa</TableCell>
              <TableCell style={{ minWidth: 150 }}>Oficina Técnica</TableCell>
              <TableCell style={{ minWidth: 100 }}>M2</TableCell>
              <TableCell style={{ minWidth: 100 }}>ML</TableCell>
              <TableCell style={{ minWidth: 100 }}>KG</TableCell>
              <TableCell style={{ minWidth: 100 }}>Frisos(ML)</TableCell>
              <TableCell style={{ minWidth: 100 }}>Chatas(KG)</TableCell>
              <TableCell style={{ minWidth: 120 }}>Fecha</TableCell>
              <TableCell style={{ minWidth: 120 }}>Hora</TableCell>
              <TableCell style={{ minWidth: 150 }}>Nivel</TableCell>
              <TableCell style={{ minWidth: 100 }}>Codigo Plano PL</TableCell>
              <TableCell style={{ minWidth: 100 }}>Planta</TableCell>
              <TableCell style={{ minWidth: 120 }}>Cliente</TableCell>
              <TableCell style={{ minWidth: 100 }}>CUP</TableCell>
              <TableCell style={{ minWidth: 100 }}>SUF</TableCell>
              <TableCell style={{ minWidth: 100 }}>Transporte</TableCell>
              <TableCell style={{ minWidth: 100 }}>Acciones</TableCell>
            </TableRow>
          </StyledTableHead>
          <TableBody>
            {pedidos.length > 0 ? (
              pedidos.map((pedido, index) => (
                <StyledTableRow key={pedido.codigo_pedido || index}>
                  <TableCell >{pedido.nombre_proyecto_cup}</TableCell>
                  <TableCell>{pedido.codigo_pedido}</TableCell>
                  <TableCell>{pedido.nombre_producto}</TableCell>
                  <TableCell>{pedido.oficina_especialidad}</TableCell>
                  <TableCell>{pedido.nombre_oficina}</TableCell>
                  <TableCell>{pedido.m2}</TableCell>
                  <TableCell>{pedido.ml}</TableCell>
                  <TableCell>{pedido.kg}</TableCell>
                  <TableCell>{pedido.frisos_ml}</TableCell>
                  <TableCell>{pedido.chatas_kg}</TableCell>
                  <TableCell>{new Date(pedido.fecha).toLocaleDateString()}</TableCell>
                  <TableCell>{pedido.hora}</TableCell>
                  <TableCell>{pedido.nivel}</TableCell>
                  <TableCell>{pedido.codigo_plano}</TableCell>
                  <TableCell>{pedido.planta}</TableCell>
                  <TableCell>{pedido.nombre_usuario}</TableCell>
                  <TableCell>{pedido.id_proyecto_cup}</TableCell>
                  <TableCell>{pedido.suf}</TableCell>
                  <TableCell>{pedido.nombre_transporte}</TableCell>
                  <TableCell>
                    <StyledIconButton 
                      onClick={() => onEditClick(pedido)}
                      size="small"
                    >
                      <EditIcon />
                    </StyledIconButton>
                  </TableCell>
                </StyledTableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={20} align="center">
                  No hay pedidos registrados
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={totalPedidos || 0}
          page={page}
          onPageChange={onPageChange}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={onRowsPerPageChange}
          labelRowsPerPage="Filas por página"
          labelDisplayedRows={({ from, to, count }) => 
            `${from}-${to} de ${count !== -1 ? count : `más de ${to}`}`
          }
        />
      </StyledTableContainer>
    </Box>
  );
};

export default PedidoTabla;
