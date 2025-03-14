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
  TextField,
  Box,
  Typography,
  styled,
  CircularProgress
} from '@mui/material';
import axios from 'axios';
import './Auditoria.css';

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

export default function Auditoria() {
  const [auditorias, setAuditorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [totalAuditorias, setTotalAuditorias] = useState(0);

  useEffect(() => {
    const fetchAuditorias = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:3000/auditorias');
        setAuditorias(response.data);
        setTotalAuditorias(response.data.length);
        setLoading(false);
      } catch (err) {
        setError('Error al cargar los datos de auditoría: ' + err.message);
        setLoading(false);
      }
    };

    fetchAuditorias();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  // Filtrar auditorías según el término de búsqueda
  const filteredAuditorias = auditorias.filter(auditoria => 
    auditoria.tipo_accion?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    auditoria.codigo_pedido?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    auditoria.nombre_usuario?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    auditoria.nombre_ingeniero?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Paginación
  const paginatedAuditorias = filteredAuditorias.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  // Formatear fecha para mostrar en formato dd/mm/yyyy
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES');
  };

  return (
    <div className="table-container">
      <div className="table-header-auditoria">
        <h1>Auditoría de Pedidos</h1>
      </div>

      <Box sx={{ width: '100%' }}>
        <Box sx={{ mb: 3 }}>
          <StyledSearchField
            fullWidth
            variant="outlined"
            placeholder="Buscar auditoría..."
            value={searchTerm}
            onChange={handleSearchChange}
            size="small"
          />
        </Box>

        <StyledTableContainer component={Paper}>
          <Table stickyHeader aria-label="tabla de auditorías">
            <StyledTableHead>
              <TableRow>
                <TableCell style={{ minWidth: 80 }}>ID</TableCell>
                <TableCell style={{ minWidth: 150 }}>Tipo de Acción</TableCell>
                <TableCell style={{ minWidth: 120 }}>Fecha</TableCell>
                <TableCell style={{ minWidth: 120 }}>Hora</TableCell>
                <TableCell style={{ minWidth: 150 }}>Código de Pedido</TableCell>
                <TableCell style={{ minWidth: 180 }}>Usuario</TableCell>
                <TableCell style={{ minWidth: 180 }}>Ingeniero</TableCell>
              </TableRow>
            </StyledTableHead>
            <TableBody>
              {paginatedAuditorias.length > 0 ? (
                paginatedAuditorias.map((auditoria) => (
                  <StyledTableRow key={auditoria.id_auditoria}>
                    <TableCell>{auditoria.id_auditoria}</TableCell>
                    <TableCell>{auditoria.tipo_accion}</TableCell>
                    <TableCell>{formatDate(auditoria.fecha)}</TableCell>
                    <TableCell>{auditoria.hora}</TableCell>
                    <TableCell>{auditoria.codigo_pedido}</TableCell>
                    <TableCell>{auditoria.nombre_usuario || 'No asignado'}</TableCell>
                    <TableCell>{auditoria.nombre_ingeniero || 'No asignado'}</TableCell>
                  </StyledTableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    No hay registros de auditoría disponibles
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </StyledTableContainer>

        <TablePagination
          component="div"
          count={filteredAuditorias.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
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
    </div>
  );
}
