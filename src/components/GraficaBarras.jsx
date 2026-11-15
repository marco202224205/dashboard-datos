import { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const formatoMoneda = (numero) =>
  numero.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });

function GraficaBarras({ etiquetas, valores, titulo }) {
  const lienzoRef = useRef(null);

  // Cada vez que cambian los datos, se destruye y se vuelve a crear la gráfica
  useEffect(() => {
    const grafica = new Chart(lienzoRef.current, {
      type: 'bar',
      data: {
        labels: etiquetas,
        datasets: [
          {
            label: titulo,
            data: valores,
            backgroundColor: [
              'rgba(52, 152, 219, 0.7)',
              'rgba(46, 204, 113, 0.7)',
              'rgba(231, 76, 60, 0.7)',
              'rgba(155, 89, 182, 0.7)',
              'rgba(241, 196, 15, 0.7)'
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (contexto) => ` ${formatoMoneda(contexto.parsed.y)}`
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: (valor) => `$${valor.toLocaleString('es-MX')}`
            }
          }
        }
      }
    });

    return () => grafica.destroy();
  }, [etiquetas, valores, titulo]);

  return (
    <div
      style={{
        position: 'relative',
        height: '320px',
        backgroundColor: 'white',
        border: '1px solid #dde3ea',
        borderRadius: '10px',
        padding: '16px',
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.08)'
      }}
    >
      <canvas ref={lienzoRef}></canvas>
    </div>
  );
}

export default GraficaBarras;