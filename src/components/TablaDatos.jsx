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

// Columnas por defecto: las de la tabla de ventas
const columnasVentas = [
  { clave: 'id', titulo: 'ID' },
  { clave: 'producto', titulo: 'Producto' },
  { clave: 'categoria', titulo: 'Categoría' },
  { clave: 'precio', titulo: 'Precio', formato: formatoMoneda },
  { clave: 'unidadesVendidas', titulo: 'Unidades vendidas' },
  { clave: 'ingresos', titulo: 'Ingresos', formato: formatoMoneda }
];

function TablaDatos({ datos, columnas = columnasVentas }) {
  return (
    <div style={estilos.contenedor}>
      <table style={estilos.tabla}>
        <thead>
          <tr>
            {columnas.map((columna) => (
              <th key={columna.clave} style={estilos.encabezado}>
                {columna.titulo}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {datos.map((fila) => (
            <tr key={fila.id}>
              {columnas.map((columna) => (
                <td key={columna.clave} style={estilos.celda}>
                  {columna.formato ? columna.formato(fila[columna.clave]) : fila[columna.clave]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TablaDatos;