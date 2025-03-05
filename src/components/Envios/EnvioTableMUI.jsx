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
  InputLabel,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  borderRadius: '10px',
  overflow: 'auto',
  maxWidth: '100%',
  '& table': {
    tableLayout: 'fixed',
  },
  '@media (max-width: 600px)': {
    '& table': {
      '& th, & td': {
        minWidth: '150px',
        padding: '8px 16px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      },
    },
  },
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
    padding: '12px 16px',
    '@media (max-width: 600px)': {
      padding: '8px 4px',
      fontSize: '0.85rem',
    },
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

const EnvioTableMUI = ({ 
  envios, 
  loading, 
  error,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  searchTerm,
  onSearchChange,
  totalEnvios,
  years,
  months,
  days,
  selectedYear,
  selectedMonth,
  selectedDay,
  onYearChange,
  onMonthChange,
  onDayChange
}) => {
  if (loading) {
    return <Typography>Cargando envíos...</Typography>;
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
            {years.map(year => (
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
            {months.map(month => (
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
            {days.map(day => (
              <MenuItem key={day} value={day}>{day}</MenuItem>
            ))}
          </StyledSelect>
        </FormControl>
      </Box>

      <StyledTableContainer component={Paper}>
        <Table stickyHeader aria-label="tabla de envíos">
          <StyledTableHead>
            <TableRow>
              <TableCell style={{ minWidth: 150 }}>ID</TableCell>
              <TableCell style={{ minWidth: 150 }}>Fecha Envío</TableCell>
              <TableCell style={{ minWidth: 150 }}>Observación</TableCell>
              <TableCell style={{ minWidth: 150 }}>Valoración</TableCell>
              <TableCell style={{ minWidth: 200 }}>Facturado</TableCell>
              <TableCell style={{ minWidth: 150 }}>Pagado</TableCell>
              <TableCell style={{ minWidth: 150 }}>Codigo de Pedido</TableCell>
              <TableCell style={{ minWidth: 80 }}>Acciones</TableCell>
            </TableRow>
          </StyledTableHead>
          <TableBody>
            {envios.length > 0 ? (
              envios.map((envio) => (
                <StyledTableRow key={envio.id || envio.codigo_pedido}>
                  <TableCell>{envio.id_envio}</TableCell>
                  <TableCell>{new Date(envio.fecha_envio).toLocaleDateString()}</TableCell>
                  <TableCell>{envio.observacion}</TableCell>
                  <TableCell>{envio.valorizado}</TableCell>
                  <TableCell>{envio.facturado}</TableCell>
                  <TableCell>{envio.pagado}</TableCell>
                  <TableCell>{envio.codigo_pedido}</TableCell>
                  <TableCell>
                    <StyledIconButton aria-label="editar envío">
                      <EditIcon />
                    </StyledIconButton>
                  </TableCell>
                </StyledTableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No hay envíos registrados
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </StyledTableContainer>

      <TablePagination
        component="div"
        count={totalEnvios}
        page={page}
        onPageChange={onPageChange}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={onRowsPerPageChange}
        labelRowsPerPage="Filas por página"
        labelDisplayedRows={({ from, to, count }) => 
          `${from}-${to} de ${count !== -1 ? count : `más de ${to}`}`
        }
        sx={{
          '.MuiTablePagination-select': {
            paddingTop: '0.5rem',
          }
        }}
      />
    </Box>
  );
};

export default EnvioTableMUI;
