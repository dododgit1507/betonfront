import React from 'react';

const TablaEnvios = ({ envios, loading, error }) => {
  return (
    <div className="tabla-envios">
      {loading && <p>Cargando envíos...</p>}
      {error && <p>{error}</p>}

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Fecha de Envío</th>
            <th>Observación</th>
            <th>Valorizado</th>
            <th>Facturado</th>
            <th>Pagado</th>
            <th>Código de Pedido</th>
          </tr>
        </thead>
        <tbody>
          {envios.length > 0 ? (
            envios.map((envio) => (
              <tr key={envio.id}>
                <td>{envio.id}</td>
                <td>{envio.fecha_envio}</td>
                <td>{envio.observacion}</td>
                <td>{envio.valorizado}</td>
                <td>{envio.facturado}</td>
                <td>{envio.pagado}</td>
                <td>{envio.codigo_pedido}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No hay envíos registrados</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TablaEnvios;
