import { useState } from 'react';
import Select from 'react-select';
import './Pedidos.css';
import { niveles } from '../../helpers/niveles';

{/*Eduardo del futuro: 
  - Crea un archivo.js para cada uno de los datos que se repiten muchas veces,
  como por ejemplo: codigo plano, nivel, ya que son datos que se repiten mucho y para
  almacenarlos tendría que crear otra tabla.
  */}

const Pedidos = () => {
  const pedidosEjemplo = [
    {
      codigo: "LM-04",
      fecha: "2024-02-24",
      hora: "10:00",
      nivel: "PISO 17/23N",
      metros_cuadrados: 87.85,
      metros_lineales: 0,
      kilogramos: 580.94,
      frisos: 0,
      chatas: 204.54,
      codigo_plano: "BDP2-082D",
      planta: "PLANTA 2",
      cup_proyecto: "BD-2023-07-041-08",
      id_producto: 1,
      id_usuario: 1,
      id_transporte: 1,
      id_oficina: 1
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPedido, setNewPedido] = useState({
    codigo: '',
    fecha: '',
    hora: '',
    nivel: '',
    metros_cuadrados: '',
    metros_lineales: '',
    kilogramos: '',
    frisos: '',
    chatas: '',
    codigo_plano: '',
    planta: '',
    cup_proyecto: '',
    id_producto: '',
    id_usuario: '',
    id_transporte: '',
    id_oficina: ''
  });

  const nivelOptions = niveles.map(nivel => ({
    value: nivel.nivel,
    label: nivel.nivel
  }));

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPedido(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para añadir el cliente
    console.log('Nuevo Pedido:', newPedido);
    setIsModalOpen(false);
    setNewPedido({
      codigo: '',
      fecha: '',
      hora: '',
      nivel: '',
      metros_cuadrados: '',
      metros_lineales: '',
      kilogramos: '',
      frisos: '',
      chatas: '',
      codigo_plano: '',
      planta: '',
      cup_proyecto: '',
      id_producto: '',
      id_usuario: '',
      id_transporte: '',
      id_oficina: ''
    });
  };
  
  return (
    <div className="pedidos-container">
      <div className="pedidos-header">
        <h1>Pedidos</h1>
        <button className="btn-nuevo-pedido" onClick={() => setIsModalOpen(true)}>+ Nuevo Pedido</button>
      </div>

      {isModalOpen && (
        <div className="pedidos-modal-overlay">
          <div className="pedidos-modal-content">
            <div className="pedidos-modal-header">
              <h2>Nuevo Pedido</h2>
              <button className="close-modal" onClick={() => setIsModalOpen(false)}>&times;</button>
            </div>
            <form onSubmit={handleSubmit} className="pedido-form">
              <div className="form-group">
                <label htmlFor="cup_proyecto">Proyecto:</label>
                <select
                  id="cup_proyecto"
                  name="cup_proyecto"
                  value={newPedido.cup_proyecto}
                  onChange={handleInputChange}
                >
                
                  <option value="BD-2023-07-041-08">ALIAGA</option>
                  <option value="BD-2023-07-156-06">CONVIVIUM 2</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="codigo">Código:</label>
                <input
                  type="text"
                  id="codigo"
                  name="codigo"
                  value={newPedido.codigo}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="id_cliente">Cliente:</label>
                <select
                  id="id_cliente"
                  name="id_cliente"
                  value={newPedido.id_cliente}
                  onChange={handleInputChange}
                >
                  <option value="1">ESPARQ</option>
                  <option value="2">BKO CONSTRUCTORES</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="id_producto">Producto:</label>
                <select
                  id="id_producto"
                  name="id_producto"
                  value={newPedido.id_producto}
                  onChange={handleInputChange}
                >
                  <option value="PL">PL</option>
                  <option value="PL+CLJ">PL + CLJ</option>
                  <option value="PL+PV">PL + PV</option>
                  <option value="PL+FR">PL + FR</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="fecha">Fecha:</label>
                <input
                  type="date"
                  id="fecha"
                  name="fecha"
                  value={newPedido.fecha}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="hora">Hora:</label>
                <input
                  type="time"
                  id="hora"
                  name="hora"
                  value={newPedido.hora}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="metros_cuadrados">Metros Cuadrados:</label>
                <input
                  type="number"
                  id="metros_cuadrados"
                  name="metros_cuadrados"
                  value={newPedido.metros_cuadrados}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="metros_lineales">Metros Lineales:</label>
                <input
                  type="number"
                  id="metros_lineales"
                  name="metros_lineales"
                  value={newPedido.metros_lineales}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="kilogramos">Kilogramos:</label>
                <input
                  type="number"
                  id="kilogramos"
                  name="kilogramos"
                  value={newPedido.kilogramos}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="frisos">Frisos (ML):</label>
                <input
                  type="number"
                  id="frisos"
                  name="frisos"
                  value={newPedido.frisos}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="chatas">Chatas (KG):</label>
                <input
                  type="number"
                  id="chatas"
                  name="chatas"
                  value={newPedido.chatas}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="id_oficina">Oficina:</label>
                <select
                  id="id_oficina"
                  name="id_oficina"
                  value={newPedido.id_oficina}
                  onChange={handleInputChange}
                >
                  <option value="1">AARON</option>
                  <option value="2">ALEJANDRO</option>
                  <option value="3">ALEXANDER</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="nivel">Codigo del Plano:</label>
                <input
                  type="text"
                  id="codigo_plano"
                  name="codigo_plano"
                  value={newPedido.codigo_plano}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="nivel">Nivel:</label>
                <Select
                  id="nivel"
                  name="nivel"
                  options={nivelOptions}
                  value={nivelOptions.find(option => option.value === newPedido.nivel)}
                  onChange={(selectedOption) => {
                    handleInputChange({
                      target: {
                        name: 'nivel',
                        value: selectedOption ? selectedOption.value : ''
                      }
                    });
                  }}
                  placeholder="Buscar nivel..."
                  isClearable
                  isSearchable
                  className="react-select-container"
                  classNamePrefix="react-select"
                />
              </div>
              
              
              
              <div className="form-group">
                <label htmlFor="planta">Planta:</label>
                <select
                  id="planta"
                  name="planta"
                  value={newPedido.planta}
                  onChange={handleInputChange}
                >
                  <option value="P.R">P.R</option>
                  <option value="PLANTA-2">PLANTA 2</option>
                  <option value="PLANTA 4">PLANTA 4</option>
                  <option value="PT-AREQUIPA">PT AREQUIPA</option>
                  <option value="PT-ROTACION">PT ROTACION</option>
                </select>
              </div>             
              <div className="form-group">
                <label htmlFor="id_transporte">Transporte:</label>
                <select
                  id="id_transporte"
                  name="id_transporte"
                  value={newPedido.id_transporte}
                  onChange={handleInputChange}
                >
                  <option value="1">PIERO</option>
                  <option value="2">CAMION GRUA</option>
                  <option value="3">PRIVADO</option>
                </select>
              </div>
              
              <div className="form-actions">
                <button type="button" className="btn-cancelar" onClick={() => setIsModalOpen(false)}>Cancelar</button>
                <button type="submit" className="btn-guardar">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="tabla-pedidos">
        <table>
          <thead>
            <tr>
              <th>Código</th>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Nivel</th>
              <th>Metros Cuadrados</th>
              <th>Metros Lineales</th>
              <th>Kilogramos</th>
              <th>Frisos</th>
              <th>Chatas</th>
              <th>Codigo Plano</th>
              <th>Planta</th>
              <th>CUP Proyecto</th>
              <th>Producto</th>
              <th>Cliente</th>
              <th>Transporte</th>
              <th>Oficina</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pedidosEjemplo.map((pedido) => (
              <tr key={pedido.codigo}>
                <td>{pedido.codigo}</td>
                <td>{pedido.fecha}</td>
                <td>{pedido.hora}</td>
                <td>{pedido.nivel}</td>
                <td>{pedido.metros_cuadrados}</td>
                <td>{pedido.metros_lineales}</td>
                <td>{pedido.kilogramos}</td>
                <td>{pedido.frisos}</td>
                <td>{pedido.chatas}</td>
                <td>{pedido.codigo_plano}</td>
                <td>{pedido.planta}</td>
                <td>{pedido.cup_proyecto}</td>
                <td>{pedido.id_producto}</td>
                <td>{pedido.id_usuario}</td>
                <td>{pedido.id_transporte}</td>
                <td>{pedido.id_oficina}</td>
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
