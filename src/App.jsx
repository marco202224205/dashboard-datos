import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import DashboardLayout from './components/DashboardLayout';
import PanelFiltros from './components/PanelFiltros';
import TarjetaMetrica from './components/TarjetaMetrica';
import GraficaBarras from './components/GraficaBarras';
import TablaDatos from './components/TablaDatos';
import {
  obtenerCategorias,
  obtenerDatosVisualizacion,
  procesarDatos
} from './services/dataService';

const formatoMoneda = (numero) =>
  numero.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });

const columnasVentas = [
  { clave: 'id', titulo: 'ID' },
  { clave: 'producto', titulo: 'Producto' },
  { clave: 'categoria', titulo: 'Categoría' },
  { clave: 'fecha', titulo: 'Fecha' },
  { clave: 'precio', titulo: 'Precio', formato: formatoMoneda },
  { clave: 'unidadesVendidas', titulo: 'Unidades' },
  { clave: 'ingresos', titulo: 'Ingresos', formato: formatoMoneda }
];

const categorias = obtenerCategorias();

function App() {
  // Estado global de los filtros: lo comparten el panel y todas las visualizaciones
  const [filtros, setFiltros] = useState({ categoria: 'todas', desde: '', hasta: '' });
  const [datos, setDatos] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // Escucha los cambios de filtros: cada vez que cambian, vuelve a pedir y procesar los datos
  useEffect(() => {
    let vigente = true; // evita aplicar una respuesta vieja si el filtro cambia rápido

    async function cargarDatos() {
      setCargando(true);
      setError(null);

      try {
        const respuesta = await obtenerDatosVisualizacion(filtros);
        if (vigente) setDatos(procesarDatos(respuesta));
      } catch (e) {
        console.error(e);
        if (vigente) setError('No se pudieron cargar los datos.');
      } finally {
        if (vigente) setCargando(false);
      }
    }

    cargarDatos();

    return () => {
      vigente = false;
    };
  }, [filtros]);

  let estado = null;
  if (error) estado = error;
  else if (!datos && cargando) estado = 'Cargando datos...';
  else if (cargando) estado = 'Actualizando...';

  return (
    <div className="app">
      <Navbar />

      <DashboardLayout
        barra={
          <PanelFiltros filtros={filtros} setFiltros={setFiltros} categorias={categorias} />
        }
        estado={estado}
        tarjetas={
          datos && (
            <>
              <TarjetaMetrica titulo="Ventas registradas" valor={datos.totalProductos} />
              <TarjetaMetrica
                titulo="Unidades vendidas"
                valor={datos.unidadesTotales.toLocaleString('es-MX')}
              />
              <TarjetaMetrica
                titulo="Ingresos totales"
                valor={formatoMoneda(datos.ingresosTotales)}
              />
              <TarjetaMetrica
                titulo="Ingreso promedio por venta"
                valor={formatoMoneda(datos.promedioVenta)}
              />
            </>
          )
        }
        grafica={
          datos && (
            <>
              <h2>Ingresos por categoría</h2>
              <GraficaBarras
                etiquetas={datos.categorias}
                valores={datos.ingresosPorCategoria}
                titulo="Ingresos (MXN)"
              />
            </>
          )
        }
        tabla={
          datos && (
            <>
              <h2>Detalle de ventas</h2>
              {datos.registros.length > 0 ? (
                <TablaDatos datos={datos.registros} columnas={columnasVentas} />
              ) : (
                <p className="dashboard__estado">No hay ventas con los filtros seleccionados.</p>
              )}
            </>
          )
        }
      />
    </div>
  );
}

export default App;