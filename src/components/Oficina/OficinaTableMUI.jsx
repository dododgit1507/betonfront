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

const OficinaTableMUI = ({ 
  oficinas, 
  loading, 
  error,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  searchTerm,
  onSearchChange,
  totalOficinas
}) => {
  if (loading) {
    return <Typography>Cargando técnicos de oficina...</Typography>;
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
          placeholder="Buscar técnico especialista..."
          value={searchTerm}
          onChange={onSearchChange}
          size="small"
        />
      </Box>

      <StyledTableContainer component={Paper}>
        <Table stickyHeader aria-label="tabla de oficinas">
          <StyledTableHead>
            <TableRow>
              <TableCell style={{ minWidth: 150 }}>ID</TableCell>
              <TableCell style={{ minWidth: 200 }}>Nombre</TableCell>
              <TableCell style={{ minWidth: 150 }}>Especialidad</TableCell>
              <TableCell style={{ minWidth: 80 }}>Acciones</TableCell>
            </TableRow>
          </StyledTableHead>
          <TableBody>
            {oficinas.length > 0 ? (
              oficinas.map((oficina) => (
                <StyledTableRow key={oficina.id}>
                  <TableCell>{oficina.id}</TableCell>
                  <TableCell>{oficina.nombre}</TableCell>
                  <TableCell>{oficina.especialidad}</TableCell>
                  <TableCell>
                    <StyledIconButton aria-label="editar oficina">
                      <EditIcon />
                    </StyledIconButton>
                  </TableCell>
                </StyledTableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No hay oficinas registradas
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </StyledTableContainer>

      <TablePagination
        component="div"
        count={totalOficinas}
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

export default OficinaTableMUI;
