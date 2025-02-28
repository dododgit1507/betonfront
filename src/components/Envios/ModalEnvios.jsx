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
    addEnvio(nuevoEnvio);  // Llama a la función de agregar envío con los datos del estado
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h1 className='modal-title'>Nuevo Envío</h1>
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
            <select
              id="observacion"
              name="observacion"
              value={nuevoEnvio.observacion}
              onChange={handleInputChange}
              required
            >
              <option value="">Seleccione una opción</option>
              <option value="esta a tiempo">Está a tiempo</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="valorizado">Valorizado:</label>
            <select
              id="valorizado"
              name="valorizado"
              value={nuevoEnvio.valorizado}
              onChange={handleInputChange}
            >
              <option value="">Seleccione una opción</option>
              <option value="ENVIADO">ENVIADO</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="facturado">Facturado:</label>
            <select
              id="facturado"
              name="facturado"
              value={nuevoEnvio.facturado}
              onChange={handleInputChange}
            >
              <option value="">Seleccione una opción</option>
              <option value="ENVIADO">ENVIADO</option>
              <option value="PENDIENTE">PENDIENTE</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="pagado">Pagado:</label>
            <input
              type="number"
              id="pagado"
              name="pagado"
              value={nuevoEnvio.pagado}
              step="0.01"  // Permite valores decimales
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
