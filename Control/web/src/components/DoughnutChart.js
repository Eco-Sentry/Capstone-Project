import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const DoughnutGraph = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    let chartInstance = null;

    if (chartInstance) {
      chartInstance.destroy();
    }

    chartInstance = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Darwin', 'Sydney', 'Perth', 'Canberra', 'Brisbane'], // Location names
        datasets: [{
          label: 'Humidity',
          data: [70, 65, 75, 80, 72], // Humidity data for each location
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      }
    });

    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, []); // Empty dependency array to ensure the effect runs only once

  return (
    <div className="chart-container"> 
      <canvas ref={chartRef} width='800' height='400' />
    </div>
  );
};

export default DoughnutGraph;
