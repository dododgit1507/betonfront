import React from 'react';

const TablaOficina = ({ oficinas, loading, error }) => {
  return (
    <div className="tabla-oficina">
      {loading && <p>Cargando oficinas técnicas...</p>}
      {error && <p>{error}</p>}

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tecnico</th>
            <th>Especialidad</th>
          </tr>
        </thead>
        <tbody>
          {oficinas.length > 0 ? (
            oficinas.map((oficina) => (
              <tr key={oficina.id}>
                <td>{oficina.id}</td>
                <td>{oficina.nombre}</td>
                <td>{oficina.especialidad}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">No hay oficinas registradas</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TablaOficina;
