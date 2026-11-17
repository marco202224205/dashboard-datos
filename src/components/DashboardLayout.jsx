import './DashboardLayout.css';

// Contenedor del dashboard: barra lateral de filtros + cuadrícula principal
// (tarjetas arriba, gráficos al centro y tabla abajo)
function DashboardLayout({ barra, estado, tarjetas, graficos, tabla }) {
  return (
    <div className="dashboard">
      <aside className="dashboard__barra">{barra}</aside>

      <main className="dashboard__principal">
        {estado && <p className="dashboard__estado">{estado}</p>}
        {tarjetas && <section className="dashboard__tarjetas">{tarjetas}</section>}
        {graficos && <section className="dashboard__graficos">{graficos}</section>}
        {tabla && <section className="dashboard__panel">{tabla}</section>}
      </main>
    </div>
  );
}

export default DashboardLayout;
