import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

// Registro de los módulos de Chart.js que necesita el gráfico de líneas
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const formatoMoneda = (numero) =>
  numero.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });

const estiloContenedor = {
  position: 'relative',
  height: '320px',
  backgroundColor: 'white',
  border: '1px solid #dde3ea',
  borderRadius: '10px',
  padding: '16px',
  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.08)'
};

function GraficoTendencia({ labels, values, titulo = 'Evolución de los ingresos' }) {
  // Si el arreglo llega vacío, se muestra un aviso en lugar de una gráfica rota
  if (!labels || labels.length === 0) {
    return (
      <div
        style={{
          ...estiloContenedor,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#5d6d7e'
        }}
      >
        No hay datos para mostrar con los filtros seleccionados.
      </div>
    );
  }

  const data = {
    labels,
    datasets: [
      {
        label: 'Ingresos (MXN)',
        data: values,
        borderColor: '#2980b9',
        backgroundColor: 'rgba(41, 128, 185, 0.15)',
        pointBackgroundColor: '#2980b9',
        pointRadius: 4,
        pointHoverRadius: 7,
        borderWidth: 2,
        tension: 0.3,
        fill: true
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: 'index', intersect: false },
    plugins: {
      legend: { position: 'bottom' },
      title: { display: true, text: titulo, font: { size: 16 } },
      tooltip: {
        callbacks: {
          label: (contexto) => ` Ingresos: ${formatoMoneda(contexto.parsed.y)}`
        }
      }
    },
    scales: {
      x: { title: { display: true, text: 'Fecha' } },
      y: {
        beginAtZero: true,
        title: { display: true, text: 'Ingresos (MXN)' },
        ticks: { callback: (valor) => `$${valor.toLocaleString('es-MX')}` }
      }
    }
  };

  return (
    <div style={estiloContenedor}>
      <Line data={data} options={options} />
    </div>
  );
}

export default GraficoTendencia;
