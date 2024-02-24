import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const ConnectionGraph = () => {
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
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
          label: 'Connection',
          data: [65, 59, 80, 81, 56, 55, 40],
          backgroundColor: 'rgb(54, 162, 235)',
          borderColor: 'rgb(54, 162, 235)',
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
  }, []);

  return (
    <div className="connection-graph">
      {/* <h3>Connection Graph</h3> */}
      <canvas ref={chartRef} id="connectionChart" width="400" height="400"></canvas>
    </div>
  );
};

export default ConnectionGraph;