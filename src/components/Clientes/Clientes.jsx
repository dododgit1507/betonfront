import React, { useState } from 'react';
import './Clientes.css';

const Clientes = () => {
  const clientesEjemplo = [
    {
      id: 1,
      nombre: "Eduardo Huarcaya",
      telefono: "925757151",
      correo: "eduardohuarcaya04@gmail.com",
      pais: "Peru",
      rol: "Cliente"
    },
    {
      id: 2,
      nombre: "Fernando Flores",
      telefono: "912345678",
      correo: "fernandoflores@gmail.com",
      pais: "Chile",
      rol: "Cliente"
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newClient, setNewClient] = useState({
    nombre: '',
    telefono: '',
    correo: '',
    pais: '',
    rol: 'Cliente'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewClient(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para añadir el cliente
    console.log('Nuevo cliente:', newClient);
    setIsModalOpen(false);
    setNewClient({
      nombre: '',
      telefono: '',
      correo: '',
      pais: '',
      rol: 'Cliente'
    });
  };

  return (
    <div className="pedidos-container">
      <div className="pedidos-header">
        <h1>Clientes</h1>
        <button className="btn-nuevo-pedido" onClick={() => setIsModalOpen(true)}>+ Nuevo Cliente</button>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Nuevo Cliente</h2>
              <button className="close-modal" onClick={() => setIsModalOpen(false)}>&times;</button>
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
                  type="tel"
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
                <label htmlFor="pais">País:</label>
                <select
                  id="pais"
                  name="pais"
                  value={newClient.pais}
                  onChange={handleInputChange}
                >
                  <option value="Peru">Peru</option>
                  <option value="Chile">Chile</option>
                  <option value="Brasil">Brasil</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="rol">Rol:</label>
                <select
                  id="rol"
                  name="rol"
                  value={newClient.rol}
                  onChange={handleInputChange}
                >
                  <option value="Cliente">Cliente</option>
                </select>
              </div>
              <div className="form-actions">
                <button type="button" className="btn-cancelar" onClick={() => setIsModalOpen(false)}>Cancelar</button>
                <button type="submit" className="btn-guardar">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="tabla-pedidos">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Teléfono</th>
              <th>Correo</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clientesEjemplo.map((cliente) => (
              <tr key={cliente.id}>
                <td>{cliente.id}</td>
                <td>{cliente.nombre}</td>
                <td>{cliente.telefono}</td>
                <td>{cliente.correo}</td>
                <td>{cliente.rol}</td>
                <td>
                  <button className="btn-accion">Ver</button>
                  <button className="btn-accion">Editar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Clientes;