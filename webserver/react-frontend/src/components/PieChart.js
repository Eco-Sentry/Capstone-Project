import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const PieGraph = ({id}) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    let chartInstance = null;

    if (chartInstance) {
      chartInstance.destroy();
    }

    chartInstance = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Sunny', 'Cloudy', 'Rainy', 'Snowy', 'Windy'],
        datasets: [{
          label: 'Weather Conditions in Sydney',
          data: [40, 20, 15, 10, 15], // Percentage of different weather conditions in Sydney
          backgroundColor: [
            'rgba(255, 206, 86, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(153, 102, 255, 0.2)'
          ],
          borderColor: [
            'rgba(255, 206, 86, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(255, 99, 132, 1)',
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
  }, [id]); // Empty dependency array to ensure the effect runs only once

  return (
    <div className="chart-container"> 
      <canvas ref={chartRef} id= {id} width='800' height='400' />
    </div>
  );
};

export default PieGraph;
