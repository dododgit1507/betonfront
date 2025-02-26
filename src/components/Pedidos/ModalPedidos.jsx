import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ModalPedidos = ({ onClose, pedido }) => {
  const [formData, setFormData] = useState({
    codigo: '',
    fecha: '',
    hora: '',
    nivel: '',
    metros_cuadrados: '',
    metros_lineales: '',
    kilogramos: '',
    frisos: '',
    chatas: '',
    codigo_plano: '',
    planta: '',
    id_proyecto_cup: '',
    id_producto: '',
    id_usuario: '',
    id_transporte: '',
    id_oficina: ''
  });

  useEffect(() => {
    if (pedido) {
      setFormData(pedido);
    }
  }, [pedido]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (pedido) {
        await axios.put(`http://localhost:3000/pedidos/${pedido.codigo}`, formData);
      } else {
        await axios.post('http://localhost:3000/pedidos', formData);
      }
      onClose();
    } catch (error) {
      console.error('Error al guardar el pedido:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
        <h2 className="text-2xl font-bold mb-4">{pedido ? 'Editar Pedido' : 'Nuevo Pedido'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="codigo" value={formData.codigo} onChange={handleChange} placeholder="Código" className="w-full p-2 border rounded-md" required />
          <input type="date" name="fecha" value={formData.fecha} onChange={handleChange} className="w-full p-2 border rounded-md" required />
          <input type="time" name="hora" value={formData.hora} onChange={handleChange} className="w-full p-2 border rounded-md" required />
          <input type="text" name="nivel" value={formData.nivel} onChange={handleChange} placeholder="Nivel" className="w-full p-2 border rounded-md" required />
          <input type="number" name="metros_cuadrados" value={formData.metros_cuadrados} onChange={handleChange} placeholder="Metros Cuadrados" className="w-full p-2 border rounded-md" required />
          <input type="number" name="metros_lineales" value={formData.metros_lineales} onChange={handleChange} placeholder="Metros Lineales" className="w-full p-2 border rounded-md" required />
          <input type="number" name="kilogramos" value={formData.kilogramos} onChange={handleChange} placeholder="Kilogramos" className="w-full p-2 border rounded-md" required />
          <input type="number" name="frisos" value={formData.frisos} onChange={handleChange} placeholder="Frisos" className="w-full p-2 border rounded-md" required />
          <input type="number" name="chatas" value={formData.chatas} onChange={handleChange} placeholder="Chatas" className="w-full p-2 border rounded-md" required />
          <input type="text" name="codigo_plano" value={formData.codigo_plano} onChange={handleChange} placeholder="Código Plano" className="w-full p-2 border rounded-md" required />
          <input type="text" name="planta" value={formData.planta} onChange={handleChange} placeholder="Planta" className="w-full p-2 border rounded-md" required />
          <input type="text" name="id_proyecto_cup" value={formData.id_proyecto_cup} onChange={handleChange} placeholder="ID Proyecto CUP" className="w-full p-2 border rounded-md" required />
          <input type="text" name="id_producto" value={formData.id_producto} onChange={handleChange} placeholder="ID Producto" className="w-full p-2 border rounded-md" required />
          <input type="text" name="id_usuario" value={formData.id_usuario} onChange={handleChange} placeholder="ID Usuario" className="w-full p-2 border rounded-md" required />
          <input type="text" name="id_transporte" value={formData.id_transporte} onChange={handleChange} placeholder="ID Transporte" className="w-full p-2 border rounded-md" required />
          <input type="text" name="id_oficina" value={formData.id_oficina} onChange={handleChange} placeholder="ID Oficina" className="w-full p-2 border rounded-md" required />
          <div className="flex justify-end space-x-2">
            <button onClick={onClose} type="button" className="px-4 py-2 bg-gray-300 rounded-md">Cancelar</button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalPedidos;
