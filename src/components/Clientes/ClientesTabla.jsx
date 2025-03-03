import React from 'react';

const ClientesTabla = ({ clientes, loading, error }) => {
  
  // Función para obtener el prefijo según el país
  const obtenerPrefijo = (pais) => {
    switch (pais) {
      case 'Perú':
        return '+51';
      case 'Chile':
        return '+56';
      case 'Panamá':
        return '+507';
      default:
        return '';
    }
  };

  return (
    <div className="tabla-clientes">
      {loading && <p>Cargando clientes...</p>}
      {error && <p>{error}</p>}

      <table>
        <thead>
          <tr>
            {/* <th>ID</th> */}
            <th>Nombre</th>
            <th>Teléfono</th>
            <th>Correo</th>
            <th>Rol</th>
            <th>Pais</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes.length > 0 ? (
            clientes.map((cliente) => (
              <tr key={cliente.id || cliente.correo}>
                {/* <td>{cliente.id}</td> */}
                <td>{cliente.nombre}</td>
                <td>{`${obtenerPrefijo(cliente.pais)} ${cliente.telefono}`}</td>
                <td>{cliente.correo}</td>
                <td>{cliente.rol}</td>
                <td>{cliente.pais}</td>
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
