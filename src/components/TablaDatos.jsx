const estilos = {
  contenedor: {
    backgroundColor: 'white',
    border: '1px solid #dde3ea',
    borderRadius: '10px',
    padding: '20px',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.08)',
    overflowX: 'auto'
  },
  tabla: {
    width: '100%',
    borderCollapse: 'collapse'
  },
  encabezado: {
    backgroundColor: '#2c3e50',
    color: 'white',
    padding: '10px 12px',
    textAlign: 'left'
  },
  celda: {
    padding: '10px 12px',
    borderBottom: '1px solid #e5e8eb'
  }
};

const formatoMoneda = (numero) =>
  numero.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });

function TablaDatos({ datos }) {
  return (
    <div style={estilos.contenedor}>
      <table style={estilos.tabla}>
        <thead>
          <tr>
            <th style={estilos.encabezado}>ID</th>
            <th style={estilos.encabezado}>Producto</th>
            <th style={estilos.encabezado}>Categoría</th>
            <th style={estilos.encabezado}>Precio</th>
            <th style={estilos.encabezado}>Unidades vendidas</th>
            <th style={estilos.encabezado}>Ingresos</th>
          </tr>
        </thead>
        <tbody>
          {datos.map((fila) => (
            <tr key={fila.id}>
              <td style={estilos.celda}>{fila.id}</td>
              <td style={estilos.celda}>{fila.producto}</td>
              <td style={estilos.celda}>{fila.categoria}</td>
              <td style={estilos.celda}>{formatoMoneda(fila.precio)}</td>
              <td style={estilos.celda}>{fila.unidadesVendidas}</td>
              <td style={estilos.celda}>{formatoMoneda(fila.ingresos)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TablaDatos;