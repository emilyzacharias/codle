import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';


function Statistics({ statsArray }) {
  
  Chart.register(...registerables);
  
  const scoreCounts = {};
  statsArray.forEach(score => {
    scoreCounts[score] = (scoreCounts[score] || 0) + 1;
  });

  // Prepare data for the chart
  const labels = ['1', '2', '3', '4', '5', '6', '7', '8', 'X'];
  const data = labels.map(label => scoreCounts[label] || 0);


  const backgroundColors = labels.map(label => (label == statsArray[statsArray.length - 1] ? 'green' : 'gray'));

  console.log(statsArray[statsArray.length - 1]);
  // Define the chart data
  const chartData = {
    labels: labels,
    datasets: [{
      label: 'Score Distribution',
      data: data,
      backgroundColor: backgroundColors,
      borderWidth: 0
      
    }]
  };

  // Define the chart options
  const chartOptions = {
    scales: {
      x: {
        type: 'category', // Set x-axis scale type to 'category'
        ticks: {
          beginAtZero: true
        }
      },
      y: {
        display: false, // Hide x-axis labels
        ticks: {
          beginAtZero: true
        }
        
      }
      
    },
    plugins: {
      legend: {
        display: false // Hide the legend
      }
    }
    
  };

  return (
    <div>
      
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
}

export default Statistics;