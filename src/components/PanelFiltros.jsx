const estilos = {
  contenedor: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  titulo: {
    margin: 0,
    fontSize: '1.1rem',
    color: '#2c3e50'
  },
  campo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    fontSize: '0.9rem',
    color: '#5d6d7e'
  },
   entrada: {
    width: '100%',
    boxSizing: 'border-box',
    padding: '8px',
    border: '1px solid #c5ccd3',
    borderRadius: '6px',
    fontSize: '1rem'
  },
  boton: {
    padding: '10px 14px',
    backgroundColor: '#2c3e50',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '1rem',
    cursor: 'pointer'
  },
  aviso: {
    margin: 0,
    padding: '8px 10px',
    backgroundColor: '#fdecea',
    color: '#c0392b',
    borderRadius: '6px',
    fontSize: '0.85rem'
  }
};

const filtrosIniciales = { categoria: 'todas', desde: '', hasta: '' };

function PanelFiltros({ filtros, setFiltros, categorias }) {
  // Actualiza el estado global cada vez que el usuario cambia un control
  function manejarCambio(evento) {
    const { name, value } = evento.target;
    setFiltros((anteriores) => ({ ...anteriores, [name]: value }));
  }

  const rangoInvalido = filtros.desde && filtros.hasta && filtros.desde > filtros.hasta;

  return (
    <div style={estilos.contenedor}>
      <h2 style={estilos.titulo}>Filtros</h2>

      <label style={estilos.campo}>
        Categoría
        <select
          style={estilos.entrada}
          name="categoria"
          value={filtros.categoria}
          onChange={manejarCambio}
        >
          {categorias.map((categoria) => (
            <option key={categoria} value={categoria}>
              {categoria === 'todas' ? 'Todas las categorías' : categoria}
            </option>
          ))}
        </select>
      </label>

      <label style={estilos.campo}>
        Fecha desde
        <input
          style={estilos.entrada}
          type="date"
          name="desde"
          value={filtros.desde}
          onChange={manejarCambio}
        />
      </label>

      <label style={estilos.campo}>
        Fecha hasta
        <input
          style={estilos.entrada}
          type="date"
          name="hasta"
          value={filtros.hasta}
          onChange={manejarCambio}
        />
      </label>

      {rangoInvalido && (
        <p style={estilos.aviso}>La fecha inicial es posterior a la final.</p>
      )}

      <button type="button" style={estilos.boton} onClick={() => setFiltros(filtrosIniciales)}>
        Limpiar filtros
      </button>
    </div>
  );
}

export default PanelFiltros;