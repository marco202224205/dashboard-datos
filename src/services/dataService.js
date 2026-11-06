import datosVentas from '../data/ventas.json';

// Simula una petición HTTP: devuelve una Promesa con el JSON local tras una breve espera
export async function obtenerDatosVisualizacion() {
  await new Promise((resolver) => setTimeout(resolver, 800));
  return datosVentas;
}

// Prepara los datos para el renderizado: calcula ingresos y extrae etiquetas, valores y totales
export function procesarDatos(datos) {
  const registros = datos.map((dato) => ({
    ...dato,
    ingresos: dato.precio * dato.unidadesVendidas
  }));

  return {
    registros,
    etiquetas: registros.map((registro) => registro.producto),
    valores: registros.map((registro) => registro.ingresos),
    totalProductos: registros.length,
    unidadesTotales: registros.reduce((suma, registro) => suma + registro.unidadesVendidas, 0),
    ingresosTotales: registros.reduce((suma, registro) => suma + registro.ingresos, 0)
  };
}