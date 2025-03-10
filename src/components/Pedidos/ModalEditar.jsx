import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Box,
  Modal,
} from '@mui/material';

const ModalEditar = ({ open, onClose, pedido, onSave }) => {
  // Función para convertir la fecha al formato 'YYYY-MM-DD'
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (`0${date.getMonth() + 1}`).slice(-2); // Asegurarse de tener dos dígitos para el mes
    const day = (`0${date.getDate()}`).slice(-2); // Asegurarse de tener dos dígitos para el día
    return `${year}-${month}-${day}`;
  };

  const [formValues, setFormValues] = useState({
    nombre_proyecto_cup: pedido?.nombre_proyecto_cup || '',
    codigo_pedido: pedido?.codigo_pedido || '',
    nombre_producto: pedido?.nombre_producto || '',
    oficina_especialidad: pedido?.oficina_especialidad || '',
    nombre_oficina: pedido?.nombre_oficina || '',
    m2: pedido?.m2 || '',
    ml: pedido?.ml || '',
    kg: pedido?.kg || '',
    frisos_ml: pedido?.frisos_ml || '',
    chatas_kg: pedido?.chatas_kg || '',
    fecha: formatDate(pedido?.fecha) || '',  // Convertir la fecha al formato correcto
    hora: pedido?.hora || '',
    nivel: pedido?.nivel || '',
    codigo_plano: pedido?.codigo_plano || '',
    planta: pedido?.planta || '',
    nombre_usuario: pedido?.nombre_usuario || '',
    id_proyecto_cup: pedido?.id_proyecto_cup || '',
    suf: pedido?.suf || '',
    nombre_transporte: pedido?.nombre_transporte || ''
  });

  const [userRole, setUserRole] = useState('');
  const [disableDate, setDisableDate] = useState(false);
  const [modalCodigoOpen, setModalCodigoOpen] = useState(false);
  const [codigoValidacion, setCodigoValidacion] = useState('');

  useEffect(() => {
    const storedUserRole = localStorage.getItem('userRole');
    setUserRole(storedUserRole);

    // Verificar si el usuario es Cliente y si la fecha debe ser bloqueada
    if (storedUserRole === 'Cliente') {
      const currentDate = new Date();
      const orderDate = new Date(pedido?.fecha);
      const timeDiff = orderDate - currentDate;
      const daysDiff = timeDiff / (1000 * 60 * 60 * 24); // Convertir a días

      if (daysDiff <= 1.5) {
        setDisableDate(true);
      }
    } else if (storedUserRole === 'INGENIERO') {
      // Si es Ingeniero, bloquear solo la fecha hasta que se ingrese el código de validación
      setDisableDate(true);
    }
  }, [pedido]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSave = async () => {
    try {
      console.log('Datos que se están enviando al backend:', formValues);
      const encodedCodigoPedido = encodeURIComponent(formValues.codigo_pedido);
      const response = await fetch(`http://localhost:3000/actualizar_pedido/${encodedCodigoPedido}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
      });

      if (response.ok) {
        const updatedPedido = await response.json();
        onSave(updatedPedido); // Llama a la función onSave para manejar la actualización en el padre
        onClose(); // Cerrar modal
      } else {
        console.error('Error al actualizar el pedido');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  const handleFechaClick = () => {
    // Mostrar el modal para el código de validación solo si el usuario es Ingeniero
    if (userRole === 'INGENIERO') {
      setModalCodigoOpen(true);
    }
  };

  const handleCodigoValidacion = async () => {
    try {
      const userId = localStorage.getItem('userId'); // Obtén el usuarioId del localStorage
      if (!userId) {
        alert('No se pudo obtener el ID de usuario');
        return;
      }
  
      const data = {
        codigo: codigoValidacion,
        usuarioId: userId, // Usar el ID del usuario almacenado
      };
  
      // Agregar console.log para verificar los datos que se enviarán al backend
      console.log('Datos enviados al backend:', data);
  
      const response = await fetch('http://localhost:3000/verificar_codigo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
  
      if (response.ok && result.success) {
        setDisableDate(false);
        setModalCodigoOpen(false);
        alert('Código válido');
      } else {
        alert(result.message || 'Código de validación incorrecto');
      }
    } catch (error) {
      console.error('Error al validar el código:', error);
      alert('Hubo un error al validar el código. Inténtalo de nuevo más tarde.');
    }
  };
  
  
  
  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
        <DialogTitle>Editar Pedido</DialogTitle>
        <DialogContent>
          <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={2}>
            <TextField
              name="nombre_proyecto_cup"
              label="Proyecto"
              value={formValues.nombre_proyecto_cup}
              onChange={handleInputChange}
              fullWidth
              disabled={userRole === 'Cliente'}
            />
            <TextField
              name="codigo_pedido"
              label="Código"
              value={formValues.codigo_pedido}
              onChange={handleInputChange}
              fullWidth
              disabled
            />
            <TextField
              name="nombre_producto"
              label="Tipo"
              value={formValues.nombre_producto}
              onChange={handleInputChange}
              fullWidth
              disabled={userRole === 'Cliente'}
            />
            <TextField
              name="oficina_especialidad"
              label="Programa"
              value={formValues.oficina_especialidad}
              onChange={handleInputChange}
              fullWidth
              disabled={userRole === 'Cliente'}
            />
            <TextField
              name="nombre_oficina"
              label="Oficina Técnica"
              value={formValues.nombre_oficina}
              onChange={handleInputChange}
              fullWidth
              disabled={userRole === 'Cliente'}
            />
            <TextField
              name="m2"
              label="M2"
              value={formValues.m2}
              onChange={handleInputChange}
              fullWidth
              disabled={userRole === 'Cliente'}
            />
            <TextField
              name="ml"
              label="ML"
              value={formValues.ml}
              onChange={handleInputChange}
              fullWidth
              disabled={userRole === 'Cliente'}
            />
            <TextField
              name="kg"
              label="KG"
              value={formValues.kg}
              onChange={handleInputChange}
              fullWidth
              disabled={userRole === 'Cliente'}
            />
            <TextField
              name="frisos_ml"
              label="Frisos(ML)"
              value={formValues.frisos_ml}
              onChange={handleInputChange}
              fullWidth
              disabled={userRole === 'Cliente'}
            />
            <TextField
              name="chatas_kg"
              label="Chatas(KG)"
              value={formValues.chatas_kg}
              onChange={handleInputChange}
              fullWidth
              disabled={userRole === 'Cliente'}
            />
            <Box display="flex" alignItems="center">
              <TextField
                name="fecha"
                label="Fecha"
                type="date"
                value={formValues.fecha}
                onChange={handleInputChange}
                fullWidth
                disabled={disableDate}
                onClick={handleFechaClick} // Abrir el modal para el código de validación
                InputLabelProps={{
                  shrink: true,
                }}
              />
              {userRole !== 'Cliente' && (
                <Button variant="contained" onClick={handleFechaClick} style={{ marginLeft: '10px' }}>
                  Verificar
                </Button>
              )}
            </Box>
            <TextField
              name="hora"
              label="Hora"
              type="time"
              value={formValues.hora}
              onChange={handleInputChange}
              fullWidth
              disabled={userRole === 'Cliente'}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              name="nivel"
              label="Nivel"
              value={formValues.nivel}
              onChange={handleInputChange}
              fullWidth
              disabled={userRole === 'Cliente'}
            />
            <TextField
              name="codigo_plano"
              label="Codigo Plano PL"
              value={formValues.codigo_plano}
              onChange={handleInputChange}
              fullWidth
              disabled={userRole === 'Cliente'}
            />
            <TextField
              name="planta"
              label="Planta"
              value={formValues.planta}
              onChange={handleInputChange}
              fullWidth
              disabled={userRole === 'Cliente'}
            />
            <TextField
              name="nombre_usuario"
              label="Cliente"
              value={formValues.nombre_usuario}
              onChange={handleInputChange}
              fullWidth
              disabled={userRole === 'Cliente'}
            />
            <TextField
              name="id_proyecto_cup"
              label="ID CUP"
              value={formValues.id_proyecto_cup}
              onChange={handleInputChange}
              fullWidth
              disabled={userRole === 'Cliente'}
            />
            <TextField
              name="suf"
              label="SUF"
              value={formValues.suf}
              onChange={handleInputChange}
              fullWidth
              disabled={userRole === 'Cliente'}
            />
            <TextField
              name="nombre_transporte"
              label="Nombre Transporte"
              value={formValues.nombre_transporte}
              onChange={handleInputChange}
              fullWidth
              disabled={userRole === 'Cliente'}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <button className="btn-cancelar" onClick={onClose}>Cancelar</button>
          <button className="btn-guardar" onClick={handleSave} variant="contained" color="primary">
            Guardar
          </button>
        </DialogActions>
      </Dialog>

      {/* Modal para el código de validación */}
      <Modal open={modalCodigoOpen} onClose={() => setModalCodigoOpen(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <h2>Ingrese el código de validación</h2>
          <TextField
            label="Código de validación"
            value={codigoValidacion}
            onChange={(e) => setCodigoValidacion(e.target.value)}
            fullWidth
          />
          <Button onClick={handleCodigoValidacion} variant="contained" color="primary" fullWidth>
            Validar
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default ModalEditar;
