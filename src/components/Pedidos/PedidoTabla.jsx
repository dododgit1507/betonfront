import React from 'react';

const PedidoTabla = ({ pedidos, loading, error }) => {
  return (
    <div className="tabla-pedidos">
      {loading && <p>Cargando pedidos...</p>}
      {error && <p>{error}</p>}

      <table>
        <thead>
          <tr>
            <th>Código Pedido</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Nivel</th>
            <th>Metros Cuadrados</th>
            <th>Metros Lineales</th>
            <th>Kilogramos</th>
            <th>Frisos</th>
            <th>Chatas</th>
            <th>Código Plano</th>
            <th>Planta</th>
            <th>Proyecto CUP</th>
            <th>Producto</th>
            <th>Usuario</th>
            <th>Transporte</th>
            <th>Oficina</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.length > 0 ? (
            pedidos.map((pedido) => (
              <tr key={pedido.codigo_pedido}>
                <td>{pedido.codigo_pedido}</td>
                <td>{new Date(pedido.fecha).toLocaleDateString()}</td>
                <td>{pedido.hora}</td>
                <td>{pedido.nivel}</td>
                <td>{pedido.metros_cuadrados}</td>
                <td>{pedido.metros_lineales}</td>
                <td>{pedido.kilogramos}</td>
                <td>{pedido.frisos}</td>
                <td>{pedido.chatas}</td>
                <td>{pedido.codigo_plano}</td>
                <td>{pedido.planta}</td>
                <td>{pedido.nombre_proyecto_cup}</td> {/* Nombre del Proyecto CUP */}
                <td>{pedido.nombre_producto}</td> {/* Nombre del Producto */}
                <td>{pedido.nombre_usuario}</td> {/* Nombre del Usuario */}
                <td>{pedido.nombre_transporte}</td> {/* Nombre del Transporte */}
                <td>{pedido.nombre_oficina}</td> {/* Nombre de la Oficina */}
                <td>
                  <button>Ver</button>
                  <button>Editar</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="17">No hay pedidos registrados</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PedidoTabla;
