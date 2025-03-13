import React, { useState, useEffect } from 'react';
import './PedidoModal.css'; // Reutilizamos el mismo CSS
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

const ModalEditar = ({ open, onClose, pedido, onSave }) => {
  if (!open) {
    return null; // Si el modal no está abierto, no lo renderizamos
  }

  // Función para convertir la fecha al formato 'YYYY-MM-DD'
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (`0${date.getMonth() + 1}`).slice(-2); // Asegurarse de tener dos dígitos para el mes
    const day = (`0${date.getDate()}`).slice(-2); // Asegurarse de tener dos dígitos para el día
    return `${year}-${month}-${day}`;
  };

  // Inicializamos el estado con los valores del pedido
  const [formValues, setFormValues] = useState({
    codigo_pedido: pedido?.codigo_pedido || '',
    fecha: formatDate(pedido?.fecha) || '',
    hora: pedido?.hora || '',
    piso: pedido?.piso || '',
    nivel: pedido?.nivel || '',
    metros_cuadrados: pedido?.m2 || '',
    metros_lineales: pedido?.ml || '',
    kilogramos: pedido?.kg || '',
    frisos: pedido?.frisos_ml || '',
    chatas: pedido?.chatas_kg || '',
    unidades: pedido?.unidades || '',
    especiales: pedido?.especiales || '',
    codigo_plano: pedido?.codigo_plano || '',
    planta: pedido?.planta || '',
    id_proyecto_cup: pedido?.id_proyecto_cup || '',
    id_producto: pedido?.id_producto || '',
    id_usuario: pedido?.id_usuario || '',
    id_transporte: pedido?.id_transporte || '',
    id_oficina: pedido?.id_oficina || '',
    id_ingeniero: pedido?.id_ingeniero || '',
    // Mantenemos campos adicionales que podrían ser necesarios para la lógica existente
    nombre_proyecto_cup: pedido?.nombre_proyecto_cup || '',
    nombre_producto: pedido?.nombre_producto || '',
    oficina_especialidad: pedido?.oficina_especialidad || '',
    nombre_oficina: pedido?.nombre_oficina || '',
    nombre_usuario: pedido?.nombre_usuario || '',
    nombre_transporte: pedido?.nombre_transporte || '',
    suf: pedido?.suf || ''
  });

  // Eliminar el console.log para producción
  // console.log(formValues);

  const [userRole, setUserRole] = useState('');
  const [disableDate, setDisableDate] = useState(false);
  const [modalCodigoOpen, setModalCodigoOpen] = useState(false);
  const [codigoValidacion, setCodigoValidacion] = useState('');
  
  // Estados para almacenar los datos de las APIs
  const [proyectosCUP, setProyectosCUP] = useState([]);
  const [productos, setProductos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [oficinas, setOficinas] = useState([]);
  const [transportes, setTransportes] = useState([]);
  const [ingenieros, setIngenieros] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  // Este efecto se ejecuta cuando cambia el pedido o cuando se abre el modal
  useEffect(() => {
    if (pedido) {
      // Reiniciar los valores del formulario con los datos del pedido
      setFormValues({
        codigo_pedido: pedido?.codigo_pedido || '',
        fecha: formatDate(pedido?.fecha) || '',
        hora: pedido?.hora || '',
        piso: pedido?.piso || '',
        nivel: pedido?.nivel || '',
        metros_cuadrados: pedido?.m2 || '',
        metros_lineales: pedido?.ml || '',
        kilogramos: pedido?.kg || '',
        frisos: pedido?.frisos_ml || '',
        chatas: pedido?.chatas_kg || '',
        unidades: pedido?.unidades || '',
        especiales: pedido?.especiales || '',
        codigo_plano: pedido?.codigo_plano || '',
        planta: pedido?.planta || '',
        id_proyecto_cup: pedido?.id_proyecto_cup || '',
        id_producto: pedido?.id_producto || '',
        id_usuario: pedido?.id_usuario || '',
        id_transporte: pedido?.id_transporte || '',
        id_oficina: pedido?.id_oficina || '',
        id_ingeniero: pedido?.id_ingeniero || '',
        // Mantenemos campos adicionales que podrían ser necesarios para la lógica existente
        nombre_proyecto_cup: pedido?.nombre_proyecto_cup || '',
        nombre_producto: pedido?.nombre_producto || '',
        oficina_especialidad: pedido?.oficina_especialidad || '',
        nombre_oficina: pedido?.nombre_oficina || '',
        nombre_usuario: pedido?.nombre_usuario || '',
        nombre_transporte: pedido?.nombre_transporte || '',
        suf: pedido?.suf || ''
      });
    }
  }, [pedido, open]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch datos para los selects
        const resProyectos = await fetch('http://localhost:3000/proyecto');
        if (resProyectos.ok) {
          const proyectos = await resProyectos.json();
          setProyectosCUP(proyectos);
        }
        
        const resProductos = await fetch('http://localhost:3000/producto');
        if (resProductos.ok) {
          const productos = await resProductos.json();
          setProductos(productos);
        }
        
        const resUsuarios = await fetch('http://localhost:3000/usuario');
        if (resUsuarios.ok) {
          const usuarios = await resUsuarios.json();
          setUsuarios(usuarios);
        }

        const resClientes = await fetch('http://localhost:3000/cliente');
        if (resClientes.ok) {
          const clientes = await resClientes.json();
          setClientes(clientes);
        }
        
        const resOficinas = await fetch('http://localhost:3000/oficina_tecnica');
        if (resOficinas.ok) {
          const oficinas = await resOficinas.json();
          setOficinas(oficinas);
        }
        
        const resTransportes = await fetch('http://localhost:3000/transporte');
        if (resTransportes.ok) {
          const transportes = await resTransportes.json();
          setTransportes(transportes);
        }

        const resIngenieros = await fetch('http://localhost:3000/ingeniero');
        if (resIngenieros.ok) {
          const ingenieros = await resIngenieros.json();
          setIngenieros(ingenieros);
        }

        setDataLoaded(true);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    fetchData();
    
    const storedUserRole = localStorage.getItem('userRole');
    setUserRole(storedUserRole);

    // Verificar si el usuario es Cliente y si la fecha debe ser bloqueada
    if (storedUserRole === 'CLIENTE') {
      const currentDate = new Date();
      const orderDate = new Date(pedido?.fecha);
      const timeDiff = orderDate - currentDate;
      const daysDiff = timeDiff / (1000 * 60 * 60 * 24); // Convertir a días

      if (daysDiff <= 1.5) {
        setDisableDate(true);
      }
    } else if (storedUserRole === 'INGENIERO') {
      // Si es Ingeniero, bloquear solo la fecha hasta que se ingrese el código de validación
      setDisableDate(true);
    }
  }, [pedido]);

  // Este efecto se ejecuta cuando se han cargado los datos y cuando cambia el pedido
  useEffect(() => {
    if (dataLoaded && pedido) {
      let updatedValues = { ...formValues };
      let hasChanges = false;

      // Buscar el producto correspondiente por nombre
      if (pedido.nombre_producto && productos.length > 0) {
        const productoEncontrado = productos.find(p => p.tipo === pedido.nombre_producto);
        if (productoEncontrado) {
          updatedValues.id_producto = productoEncontrado.id_producto.toString();
          hasChanges = true;
        }
      }
      
      // Buscar el transporte correspondiente por nombre
      if (pedido.nombre_transporte && transportes.length > 0) {
        const transporteEncontrado = transportes.find(t => t.nombre === pedido.nombre_transporte);
        if (transporteEncontrado) {
          updatedValues.id_transporte = transporteEncontrado.id_transporte.toString();
          hasChanges = true;
        }
      }
      
      // Buscar la oficina correspondiente por nombre
      if (pedido.nombre_oficina && oficinas.length > 0) {
        const oficinaEncontrada = oficinas.find(o => o.nombre === pedido.nombre_oficina);
        if (oficinaEncontrada) {
          updatedValues.id_oficina = oficinaEncontrada.id.toString();
          hasChanges = true;
        }
      }
      
      // Buscar el ingeniero correspondiente por nombre
      if (pedido.nombre_ingeniero && ingenieros.length > 0) {
        const ingenieroEncontrado = ingenieros.find(i => i.nombre === pedido.nombre_ingeniero);
        if (ingenieroEncontrado) {
          updatedValues.id_ingeniero = ingenieroEncontrado.id.toString();
          hasChanges = true;
        }
      }
      
      // Buscar el usuario/cliente correspondiente por nombre
      if (pedido.nombre_usuario && clientes.length > 0) {
        const clienteEncontrado = clientes.find(c => c.nombre === pedido.nombre_usuario);
        if (clienteEncontrado) {
          updatedValues.id_usuario = clienteEncontrado.id.toString();
          hasChanges = true;
        }
      }

      if (hasChanges) {
        setFormValues(updatedValues);
      }
    }
  }, [dataLoaded, pedido, productos, transportes, oficinas, ingenieros, clientes]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    setFormValues(prev => {
      const updatedValues = { ...prev, [name]: value };

      // Si el cambio es en el producto, aplicar las reglas de bloqueo
      if (name === 'id_producto') {
        const selectedProduct = productos.find(p => p.id_producto?.toString() === value);
        if (selectedProduct) {
          // PL: Ocultar ML y Frisos
          if (selectedProduct.tipo === 'PL') {
            updatedValues.metros_lineales = '0';
            updatedValues.frisos = '0';
          }
          // PL + FR: Ocultar ML
          else if (selectedProduct.tipo === 'PL + FR') {
            updatedValues.metros_lineales = '0';
          }
          // PL + CLJ: Ocultar Frisos
          else if (selectedProduct.tipo === 'PL + CLJ') {
            updatedValues.frisos = '0';
          }
          // Actualizar también el nombre del producto para mantener la compatibilidad
          updatedValues.nombre_producto = selectedProduct.tipo;
        }
      }

      // Si el cambio es en la planta, actualizar el código de plano
      if (name === 'planta') {
        if (value === 'PT-ROTACIÓN') {
          updatedValues.codigo_plano = 'P.R';
        } else if (value) {
          updatedValues.codigo_plano = value;
        }
      }

      return updatedValues;
    });
  };

  // Función para determinar si mostrar campos específicos
  const shouldShowField = (fieldType) => {
    const selectedProduct = productos.find(p => p.id_producto?.toString() === formValues.id_producto);
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

  const handleSave = async () => {
    try {
      console.log('Datos que se están enviando al backend:', formValues);
      const encodedCodigoPedido = encodeURIComponent(formValues.codigo_pedido);
      const response = await fetch(`http://localhost:3000/actualizar_pedido/${encodedCodigoPedido}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
      });

      if (response.ok) {
        const updatedPedido = await response.json();
        onSave(updatedPedido); // Llama a la función onSave para manejar la actualización en el padre
        onClose(); // Cerrar modal
      } else {
        console.error('Error al actualizar el pedido');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  const handleFechaClick = () => {
    // Mostrar el modal para el código de validación solo si el usuario es Ingeniero
    if (userRole === 'INGENIERO') {
      setModalCodigoOpen(true);
    }
  };

  const handleCodigoValidacion = async () => {
    try {
      const userId = localStorage.getItem('userId'); // Obtén el usuarioId del localStorage
      if (!userId) {
        alert('No se pudo obtener el ID de usuario');
        return;
      }
  
      const data = {
        codigo: codigoValidacion,
        usuarioId: userId, // Usar el ID del usuario almacenado
      };
  
      console.log('Datos enviados al backend:', data);
  
      const response = await fetch('http://localhost:3000/verificar_codigo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
  
      if (response.ok && result.success) {
        setDisableDate(false);
        setModalCodigoOpen(false);
        alert('Código válido');
      } else {
        alert(result.message || 'Código de validación incorrecto');
      }
    } catch (error) {
      console.error('Error al validar el código:', error);
      alert('Hubo un error al validar el código. Inténtalo de nuevo más tarde.');
    }
  };

  const copiarCodigo = () => {
    const codigo = formValues.codigo_pedido;
    navigator.clipboard.writeText(codigo).then(() => {
      alert('Código copiado al portapapeles');
    }).catch(err => {
      console.error('Error copiando el código: ', err);
    });
  };

  return (
    <>
      <div className="modal-overlay">
        <div className="modal-content-pedido">
          <div className="modal-header">
            <h1 className='modal-title-proyecto'>Editar Pedido</h1>
            <button onClick={onClose} className="close-modal">
              &times;
            </button>
          </div>
          <form className="pedido-form">
            {/* Código de Pedido */}
            <div className="form-group">
              <label>Código de Pedido</label>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  id="codigo_pedido_input"
                  name="codigo_pedido"
                  value={formValues.codigo_pedido}
                  onChange={handleInputChange}
                  style={{ width: '100%' }}
                  disabled
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

            {/* Proyecto CUP */}
            <div className="form-group">
              <label htmlFor="id_proyecto_cup">Proyecto CUP:</label>
              <select
                id="id_proyecto_cup"
                name="id_proyecto_cup"
                value={formValues.id_proyecto_cup}
                onChange={handleInputChange}
                disabled={userRole === 'CLIENTE'}
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

            {/* Cliente */}
            <div className="form-group">
              <label htmlFor="id_usuario">Cliente:</label>
              <select
                id="id_usuario"
                name="id_usuario"
                value={formValues.id_usuario}
                onChange={handleInputChange}
                disabled={userRole === 'CLIENTE'}
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

            {/* Producto */}
            <div className="form-group">
              <label htmlFor="id_producto">Producto:</label>
              <select
                id="id_producto"
                name="id_producto"
                value={formValues.id_producto}
                onChange={handleInputChange}
                disabled={userRole === 'CLIENTE'}
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

            {/* Fecha */}
            <div className="form-group">
              <label>Fecha</label>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={formValues.fecha ? dayjs(formValues.fecha) : null}
                    onChange={(newValue) => {
                      handleInputChange({
                        target: {
                          name: 'fecha',
                          value: newValue ? newValue.format('YYYY-MM-DD') : ''
                        }
                      });
                    }}
                    disabled={disableDate}
                    disablePast
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        onClick: handleFechaClick,
                        className: 'date-picker-field'
                      }
                    }}
                  />
                </LocalizationProvider>
                {userRole !== 'CLIENTE' && (
                  <button
                    type="button"
                    onClick={handleFechaClick}
                    className="btn-generate"
                    style={{ marginLeft: '10px' }}
                  >
                    Verificar
                  </button>
                )}
              </div>
            </div>

            {/* Hora */}
            <div className="form-group">
              <label htmlFor="hora">Hora:</label>
              <input
                type="time"
                id="hora"
                name="hora"
                value={formValues.hora}
                onChange={handleInputChange}
                disabled={userRole === 'CLIENTE'}
                required
              />
            </div>       

            {/* Metros Cuadrados */}
            <div className="form-group">
              <label htmlFor="metros_cuadrados">Metros Cuadrados:</label>
              <input
                type="number"
                id="metros_cuadrados"
                name="metros_cuadrados"
                value={formValues.metros_cuadrados}
                onChange={handleInputChange}
                disabled={userRole === 'CLIENTE'}
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
                  value={formValues.metros_lineales}
                  onChange={handleInputChange}
                  disabled={userRole === 'CLIENTE'}
                  required
                />
              </div>
            )}

            {/* Kilogramos */}
            <div className="form-group">
              <label htmlFor="kilogramos">Kilogramos:</label>
              <input
                type="number"
                id="kilogramos"
                name="kilogramos"
                value={formValues.kilogramos}
                onChange={handleInputChange}
                disabled={userRole === 'CLIENTE'}
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
                  value={formValues.frisos}
                  onChange={handleInputChange}
                  disabled={userRole === 'CLIENTE'}
                  required
                />
              </div>
            )}

            {/* Chatas */}
            <div className="form-group">
              <label htmlFor="chatas">Chatas:</label>
              <input
                type="number"
                id="chatas"
                name="chatas"
                value={formValues.chatas}
                onChange={handleInputChange}
                disabled={userRole === 'CLIENTE'}
                required
              />
            </div>

            {/* Unidades */}
            <div className="form-group">
              <label htmlFor="unidades">Unidades:</label>
              <input
                type="number"
                id="unidades"
                name="unidades"
                value={formValues.unidades}
                onChange={handleInputChange}
                disabled={userRole === 'CLIENTE'}
                required
              />
            </div>

            {/* Especiales */}
            <div className="form-group">
              <label htmlFor="especiales">Especiales:</label>
              <input
                type="text"
                id="especiales"
                name="especiales"
                value={formValues.especiales}
                onChange={handleInputChange}
                disabled={userRole === 'CLIENTE'}
                required
              />
            </div>

            {/* Oficina Técnica */}
            <div className="form-group">
              <label htmlFor="id_oficina">Oficina Técnica:</label>
              <select
                id="id_oficina"
                name="id_oficina"
                value={formValues.id_oficina}
                onChange={handleInputChange}
                disabled={userRole === 'CLIENTE'}
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

            {/* Ingeniero */}
            <div className="form-group">
              <label htmlFor="id_ingeniero">Ingeniero:</label>
              <select
                id="id_ingeniero"
                name="id_ingeniero"
                value={formValues.id_ingeniero}
                onChange={handleInputChange}
                disabled={userRole === 'CLIENTE'}
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

            {/* Planta */}
            <div className="form-group">
              <label htmlFor="planta">Planta:</label>
              <select
                id="planta"
                name="planta"
                value={formValues.planta}
                onChange={handleInputChange}
                disabled={userRole === 'CLIENTE'}
                required
              >
                <option value="">--Seleccione una planta</option>
                {[
                  { id: 'PLANTA-1', nombre: 'PLANTA 1' },
                  { id: 'PLANTA-2', nombre: 'PLANTA 2' },
                  { id: 'PLANTA-4', nombre: 'PLANTA 4' },
                  { id: 'PT-AREQUIPA', nombre: 'PT AREQUIPA' },
                  { id: 'PT-ROTACIÓN', nombre: 'PT ROTACIÓN' }
                ].map((planta) => (
                  <option key={planta.id} value={planta.id}>
                    {planta.nombre}
                  </option>
                ))}
              </select>
            </div>

            {/* Código Plano */}
            <div className="form-group">
              <label htmlFor="codigo_plano">Código de Plano:</label>
              <input
                type="text"
                id="codigo_plano"
                name="codigo_plano"
                value={formValues.codigo_plano}
                onChange={handleInputChange}
                disabled={userRole === 'CLIENTE'}
                required
              />
            </div>


            {/* Piso */}
            <div className="form-group">
              <label htmlFor="piso">Piso:</label>
              <input
                type="text"
                id="piso"
                name="piso"
                value={formValues.piso}
                onChange={handleInputChange}
                disabled={userRole === 'CLIENTE'}
                required
              />
            </div>

            {/* Nivel */}
            <div className="form-group">
              <label htmlFor="nivel">Nivel:</label>
              <input
                type="text"
                id="nivel"
                name="nivel"
                value={formValues.nivel}
                onChange={handleInputChange}
                disabled={userRole === 'CLIENTE'}
                required
              />
            </div>

            {/* Transporte */}
            <div className="form-group">
              <label htmlFor="id_transporte">Transporte:</label>
              <select
                id="id_transporte"
                name="id_transporte"
                value={formValues.id_transporte}
                onChange={handleInputChange}
                disabled={userRole === 'CLIENTE'}
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
              <button type="button" onClick={handleSave} className="btn-guardar">
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Modal para el código de validación */}
      {modalCodigoOpen && (
        <div className="modal-overlay">
          <div className="modal-content-pedido" style={{ maxWidth: '400px' }}>
            <div className="modal-header">
              <h1 className='modal-title-proyecto'>Código de Validación</h1>
              <button onClick={() => setModalCodigoOpen(false)} className="close-modal">
                &times;
              </button>
            </div>
            <div style={{ padding: '20px' }}>
              <div className="form-group">
                <label>Ingrese el código</label>
                <input
                  value={codigoValidacion}
                  onChange={(e) => setCodigoValidacion(e.target.value)}
                  style={{ width: '100%' }}
                />
              </div>
              <div className="modal-footer-pedido">
                <button type="button" onClick={() => setModalCodigoOpen(false)} className="btn-cancelar">
                  Cancelar
                </button>
                <button type="button" onClick={handleCodigoValidacion} className="btn-guardar">
                  Validar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalEditar;