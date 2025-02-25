import React, { useState } from 'react';

const ProyectosModal = ({ closeModal, addProyecto }) => {
  const [nuevoProyecto, setNuevoProyecto] = useState({
    id_proyecto_cup: '',
    nombre: '',
    suf: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoProyecto((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addProyecto(nuevoProyecto);
    closeModal();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Nuevo Proyecto</h2>
          <button onClick={closeModal} className="close-modal">
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit} className="proyecto-form">
          <div className="form-group">
            <label htmlFor="id_proyecto_cup">ID Proyecto:</label>
            <input
              type="text"
              id="id_proyecto_cup"
              name="id_proyecto_cup"
              value={nuevoProyecto.id_proyecto_cup}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="nombre">Nombre:</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={nuevoProyecto.nombre}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="suf">Suf:</label>
            <input
              type="text"
              id="suf"
              name="suf"
              value={nuevoProyecto.suf}
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

export default ProyectosModal;
