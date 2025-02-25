import React, { useState } from 'react';

const ModalEnvios = ({ closeModal, addEnvio }) => {
  const [nuevoEnvio, setNuevoEnvio] = useState({
    fecha_envio: '',
    observacion: '',
    valorizado: '',
    facturado: '',
    pagado: '',
    codigo_pedido: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoEnvio((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addEnvio(nuevoEnvio);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Nuevo Envío</h2>
          <button onClick={closeModal} className="close-modal">
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit} className="envio-form">
          <div className="form-group">
            <label htmlFor="fecha_envio">Fecha de Envío:</label>
            <input
              type="date"
              id="fecha_envio"
              name="fecha_envio"
              value={nuevoEnvio.fecha_envio}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="observacion">Observación:</label>
            <input
              type="text"
              id="observacion"
              name="observacion"
              value={nuevoEnvio.observacion}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="valorizado">Valorizado:</label>
            <input
              type="number"
              id="valorizado"
              name="valorizado"
              value={nuevoEnvio.valorizado}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="facturado">Facturado:</label>
            <input
              type="number"
              id="facturado"
              name="facturado"
              value={nuevoEnvio.facturado}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="pagado">Pagado:</label>
            <input
              type="number"
              id="pagado"
              name="pagado"
              value={nuevoEnvio.pagado}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="codigo_pedido">Código de Pedido:</label>
            <input
              type="text"
              id="codigo_pedido"
              name="codigo_pedido"
              value={nuevoEnvio.codigo_pedido}
              onChange={handleInputChange}
              required
            />
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

export default ModalEnvios;
