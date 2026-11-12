import { useState } from 'react';
import TarjetaMetrica from './TarjetaMetrica';
import TablaDatos from './TablaDatos';
import { obtenerSerieDeTiempo } from '../services/dataService';

const ciudades = [
  { nombre: 'Ciudad de México', latitud: 19.43, longitud: -99.13 },
  { nombre: 'Guadalajara', latitud: 20.67, longitud: -103.35 },
  { nombre: 'Monterrey', latitud: 25.67, longitud: -100.31 },
  { nombre: 'Mérida', latitud: 20.97, longitud: -89.62 }
];

const columnasClima = [
  { clave: 'fecha', titulo: 'Fecha' },
  { clave: 'tempMax', titulo: 'Temp. máxima', formato: (n) => `${n} °C` },
  { clave: 'tempMin', titulo: 'Temp. mínima', formato: (n) => `${n} °C` },
  {
    clave: 'precipitacion',
    titulo: 'Precipitación',
    formato: (n) => (n === null ? 'Sin dato' : `${n} mm`)
  }
];

const estilos = {
  formulario: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '12px',
    alignItems: 'flex-end',
    marginBottom: '20px'
  },
  campo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    fontSize: '0.9rem',
    color: '#5d6d7e'
  },
  entrada: {
    padding: '8px',
    border: '1px solid #c5ccd3',
    borderRadius: '6px',
    fontSize: '1rem'
  },
  boton: {
    padding: '10px 18px',
    backgroundColor: '#2c3e50',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '1rem',
    cursor: 'pointer'
  },
  cargando: {
    color: '#2c3e50',
    fontWeight: 'bold'
  },
  alerta: {
    backgroundColor: '#fdecea',
    color: '#c0392b',
    border: '1px solid #e6b0aa',
    borderRadius: '6px',
    padding: '12px 16px'
  },
  tarjetas: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '16px',
    margin: '16px 0'
  }
};

function PanelAnalitico() {
  // Los tres estados que pide el PDF
  const [datos, setDatos] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  // Estados del formulario
  const [indiceCiudad, setIndiceCiudad] = useState(0);
  const [fechaInicio, setFechaInicio] = useState('2026-10-01');
  const [fechaFin, setFechaFin] = useState('2026-10-14');

  async function consultarApi() {
    if (fechaInicio > fechaFin) {
      setError('La fecha de inicio no puede ser posterior a la fecha final.');
      return;
    }

    // Antes de llamar al servicio: cargando en true y se limpian errores y datos anteriores
    setCargando(true);
    setError(null);
    setDatos(null);

    try {
      const ciudad = ciudades[indiceCiudad];
      const resultado = await obtenerSerieDeTiempo({
        latitud: ciudad.latitud,
        longitud: ciudad.longitud,
        fechaInicio,
        fechaFin
      });
      setDatos(resultado);
    } catch (e) {
      setError(e.message);
    } finally {
      setCargando(false);
    }
  }

  return (
    <section>
      <div style={estilos.formulario}>
        <label style={estilos.campo}>
          Ciudad
          <select
            style={estilos.entrada}
            value={indiceCiudad}
            onChange={(e) => setIndiceCiudad(Number(e.target.value))}
          >
            {ciudades.map((ciudad, i) => (
              <option key={ciudad.nombre} value={i}>
                {ciudad.nombre}
              </option>
            ))}
          </select>
        </label>

        <label style={estilos.campo}>
          Fecha de inicio
          <input
            style={estilos.entrada}
            type="date"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
          />
        </label>

        <label style={estilos.campo}>
          Fecha final
          <input
            style={estilos.entrada}
            type="date"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
          />
        </label>

        <button
          type="button"
          style={{ ...estilos.boton, opacity: cargando ? 0.6 : 1 }}
          onClick={consultarApi}
          disabled={cargando}
        >
          Consultar clima
        </button>
      </div>

      {cargando && <p style={estilos.cargando}>Analizando datos...</p>}

      {error && (
        <p role="alert" style={estilos.alerta}>
          {error}
        </p>
      )}

      {datos && (
        <>
          <div style={estilos.tarjetas}>
            <TarjetaMetrica titulo="Temp. máxima" valor={`${datos.resumen.tempMaxima} °C`} />
            <TarjetaMetrica titulo="Temp. mínima" valor={`${datos.resumen.tempMinima} °C`} />
            <TarjetaMetrica titulo="Temp. promedio" valor={`${datos.resumen.tempPromedio} °C`} />
            <TarjetaMetrica titulo="Lluvia total" valor={`${datos.resumen.lluviaTotal} mm`} />
          </div>
          <TablaDatos datos={datos.registros} columnas={columnasClima} />
        </>
      )}
    </section>
  );
}

export default PanelAnalitico;