import React, { useState } from 'react';
import './ProyectoModal.css';

const ProyectosModal = ({ closeModal, addProyecto }) => {
  const [nuevoProyecto, setNuevoProyecto] = useState({
    id_proyecto_cup: '',
    nombre: '',
    suf: ''
  });


  const generarCodigo = () => {
    const fechaHoy = new Date();
    const anio = fechaHoy.getFullYear().toString().slice(-2); // Tomamos los últimos 2 dígitos del año
    const mes = String(fechaHoy.getMonth() + 1).padStart(2, '0'); // El mes es 0-indexed
    const dia = String(fechaHoy.getDate()).padStart(2, '0');
    const numeroAleatorio = Math.floor(100 + Math.random() * 900); // Número aleatorio de 3 dígitos

    // Generamos el CUP
    const codigoGenerado = `BD-20${anio}-${mes}-${dia}-${numeroAleatorio}`;
    
    // Generamos el SUF
    const suf = `${anio}${dia}${numeroAleatorio}`;

    // Establecemos el código y el sufijo
    setNuevoProyecto((prev) => ({
      ...prev,
      id_proyecto_cup: codigoGenerado,
      suf: suf, // Aquí estamos usando el SUF generado
    }));
  };

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
    <div className="modal-overlay-proyecto">
      <div className="modal-content-proyecto">
        <div className="modal-header-proyecto">
          <h1 className="modal-title-proyecto">Nuevo Proyecto</h1>
          <button onClick={closeModal} className="close-modal-proyecto">
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit} className="proyecto-form">
          
          <div className="form-group">
            <label htmlFor="id_proyecto_cup">CUP:</label>
            <div className='form-group-cup'>
              <input
                type="text"
                id="id_proyecto_cup"
                name="id_proyecto_cup"
                value={nuevoProyecto.id_proyecto_cup}
                readOnly
              />
              <button type="button" onClick={generarCodigo} className="btn-generar">
                Generar 
              </button>
            </div>
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
            <label htmlFor="suf">SUF:</label>
              <input
                type="text"
                id="suf"
                name="suf"
                value={nuevoProyecto.suf}
                readOnly
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
