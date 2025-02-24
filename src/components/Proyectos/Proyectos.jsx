import React, { useState } from 'react';
import '../../styles/common.css';
import './Proyectos.css';

const Proyectos = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProject, setNewProject] = useState({
    cup: '',
    nombre: '',
    suf: ''
  });

  const proyectosEjemplo = [
    {
      cup: 'CUP001',
      nombre: 'Proyecto A',
      suf: 'SUF123'
    },
    {
      cup: 'CUP002',
      nombre: 'Proyecto B',
      suf: 'SUF456'
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para añadir el proyecto
    console.log('Nuevo proyecto:', newProject);
    setIsModalOpen(false);
    setNewProject({
      cup: '',
      nombre: '',
      suf: ''
    });
  };

  return (
    <div className="table-container">
      <div className="table-header">
        <h1>Proyectos</h1>
        <button className="btn-nuevo" onClick={() => setIsModalOpen(true)}>+ Nuevo Proyecto</button>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Nuevo Proyecto</h2>
              <button className="close-modal" onClick={() => setIsModalOpen(false)}>&times;</button>
            </div>
            <form onSubmit={handleSubmit} className="proyecto-form">
              <div className="form-group">
                <label htmlFor="cup">CUP:</label>
                <input
                  type="text"
                  id="cup"
                  name="cup"
                  value={newProject.cup}
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
                  value={newProject.nombre}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="suf">SUF:</label>
                <input
                  type="text"
                  id="suf"
                  name="suf"
                  value={newProject.suf}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-actions">
                <button type="button" className="btn-cancelar" onClick={() => setIsModalOpen(false)}>Cancelar</button>
                <button type="submit" className="btn-guardar">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="tabla-contenido">
        <table>
          <thead>
            <tr>
              <th>CUP</th>
              <th>Nombre</th>
              <th>SUF</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {proyectosEjemplo.map((proyecto, index) => (
              <tr key={index}>
                <td>{proyecto.cup}</td>
                <td>{proyecto.nombre}</td>
                <td>{proyecto.suf}</td>
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

export default Proyectos;
