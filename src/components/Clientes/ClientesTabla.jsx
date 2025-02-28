import React from 'react';

const ClientesTabla = ({ clientes, loading, error }) => {
  return (
    <div className="tabla-clientes">
      {loading && <p>Cargando clientes...</p>}
      {error && <p>{error}</p>}

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
          {clientes.length > 0 ? (
            clientes.map((cliente) => (
              <tr key={cliente.id || cliente.correo}>
                <td>{cliente.id}</td>
                <td>{cliente.nombre}</td>
                <td>{cliente.telefono}</td>
                <td>{cliente.correo}</td>
                <td>{cliente.rol}</td>
                <td>
                  {/* <button>Ver</button> */}
                  <button className='btn-acciones editar'>Editar</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No hay clientes registrados</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ClientesTabla;
