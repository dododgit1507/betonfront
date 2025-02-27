// helpers/niveles.js

// Definimos los posibles niveles o estados que pueden tener los pedidos
const nivelesPedido = {
    PENDIENTE: 'Pendiente',
    COMPLETADO: 'Completado',
    CANCELADO: 'Cancelado',
  };
  
  // Una función para obtener el nivel según el estado del pedido
  const obtenerNivelPedido = (estado) => {
    switch (estado) {
      case nivelesPedido.PENDIENTE:
        return 'En proceso';
      case nivelesPedido.COMPLETADO:
        return 'Finalizado';
      case nivelesPedido.CANCELADO:
        return 'Cancelado';
      default:
        return 'Desconocido';
    }
  };
  
  export { nivelesPedido, obtenerNivelPedido };
  