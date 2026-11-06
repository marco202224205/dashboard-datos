const estilos = {
  tarjeta: {
    flex: '1 1 220px',
    backgroundColor: 'white',
    border: '1px solid #dde3ea',
    borderRadius: '10px',
    padding: '20px',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.08)'
  },
  titulo: {
    margin: 0,
    fontSize: '0.95rem',
    color: '#5d6d7e'
  },
  valor: {
    margin: '10px 0 0',
    fontSize: '1.8rem',
    fontWeight: 'bold',
    color: '#2c3e50'
  }
};

function TarjetaMetrica({ titulo, valor }) {
  return (
    <div style={estilos.tarjeta}>
      <h3 style={estilos.titulo}>{titulo}</h3>
      <p style={estilos.valor}>{valor}</p>
    </div>
  );
}

export default TarjetaMetrica;