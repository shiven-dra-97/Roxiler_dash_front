import React, { useState, useEffect } from 'react';
import "./index.css"
const DataTable = () => {
  const [records, setRecords] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchText, setSearchText] = useState('');

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/records?page=${currentPage}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setRecords(data.records);
      setCurrentPage(data.currentPage);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const handleSearch = () => {
    if (searchText.trim() === '') {
      
      fetchData();
    } else {
   
      const filteredRecords = records.filter(record =>
        record.title.toLowerCase().includes(searchText.toLowerCase()) ||
        record.description.toLowerCase().includes(searchText.toLowerCase()) ||
        String(record.price).toLowerCase().includes(searchText.toLowerCase())
      );
      setRecords(filteredRecords);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setSearchText('');
  };

  return (
    <>
   
      <div className="d-flex options w-100">
        <input className="search-query-box" type="search" placeholder="Search..."   onChange={(e) => setSearchText(e.target.value)} />
        <button className="btn btn-primary" onClick={handleSearch}>Search</button>
      </div>

 
      <table className="table table-bordered">
      
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Title</th>
            <th scope="col">Description</th>
            <th scope="col">Price</th>
            <th scope="col">Category</th>
            <th scope="col">Sold</th>
            <th scope="col">Image</th>
          </tr>
        </thead>
    
        <tbody>
          {records.map(record => (
            <tr key={record._id}>
              <td>{record._id}</td>
              <td>{record.title}</td>
              <td>{record.description}</td>
              <td>{record.price}</td>
              <td>{record.category}</td>
              <td>{record.sold?"Yes":"No"}</td>
              <td><img className='img-size' src={record.image} alt={record.title}/></td>
            </tr>
          ))}
        </tbody>
      </table>

  
      <div className="d-flex justify-content-between">
        <p>Page No : {currentPage}</p>
        <div className="d-flex justify-content-between button-box">
          <button className='btn' onClick={() => handlePageChange(prevPage => prevPage > 1 ? prevPage - 1 : prevPage)}>Previous</button>
          <button className='btn' onClick={() => handlePageChange(prevPage => prevPage < totalPages ? prevPage + 1 : prevPage)}>Next</button>
        </div>
        <p>Per Page : 10</p>
      </div>
    </>
  );
};

export default DataTable;
