import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const BarGraph = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    let chartInstance = null;

    if (chartInstance) {
      chartInstance.destroy();
    }

  chartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      datasets: [{
        label: 'Rainfall',
        data: [65, 59, 80, 81, 56, 55, 40, 20, 10, 20, 30, 40], // random values
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
  return () => {
    if (chartInstance) {
      chartInstance.destroy();
    }
  };
});
return (
  <div className="chart-container"> 
  <canvas ref={chartRef} width='800' height='400' />
  </div>
  );
};
export default BarGraph;


