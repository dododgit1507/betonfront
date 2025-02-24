import React from 'react';
import './Pedidos.css';

const Pedidos = () => {
  const pedidosEjemplo = [
    {
      id: 1,
      cliente: 'Constructora XYZ',
      proyecto: 'Edificio Residencial',
      fecha: '2024-02-24',
      estado: 'Pendiente',
      total: '15,000.00'
    },
    {
      id: 2,
      cliente: 'Inmobiliaria ABC',
      proyecto: 'Centro Comercial',
      fecha: '2024-02-23',
      estado: 'En proceso',
      total: '28,500.00'
    },
    {
      id: 3,
      cliente: 'Constructora 123',
      proyecto: 'Hotel Boutique',
      fecha: '2024-02-22',
      estado: 'Completado',
      total: '42,300.00'
    }
  ];

  return (
    <div className="pedidos-container">
      <div className="pedidos-header">
        <h1>Pedidos</h1>
        <button className="btn-nuevo-pedido">+ Nuevo Pedido</button>
      </div>

      <div className="tabla-pedidos">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Cliente</th>
              <th>Proyecto</th>
              <th>Fecha</th>
              <th>Estado</th>
              <th>Total</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pedidosEjemplo.map((pedido) => (
              <tr key={pedido.id}>
                <td>#{pedido.id}</td>
                <td>{pedido.cliente}</td>
                <td>{pedido.proyecto}</td>
                <td>{pedido.fecha}</td>
                <td>
                  <span className={`estado-${pedido.estado.toLowerCase()}`}>
                    {pedido.estado}
                  </span>
                </td>
                <td>${pedido.total}</td>
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

export default Pedidos;
