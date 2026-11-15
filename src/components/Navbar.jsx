const estilos = {
  barra: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '8px 16px',
    backgroundColor: '#2c3e50',
    color: 'white',
    padding: '14px 24px'
  },
  titulo: {
    margin: 0,
    fontSize: '1.3rem'
  },
  alumno: {
    fontSize: '0.95rem'
  }
};

function Navbar() {
  return (
    <nav style={estilos.barra}>
      <h1 style={estilos.titulo}>Dashboard de Ciencia de Datos</h1>
      <span style={estilos.alumno}>Marco Jafed Moreno Rodriguez</span>
    </nav>
  );
}

export default Navbar;