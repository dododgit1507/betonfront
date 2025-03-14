import React, { useState, useEffect } from 'react';
import './PedidoModal.css';

const PedidoModal = ({ isOpen, onClose, addPedido }) => {
  if (!isOpen) {
    return null; // Si el modal no está abierto, no lo renderizamos
  }
  const [newPedido, setNewPedido] = useState({
    codigo_pedido: '',
    fecha: '',
    hora: '',
    piso: '',
    nivel: '',
    metros_cuadrados: '',
    metros_lineales: '',
    kilogramos: '',
    frisos: '',
    chatas: '',
    unidades: '',
    especiales: '',
    codigo_plano: '',
    planta: '',
    id_proyecto_cup: '',
    id_producto: '',
    id_usuario: '',
    id_transporte: '',
    id_oficina: '',
    id_ingeniero: ''
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
  const [ingenieros, setIngenieros] = useState([]);
  const [clientes, setClientes] = useState([]);

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

        const resClientes = await fetch('http://localhost:3000/cliente');
        if (!resClientes.ok) throw new Error('Error fetching clientes');
        const clientes = await resClientes.json();
        setClientes(clientes);
  
        const resTransportes = await fetch('http://localhost:3000/transporte');
        if (!resTransportes.ok) throw new Error('Error fetching transportes');
        const transportes = await resTransportes.json();
        setTransportes(transportes);
  
        const resOficinas = await fetch('http://localhost:3000/oficina_tecnica');
        if (!resOficinas.ok) throw new Error('Error fetching oficinas');
        const oficinas = await resOficinas.json();
        setOficinas(oficinas);

        const resIngenieros = await fetch('http://localhost:3000/ingeniero');
        if (!resIngenieros.ok) throw new Error('Error fetching ingenieros');
        const ingenieros = await resIngenieros.json();
        setIngenieros(ingenieros);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Si el campo es código_pedido, limitar a 10 caracteres
    if (name === 'codigo_pedido' && value.length > 10) return;

    setNewPedido((prev) => {
      const updatedPedido = {
        ...prev,
        [name]: value,
      };

      // Si el cambio es en el producto, aplicar las reglas de bloqueo
      if (name === 'id_producto') {
        const selectedProduct = productos.find(p => p.id_producto.toString() === value);
        if (selectedProduct) {
          // PL: Ocultar ML y Frisos
          if (selectedProduct.tipo === 'PL') {
            updatedPedido.metros_lineales = '0';
            updatedPedido.frisos = '0';
          }
          // PL + FR: Ocultar ML
          else if (selectedProduct.tipo === 'PL + FR') {
            updatedPedido.metros_lineales = '0';
          }
          // PL + CLJ: Ocultar Frisos
          else if (selectedProduct.tipo === 'PL + CLJ') {
            updatedPedido.frisos = '0';
          }
        }
      }

      // Si el cambio es en la planta, actualizar el código de plano
      if (name === 'planta') {
        if (value === 'PT-ROTACIÓN') {
          updatedPedido.codigo_plano = 'P.R';
        } else if (value) {
          updatedPedido.codigo_plano = value;
        }
      }

      return updatedPedido;
    });
  };

  // Función auxiliar para determinar si mostrar campos específicos
  const shouldShowField = (fieldType) => {
    const selectedProduct = productos.find(p => p.id_producto.toString() === newPedido.id_producto);
    if (!selectedProduct) return true;

    switch (fieldType) {
      case 'metros_lineales':
        return !(selectedProduct.tipo === 'PL' || selectedProduct.tipo === 'PL + FR');
      case 'frisos':
        return !(selectedProduct.tipo === 'PL' || selectedProduct.tipo === 'PL + CLJ');
      default:
        return true;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Enviando al backend:', newPedido);
    addPedido(newPedido);
    onClose();
  };

  const copiarCodigo = () => {
    const codigo = document.getElementById('codigo_pedido_input').value;
    navigator.clipboard.writeText(codigo).then(() => {
      alert('Código copiado al portapapeles');
    }).catch(err => {
      console.error('Error copiando el código: ', err);
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content-pedido">
        <div className="modal-header">
          <h1 className='modal-title-proyecto'>Nuevo Pedido</h1>
          <button onClick={onClose} className="close-modal">
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit} className="pedido-form">

          {/* Inputs para los campos adicionales */}
          <div className="form-group">
            <label>Código de Pedido</label>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <input
                id="codigo_pedido_input"
                name="codigo_pedido"
                value={newPedido.codigo_pedido}
                onChange={handleInputChange}
                rows="3"
                style={{ width: '100%' }}
              />
              <button
                type="button"
                onClick={copiarCodigo}
                className="btn-generate"
              >
                Copiar
              </button>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="id_proyecto_cup">Proyecto CUP:</label>
            <select
              id="id_proyecto_cup"
              name="id_proyecto_cup"
              value={newPedido.id_proyecto_cup}
              onChange={handleInputChange}
              required
            >
              <option value="">--Seleccione un proyecto</option>
              {proyectosCUP.map((proyecto) => (
                <option key={proyecto.id_proyecto_cup} value={proyecto.id_proyecto_cup}>
                  {proyecto.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="id_usuario">Cliente:</label>
            <select
              id="id_usuario"
              name="id_usuario"
              value={newPedido.id_usuario}
              onChange={handleInputChange}
              required
            >
              <option value="">--Seleccione un usuario</option>
              {clientes.map((cliente) => (
                <option key={cliente.id} value={cliente.id}>
                  {cliente.nombre}
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
              <option value="">--Seleccione un producto</option>
              {productos.map((producto) => (
                <option key={producto.id_producto} value={producto.id_producto}>
                  {producto.tipo}
                </option>
              ))}
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

          {/* Metros Lineales - mostrar solo si corresponde */}
          {shouldShowField('metros_lineales') && (
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
          )}

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

          {/* Frisos - mostrar solo si corresponde */}
          {shouldShowField('frisos') && (
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
          )}

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
            <label htmlFor="unidades">Unidades:</label>
            <input
              type="number"
              id="unidades"
              name="unidades"
              value={newPedido.unidades}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="especiales">Especiales:</label>
            <input
              type="text"
              id="especiales"
              name="especiales"
              value={newPedido.especiales}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="id_oficina">Oficina Técnica:</label>
            <select
              id="id_oficina"
              name="id_oficina"
              value={newPedido.id_oficina}
              onChange={handleInputChange}
              required
            >
              <option value="">--Seleccione un Técnico</option>
              {oficinas.map((oficina) => (
                <option key={oficina.id} value={oficina.id}>
                  {oficina.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="id_ingeniero">Ingeniero:</label>
            <select
              id="id_ingeniero"
              name="id_ingeniero"
              value={newPedido.id_ingeniero}
              onChange={handleInputChange}
              required
            >
              <option value="">--Seleccione un Ingeniero</option>
              {ingenieros.map((ingeniero) => (
                <option key={ingeniero.id} value={ingeniero.id}>
                  {ingeniero.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="planta">Planta:</label>
            <select
              id="planta"
              name="planta"
              value={newPedido.planta}
              onChange={handleInputChange}
              required
            >
              <option value="">--Seleccione una opción</option>
              <option value="PLANTA-1">PLANTA 1</option>
              <option value="PLANTA-2">PLANTA 2</option>
              <option value="PLANTA-4">PLANTA 4</option>
              <option value="PT-AREQUIPA">PT AREQUIPA</option>
              <option value="PT-ROTACIÓN">PT ROTACIÓN</option>
            </select>
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
            <label htmlFor="piso">Piso:</label>
            <input
              type="text"
              id="piso"
              name="piso"
              value={newPedido.piso}
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
            <label htmlFor="id_transporte">Transporte:</label>
            <select
              id="id_transporte"
              name="id_transporte"
              value={newPedido.id_transporte}
              onChange={handleInputChange}
              required
            >
              <option value="">--Seleccione un transporte</option>
              {transportes.map((transporte) => (
                <option key={transporte.id_transporte} value={transporte.id_transporte}>
                  {transporte.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="modal-footer-pedido">
            <button type="button" onClick={onClose} className="btn-cancelar">
              Cancelar
            </button>
            <button type="submit" className="btn-guardar">Guardar</button>  
          </div>
        </form>
      </div>
    </div>
  );
};

export default PedidoModal;
