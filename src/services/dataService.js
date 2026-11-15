import datosVentas from '../data/ventas.json';
import apiClient from './apiClient';

// Lista de categorías disponibles para el filtro (la primera opción es "todas")
export function obtenerCategorias() {
  return ['todas', ...new Set(datosVentas.map((venta) => venta.categoria))];
}

// Simula una petición HTTP con filtros (categoría y rango de fechas) y devuelve una Promesa
export async function obtenerDatosVisualizacion(filtros = {}) {
  const { categoria = 'todas', desde = '', hasta = '' } = filtros;

  await new Promise((resolver) => setTimeout(resolver, 400));

  return datosVentas.filter((venta) => {
    const coincideCategoria = categoria === 'todas' || venta.categoria === categoria;
    const despuesDeDesde = !desde || venta.fecha >= desde;
    const antesDeHasta = !hasta || venta.fecha <= hasta;
    return coincideCategoria && despuesDeDesde && antesDeHasta;
  });
}

// Prepara los datos para el renderizado: calcula ingresos, agrupa por categoría y obtiene totales
export function procesarDatos(datos) {
  const registros = datos.map((dato) => ({
    ...dato,
    ingresos: dato.precio * dato.unidadesVendidas
  }));

  // Ingresos agrupados por categoría (para la gráfica)
  const porCategoria = {};
  registros.forEach((registro) => {
    porCategoria[registro.categoria] =
      (porCategoria[registro.categoria] || 0) + registro.ingresos;
  });

  const ingresosTotales = registros.reduce((suma, registro) => suma + registro.ingresos, 0);

  return {
    registros,
    etiquetas: registros.map((registro) => registro.producto),
    valores: registros.map((registro) => registro.ingresos),
    categorias: Object.keys(porCategoria),
    ingresosPorCategoria: Object.values(porCategoria),
    totalProductos: registros.length,
    unidadesTotales: registros.reduce((suma, registro) => suma + registro.unidadesVendidas, 0),
    ingresosTotales,
    promedioVenta: registros.length > 0 ? ingresosTotales / registros.length : 0
  };
}

const redondear = (numero) => Number(numero.toFixed(1));

// Consulta la API externa (Open-Meteo) y devuelve la serie de tiempo climática ya limpia
export async function obtenerSerieDeTiempo({ latitud, longitud, fechaInicio, fechaFin }) {
  let respuesta;

  try {
    respuesta = await apiClient.get('/archive', {
      params: {
        latitude: latitud,
        longitude: longitud,
        start_date: fechaInicio,
        end_date: fechaFin,
        daily: 'temperature_2m_max,temperature_2m_min,precipitation_sum',
        timezone: 'auto'
      }
    });
  } catch (error) {
    // Open-Meteo explica el motivo en error.response.data.reason cuando rechaza la petición
    const motivo = error.response?.data?.reason || error.message;
    throw new Error(`No se pudo consultar la API: ${motivo}`);
  }

  // Extraer la carga útil (payload) de la respuesta
  const diario = respuesta.data.daily;

  if (!diario || !diario.time) {
    throw new Error('La API no devolvió datos para ese periodo.');
  }

  // Un registro por día; se omiten los días que la API aún no tiene (valores null)
  const registros = diario.time
    .map((fecha, i) => ({
      id: i + 1,
      fecha,
      tempMax: diario.temperature_2m_max[i],
      tempMin: diario.temperature_2m_min[i],
      precipitacion: diario.precipitation_sum[i]
    }))
    .filter((registro) => registro.tempMax !== null && registro.tempMin !== null);

  if (registros.length === 0) {
    throw new Error('No hay datos disponibles para ese periodo. Prueba con fechas más antiguas.');
  }

  const promedios = registros.map((registro) => (registro.tempMax + registro.tempMin) / 2);

  return {
    registros,
    resumen: {
      dias: registros.length,
      tempMaxima: redondear(Math.max(...registros.map((registro) => registro.tempMax))),
      tempMinima: redondear(Math.min(...registros.map((registro) => registro.tempMin))),
      tempPromedio: redondear(promedios.reduce((suma, valor) => suma + valor, 0) / promedios.length),
      lluviaTotal: redondear(
        registros.reduce((suma, registro) => suma + (registro.precipitacion || 0), 0)
      )
    }
  };
}