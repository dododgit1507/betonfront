import React, { useState } from 'react';

const ModalOficina = ({ closeModal, addOficina }) => {
  const [nuevaOficina, setNuevaOficina] = useState({
    especialidad: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevaOficina((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addOficina(nuevaOficina);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Nueva Oficina Técnica</h2>
          <button onClick={closeModal} className="close-modal">
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit} className="oficina-form">
          <div className="form-group">
            <label htmlFor="especialidad">Especialidad:</label>
            <input
              type="text"
              id="especialidad"
              name="especialidad"
              value={nuevaOficina.especialidad}
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

export default ModalOficina;
