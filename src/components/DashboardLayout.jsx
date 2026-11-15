import './DashboardLayout.css';

// Contenedor del dashboard: barra lateral de filtros + cuadrícula principal
function DashboardLayout({ barra, estado, tarjetas, grafica, tabla }) {
  return (
    <div className="dashboard">
      <aside className="dashboard__barra">{barra}</aside>

      <main className="dashboard__principal">
        {estado && <p className="dashboard__estado">{estado}</p>}
        {tarjetas && <section className="dashboard__tarjetas">{tarjetas}</section>}
        {grafica && <section className="dashboard__panel">{grafica}</section>}
        {tabla && <section className="dashboard__panel">{tabla}</section>}
      </main>
    </div>
  );
}

export default DashboardLayout;