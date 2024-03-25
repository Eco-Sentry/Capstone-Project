import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const Histogram = ({ id, data, width = 1000, height = 600 }) => {
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
          label: 'Histogram',
          data,
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
  }, [id, data, width, height]);

  return (
    <div style={{ width: width, height: height }}>
      <canvas ref={chartRef} id={id} width={width} height={height}></canvas>
    </div>
  );
};

export default Histogram;
