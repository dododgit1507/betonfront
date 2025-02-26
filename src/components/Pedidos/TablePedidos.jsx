import React, { useState } from 'react';

const PedidosModal = ({ closeModal, addPedido }) => {
  const [newPedido, setNewPedido] = useState({
    nombreCliente: '',
    producto: '',
    cantidad: 1,
    fecha: '',
    estado: 'Pendiente',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPedido((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addPedido(newPedido);
    closeModal();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Nuevo Pedido</h2>
          <button onClick={closeModal} className="close-modal">
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit} className="pedido-form">
          <div className="form-group">
            <label htmlFor="nombreCliente">Nombre del Cliente:</label>
            <input
              type="text"
              id="nombreCliente"
              name="nombreCliente"
              value={newPedido.nombreCliente}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="producto">Producto:</label>
            <input
              type="text"
              id="producto"
              name="producto"
              value={newPedido.producto}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="cantidad">Cantidad:</label>
            <input
              type="number"
              id="cantidad"
              name="cantidad"
              value={newPedido.cantidad}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="fecha">Fecha:</label>
            <input
              type="date"
              id="fecha"
              name="fecha"
              value={newPedido.fecha}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="estado">Estado:</label>
            <select
              id="estado"
              name="estado"
              value={newPedido.estado}
              onChange={handleInputChange}
            >
              <option value="Pendiente">Pendiente</option>
              <option value="Completado">Completado</option>
              <option value="Cancelado">Cancelado</option>
            </select>
          </div>
          <div className="form-actions">
            <button type="button" onClick={closeModal} className="btn-cancelar">
              Cancelar
            </button>
            <button type="submit" className="btn-guardar">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PedidosModal;
