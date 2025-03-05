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
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

// Estilos personalizados
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

const ClienteTableMUI = ({ 
  clientes, 
  loading, 
  error,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  searchTerm,
  onSearchChange,
  totalClientes
}) => {
  if (loading) {
    return <Typography>Cargando clientes...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ mb: 3 }}>
        <StyledSearchField
          fullWidth
          variant="outlined"
          placeholder="Buscar por nombre o teléfono..."
          value={searchTerm}
          onChange={onSearchChange}
          size="small"
        />
      </Box>

      <StyledTableContainer component={Paper}>
        <Table stickyHeader aria-label="tabla de clientes">
          <StyledTableHead>
            <TableRow>
              <TableCell style={{ minWidth: 200 }}>Nombre</TableCell>
              <TableCell style={{ minWidth: 150 }}>Teléfono</TableCell>
              <TableCell style={{ minWidth: 200 }}>Correo</TableCell>
              <TableCell style={{ minWidth: 150 }}>Rol</TableCell>
              <TableCell style={{ minWidth: 150 }}>País</TableCell>
              <TableCell style={{ minWidth: 80 }}>Acciones</TableCell>
            </TableRow>
          </StyledTableHead>
          <TableBody>
            {clientes.length > 0 ? (
              clientes.map((cliente) => (
                <StyledTableRow
                  key={cliente.id || cliente.nombre}
                >
                  <TableCell>{cliente.nombre}</TableCell>
                  <TableCell>{cliente.telefono}</TableCell>
                  <TableCell>{cliente.correo}</TableCell>
                  <TableCell>{cliente.rol}</TableCell>
                  <TableCell>{cliente.pais}</TableCell>
                  <TableCell align="left">
                    <StyledIconButton aria-label="editar cliente">
                      <EditIcon />
                    </StyledIconButton>
                  </TableCell>
                </StyledTableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No hay clientes registrados
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </StyledTableContainer>

      <TablePagination
        component="div"
        count={totalClientes}
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

export default ClienteTableMUI;
