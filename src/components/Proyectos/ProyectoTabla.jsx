import React from 'react';

const ProyectosTabla = ({ proyectos, loading, error }) => {
  return (
    <div className="tabla-proyectos">
      {loading && <p>Cargando proyectos...</p>}
      {error && <p>{error}</p>}

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
          {proyectos.length > 0 ? (
            proyectos.map((proyecto) => (
              <tr key={proyecto.id_proyecto_cup || proyecto.nombre}>
                <td>{proyecto.id_proyecto_cup}</td>
                <td>{proyecto.nombre}</td>
                <td>{proyecto.suf}</td>
                <td>
                  {/* <button>Ver</button> */}
                  <button className='btn-acciones editar'>Editar</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">No hay proyectos registrados</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProyectosTabla;
