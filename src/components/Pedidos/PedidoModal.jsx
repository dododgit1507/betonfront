import React, { useState, useEffect } from 'react';
import './PedidoModal.css';

const PedidoModal = ({ closeModal, addPedido }) => {
  const [newPedido, setNewPedido] = useState({
    codigo_pedido: '',
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
    id_proyecto_cup: '',
    id_producto: '',
    id_usuario: '',
    id_transporte: '',
    id_oficina: ''
  });

  const generarCodigoPedido = () => {
    const fecha = new Date();
    const codigo = `${String(fecha.getFullYear()).slice(-2)}${String(fecha.getMonth() + 1).padStart(2, '0')}${String(fecha.getDate()).padStart(2, '0')}${String(fecha.getHours()).padStart(2, '0')}${String(fecha.getMinutes()).padStart(2, '0')}`;  
    setNewPedido((prevPedido) => ({
      ...prevPedido,
      codigo_pedido: codigo,
    }));
  };

  const [proyectosCUP, setProyectosCUP] = useState([]);
  const [productos, setProductos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [transportes, setTransportes] = useState([]);
  const [oficinas, setOficinas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resProyectos = await fetch('http://localhost:3000/proyecto');
        if (!resProyectos.ok) throw new Error('Error fetching proyectos');
        const proyectos = await resProyectos.json();
        setProyectosCUP(proyectos);
  
        const resProductos = await fetch('http://localhost:3000/producto');
        if (!resProductos.ok) throw new Error('Error fetching productos');
        const productos = await resProductos.json();
        setProductos(productos);
  
        const resUsuarios = await fetch('http://localhost:3000/usuario');
        if (!resUsuarios.ok) throw new Error('Error fetching usuarios');
        const usuarios = await resUsuarios.json();
        setUsuarios(usuarios);
  
        const resTransportes = await fetch('http://localhost:3000/transporte');
        if (!resTransportes.ok) throw new Error('Error fetching transportes');
        const transportes = await resTransportes.json();
        setTransportes(transportes);
  
        const resOficinas = await fetch('http://localhost:3000/oficina_tecnica');
        if (!resOficinas.ok) throw new Error('Error fetching oficinas');
        const oficinas = await resOficinas.json();
        setOficinas(oficinas);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPedido((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
      // Imprimir el contenido de newPedido
    console.log('Enviando al backend:', newPedido)
    addPedido(newPedido); 
    closeModal(); 
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h1 className='modaltitle'>Nuevo Pedido</h1>
          <button onClick={closeModal} className="close-modal">
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit} className="pedido-form">

          {/* Inputs para los campos adicionales */}
          <div className="form-group">
            <label>Código de Pedido</label>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <input
                type="text"
                name="codigo_pedido"
                value={newPedido.codigo_pedido}
                readOnly
              />
              <button
                type="button"
                onClick={generarCodigoPedido}
                className="btn-generate"
                style={{ marginLeft: '10px' }}
              >
                Generar
              </button>
            </div>
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
            <label htmlFor="nivel">Nivel:</label>
            <input
              type="text"
              id="nivel"
              name="nivel"
              value={newPedido.nivel}
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
            <label htmlFor="frisos">Frisos:</label>
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
            <label htmlFor="chatas">Chatas:</label>
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
            <label htmlFor="codigo_plano">Código de Plano:</label>
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
            <label htmlFor="planta">Planta:</label>
            <input
              type="text"
              id="planta"
              name="planta"
              value={newPedido.planta}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Campos para seleccionar de listas */}
          <div className="form-group">
            <label htmlFor="id_proyecto_cup">Proyecto CUP:</label>
            <select
              id="id_proyecto_cup"
              name="id_proyecto_cup"
              value={newPedido.id_proyecto_cup}
              onChange={handleInputChange}
              required
            >
              <option value="">Seleccione un proyecto</option>
              {proyectosCUP.map((proyecto) => (
                <option key={proyecto.id} value={proyecto.id_proyecto_cup}>
                  {proyecto.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="id_producto">Producto:</label>
            <select
              id="id_producto"
              name="id_producto"
              value={newPedido.id_producto}
              onChange={handleInputChange}
              required
            >
              <option value="">Seleccione un producto</option>
              {productos.map((producto) => (
                <option key={producto.id} value={producto.id_producto}>
                  {producto.tipo}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="id_usuario">Usuario:</label>
            <select
              id="id_usuario"
              name="id_usuario"
              value={newPedido.id_usuario}
              onChange={handleInputChange}
              required
            >
              <option value="">Seleccione un usuario</option>
              {usuarios.map((usuario) => (
                <option key={usuario.id} value={usuario.id}>
                  {usuario.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="id_transporte">Transporte:</label>
            <select
              id="id_transporte"
              name="id_transporte"
              value={newPedido.id_transporte}
              onChange={handleInputChange}
              required
            >
              <option value="">Seleccione un transporte</option>
              {transportes.map((transporte) => (
                <option key={transporte.id_transporte} value={transporte.id_transporte}>
                  {transporte.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="id_oficina">Oficina:</label>
            <select
              id="id_oficina"
              name="id_oficina"
              value={newPedido.id_oficina}
              onChange={handleInputChange}
              required
            >
              <option value="">Seleccione una oficina</option>
              {oficinas.map((oficina) => (
                <option key={oficina.id} value={oficina.id_oficina}>
                  {oficina.especialidad}
                </option>
              ))}
            </select>
          </div>

          <div className="modal-footer">
            <button type="submit" className="btn-save">Guardar</button>
            <button type="button" onClick={closeModal} className="btn-cancel">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PedidoModal;
