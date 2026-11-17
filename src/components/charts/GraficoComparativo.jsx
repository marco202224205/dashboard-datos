import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Title, Tooltip, Legend } from 'chart.js';

// Registro de los módulos de Chart.js que necesita el gráfico circular
ChartJS.register(ArcElement, Title, Tooltip, Legend);

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

const colores = [
  'rgba(52, 152, 219, 0.8)',
  'rgba(46, 204, 113, 0.8)',
  'rgba(231, 76, 60, 0.8)',
  'rgba(155, 89, 182, 0.8)',
  'rgba(241, 196, 15, 0.8)'
];

function GraficoComparativo({ labels, values, titulo = 'Ingresos por categoría' }) {
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
        backgroundColor: colores,
        borderColor: 'white',
        borderWidth: 2,
        hoverOffset: 10
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom' },
      title: { display: true, text: titulo, font: { size: 16 } },
      tooltip: {
        callbacks: {
          label: (contexto) => {
            const total = contexto.dataset.data.reduce((suma, valor) => suma + valor, 0);
            const porcentaje = ((contexto.parsed / total) * 100).toFixed(1);
            return ` ${contexto.label}: ${formatoMoneda(contexto.parsed)} (${porcentaje}%)`;
          }
        }
      }
    }
  };

  return (
    <div style={estiloContenedor}>
      <Doughnut data={data} options={options} />
    </div>
  );
}

export default GraficoComparativo;
