import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import TarjetaMetrica from './components/TarjetaMetrica';
import TablaDatos from './components/TablaDatos';
import { obtenerDatosVisualizacion, procesarDatos } from './services/dataService';

const estilos = {
  contenido: {
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '24px'
  },
  seccion: {
    margin: '28px 0 12px',
    color: '#2c3e50'
  },
  tarjetas: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '16px'
  },
  mensaje: {
    padding: '24px',
    color: '#5d6d7e'
  }
};

const formatoMoneda = (numero) =>
  numero.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });

function App() {
  // Estado: dataset procesado, indicador de carga y posible error
  const [datos, setDatos] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // Al montar la aplicación, pide los datos al servicio
  useEffect(() => {
    async function cargarDatos() {
      try {
        const respuesta = await obtenerDatosVisualizacion();
        setDatos(procesarDatos(respuesta));
      } catch (e) {
        console.error(e);
        setError('No se pudieron cargar los datos.');
      } finally {
        setCargando(false);
      }
    }

    cargarDatos();
  }, []);

  return (
    <div className="app">
      <Navbar />

      <main style={estilos.contenido}>
        {cargando && <p style={estilos.mensaje}>Cargando datos...</p>}
        {error && <p style={estilos.mensaje}>{error}</p>}

        {datos && (
          <>
            <h2 style={estilos.seccion}>Métricas clave</h2>
            <div style={estilos.tarjetas}>
              <TarjetaMetrica titulo="Total de productos" valor={datos.totalProductos} />
              <TarjetaMetrica
                titulo="Unidades vendidas"
                valor={datos.unidadesTotales.toLocaleString('es-MX')}
              />
              <TarjetaMetrica
                titulo="Ingresos totales"
                valor={formatoMoneda(datos.ingresosTotales)}
              />
            </div>

            <h2 style={estilos.seccion}>Detalle de ventas</h2>
            <TablaDatos datos={datos.registros} />
          </>
        )}
      </main>
    </div>
  );
}

export default App;