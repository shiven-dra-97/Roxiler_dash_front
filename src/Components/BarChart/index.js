import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import "./index.css"
const BarChart = () => {
  const [month, setMonth] = useState('March'); 
  const [priceRanges, setPriceRanges] = useState({});
  const chartRef = useRef(null); 

  useEffect(() => {
    const fetchPriceRanges = async () => {
      try {
        const response = await fetch(`http://localhost:5000/price-ranges?month=${month}`);
        if (!response.ok) {
          throw new Error('Failed to fetch price ranges');
        }
        const data = await response.json();
        setPriceRanges(data.data);
      } catch (error) {
        console.error('Error fetching price ranges:', error);
      }
    };

    fetchPriceRanges();
  }, [month]);

  useEffect(() => {
  
    if (chartRef.current && Object.keys(priceRanges).length > 0) {
      const labels = Object.keys(priceRanges);
      const data = Object.values(priceRanges);

     
      if (chartRef.current.chart) {
        chartRef.current.chart.destroy();
      }


      chartRef.current.chart = new Chart(chartRef.current, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Number of Sales',
            data: data,
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }, [priceRanges]);

  return (
    <div className='bar'>
      <label htmlFor="monthSelect">Select Month:</label>
      <select id="monthSelect" value={month} onChange={(e) => setMonth(e.target.value)}>
        <option value="January">January</option>
        <option value="February">February</option>
        <option value="March">March</option>
        <option value="April">April</option>
        <option value="May">May</option>
        <option value="June">June</option>
        <option value="July">July</option>
        <option value="August">August</option>
        <option value="September">September</option>
        <option value="October">October</option>
        <option value="November">November</option>
        <option value="December">December</option>
      </select>

      <canvas ref={chartRef} id="barChart" width="400" height="400"></canvas>
    </div>
  );
};

export default BarChart;
