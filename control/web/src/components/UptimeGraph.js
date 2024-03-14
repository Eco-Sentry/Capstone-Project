import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const UptimeGraph = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    let chartInstance = null;

    if (chartInstance) {
      chartInstance.destroy();
    }

    chartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
          label: 'Uptime',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
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
  }, []);

  return (
    <div className="uptime-graph">
      {/* <h3>Uptime Graph</h3> */}
      <canvas ref={chartRef} id="uptimeChart" width="400" height="400"></canvas>
    </div>
  );
};

export default UptimeGraph;