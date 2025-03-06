import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Box
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

  const [isClientRole, setIsClientRole] = useState(false);

  useEffect(() => {
    const userRole = localStorage.getItem('userRole');
    if (userRole === 'Cliente') {
      setIsClientRole(true);
    } else {
      setIsClientRole(false);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSave = async () => {
    try {
      // Imprimir en consola la data que se está enviando al backend
      console.log('Datos que se están enviando al backend:', formValues);
  
      // Codificar el codigo_pedido para evitar problemas de URI malformada
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
  

  return (
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
            disabled={isClientRole}
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
            disabled={isClientRole}
          />
          <TextField
            name="oficina_especialidad"
            label="Programa"
            value={formValues.oficina_especialidad}
            onChange={handleInputChange}
            fullWidth
            disabled={isClientRole}
          />
          <TextField
            name="nombre_oficina"
            label="Oficina Técnica"
            value={formValues.nombre_oficina}
            onChange={handleInputChange}
            fullWidth
            disabled={isClientRole}
          />
          <TextField
            name="m2"
            label="M2"
            value={formValues.m2}
            onChange={handleInputChange}
            fullWidth
            disabled={isClientRole}
          />
          <TextField
            name="ml"
            label="ML"
            value={formValues.ml}
            onChange={handleInputChange}
            fullWidth
            disabled={isClientRole}
          />
          <TextField
            name="kg"
            label="KG"
            value={formValues.kg}
            onChange={handleInputChange}
            fullWidth
            disabled={isClientRole}
          />
          <TextField
            name="frisos_ml"
            label="Frisos(ML)"
            value={formValues.frisos_ml}
            onChange={handleInputChange}
            fullWidth
            disabled={isClientRole}
          />
          <TextField
            name="chatas_kg"
            label="Chatas(KG)"
            value={formValues.chatas_kg}
            onChange={handleInputChange}
            fullWidth
            disabled={isClientRole}
          />
          <TextField
            name="fecha"
            label="Fecha"
            type="date"
            value={formValues.fecha}
            onChange={handleInputChange}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            name="hora"
            label="Hora"
            type="time"
            value={formValues.hora}
            onChange={handleInputChange}
            fullWidth
            disabled={isClientRole}
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
            disabled={isClientRole}
          />
          <TextField
            name="codigo_plano"
            label="Codigo Plano PL"
            value={formValues.codigo_plano}
            onChange={handleInputChange}
            fullWidth
            disabled={isClientRole}
          />
          <TextField
            name="planta"
            label="Planta"
            value={formValues.planta}
            onChange={handleInputChange}
            fullWidth
            disabled={isClientRole}
          />
          <TextField
            name="nombre_usuario"
            label="Cliente"
            value={formValues.nombre_usuario}
            onChange={handleInputChange}
            fullWidth
            disabled={isClientRole}
          />
          <TextField
            name="id_proyecto_cup"
            label="CUP"
            value={formValues.id_proyecto_cup}
            onChange={handleInputChange}
            fullWidth
            disabled={isClientRole}
          />
          <TextField
            name="suf"
            label="SUF"
            value={formValues.suf}
            onChange={handleInputChange}
            fullWidth
            disabled={isClientRole}
          />
          <TextField
            name="nombre_transporte"
            label="Transporte"
            value={formValues.nombre_transporte}
            onChange={handleInputChange}
            fullWidth
            disabled={isClientRole}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancelar
        </Button>
        <Button onClick={handleSave} color="primary">
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalEditar;
