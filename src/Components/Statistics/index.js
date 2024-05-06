import React, { useState, useEffect } from 'react';
import "./index.css"
const Statistics = () => {
  const [month, setMonth] = useState('March'); 
  const [totalSaleAmount, setTotalSaleAmount] = useState(0);
  const [totalSoldItems, setTotalSoldItems] = useState(0);
  const [totalNotSoldItems, setTotalNotSoldItems] = useState(0);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await fetch(`http://localhost:5000/statistics?month=${month}`);
        if (!response.ok) {
          throw new Error('Failed to fetch statistics');
        }
        const data = await response.json();
        setTotalSaleAmount(data.totalSaleAmount);
        setTotalSoldItems(data.totalSoldItems);
        setTotalNotSoldItems(data.totalNotSoldItems);
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };

    fetchStatistics();
  }, [month]);

  return (
    <div>
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

      <div className='data'>
        <h4>Total Sale Amount: {totalSaleAmount.toFixed(2)}</h4>
        <h4>Total Sold Items: {totalSoldItems}</h4>
        <h4>Total Not Sold Items: {totalNotSoldItems}</h4>
      </div>
    </div>
  );
};

export default Statistics;
