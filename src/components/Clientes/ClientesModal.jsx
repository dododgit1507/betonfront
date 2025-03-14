import React, { useState } from 'react';

const ClientesModal = ({ closeModal, addCliente }) => {
  const [newClient, setNewClient] = useState({
    nombre: '',
    correo: '',
    telefono: '',
    pais: 'Perú', // Valor predeterminado
    distrito: '',
    rol: 'CLIENTE', // Valor predeterminado
    contraseña: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewClient((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addCliente(newClient);
    closeModal();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h1 className='modal-title-proyecto'>Nuevo Cliente</h1>
          <button onClick={closeModal} className="close-modal">
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit} className="cliente-form">
          <div className="form-group">
            <label htmlFor="nombre">Nombre:</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={newClient.nombre}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="telefono">Teléfono:</label>
            <input
              type="number"
              id="telefono"
              name="telefono"
              value={newClient.telefono}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="correo">Correo:</label>
            <input
              type="email"
              id="correo"
              name="correo"
              value={newClient.correo}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="rol">Rol:</label>
            <select
              id="rol"
              name="rol"
              value={newClient.rol}
              onChange={handleInputChange}
            >
              <option value="CLIENTE">CLIENTE</option>
              <option value="INGENIERO">INGENIERO</option>
              <option value="ADMIN">ADMIN</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="pais">País:</label>
            <select
              id="pais"
              name="pais"
              value={newClient.pais}
              onChange={handleInputChange}
            >
              <option value="Perú">PERÚ</option>
              <option value="Chile">CHILE</option>
              <option value="Panamá">PANAMA</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="distrito">Distrito:</label>
            <input
              type="text"
              id="distrito"
              name="distrito"
              value={newClient.distrito}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="contraseña">Contraseña:</label>
            <input
              type="password"
              id="contraseña"
              name="contraseña"
              value={newClient.contraseña}
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

export default ClientesModal;