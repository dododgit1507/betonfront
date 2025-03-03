import React from 'react';
import './PedidoTabla.css';

const PedidoTabla = ({ pedidos, loading, error }) => {
  return (
    <div className="tabla-container">
      {loading && <p>Cargando pedidos...</p>}
      {error && <p>{error}</p>}

      <table className="tabla-pedidos">
        <thead>
          <tr>
            <th className='th-verde'>Proyecto</th>
            <th className='th-verde'>Cod_pedido</th>
            <th className='th-azul'>Tipo</th>
            <th className='th-azul'>Programa</th>
            <th className='th-azul'>Oficina</th>
            <th className='th-azul'>M2</th>
            <th className='th-azul'>ML</th>
            <th className='th-azul'>KG</th>
            <th className='th-azul'>Frisos(ML)</th>
            <th className='th-azul'>Chatas(KG)</th>
            <th className='th-verde'>Fecha</th>
            <th className='th-verde'>Hora</th>
            <th className='th-verde'>Nivel</th>
            <th className='th-amarillo'>Cod_Plano</th>
            <th className='th-amarillo'>Planta</th>
            <th className='th-celeste'>Cliente</th>
            <th className='th-celeste'>Cup</th>
            <th className='th-celeste'>Suf</th>
            <th className='th-celeste'>Transporte</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.length > 0 ? (
            pedidos.map((pedido) => (
              <tr key={pedido.codigo_pedido}>
                <td>{pedido.nombre_proyecto_cup}</td>
                <td>{pedido.codigo_pedido}</td>
                <td>{pedido.nombre_producto}</td>
                <td>{pedido.oficina_especialidad}</td>
                <td>{pedido.nombre_oficina}</td>
                <td>{pedido.m2}</td>
                <td>{pedido.ml}</td>
                <td>{pedido.kg}</td>
                <td>{pedido.frisos_ml}</td>
                <td>{pedido.chatas_kg}</td>
                <td>{new Date(pedido.fecha).toLocaleDateString()}</td>
                <td>{pedido.hora}</td>
                <td>{pedido.nivel}</td>
                <td>{pedido.codigo_plano}</td>
                <td>{pedido.planta}</td>
                <td>{pedido.nombre_usuario}</td>
                <td>{pedido.id_proyecto_cup}</td>
                <td>{pedido.suf}</td>
                <td>{pedido.nombre_transporte}</td>
                <td className='td-acciones'>
                  {/* <button className='btn-acciones ver'>Ver</button> */}
                  <button className='btn-acciones editar'>Editar</button>
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
