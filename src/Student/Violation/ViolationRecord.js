import React, { useState } from 'react';
import { FaBell, FaGavel, FaChevronRight } from 'react-icons/fa';
import './ViolationRecord.css';

const ViolationRecord = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortType, setSortType] = useState('Highest');
  const [filterType, setFilterType] = useState('All');

  const allRecords = [
    { id: 1, type: 'Minor', count: 3 },
    { id: 2, type: 'Minor', count: 4 },
    { id: 3, type: 'Bullying', count: 5 },
  ];

  // Filtering
  const filteredRecords = allRecords.filter(record => {
    const matchesSearch = record.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'All' || 
                          (filterType === 'Major Offense' && record.type === 'Bullying') ||
                          (filterType === 'Minor Offense' && record.type === 'Minor');
    return matchesSearch && matchesFilter;
  });

  // Sorting
  const sortedRecords = [...filteredRecords].sort((a, b) => {
    if (sortType === 'Highest') return b.count - a.count;
    if (sortType === 'Lowest') return a.count - b.count;
    return 0;
  });

  return (
    <div className="violation-page">
      {/* Header */}
      <div className="header">
        <h1>Violation Record</h1>
        <FaBell className="bell-icon" />
      </div>

      {/* Search and Filter */}
      <div className="search-filters">
        <div className="search-bar">
          <FaGavel className="search-icon" />
          <input
            type="text"
            placeholder="Search Here"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <select
          className="dropdown"
          value={sortType}
          onChange={(e) => setSortType(e.target.value)}
        >
          <option value="Highest">Highest</option>
          <option value="Lowest">Lowest</option>
        </select>

        <div className="filter-buttons">
          <button
            className={filterType === 'All' ? 'active' : ''}
            onClick={() => setFilterType('All')}
          >
            All
          </button>
          <button
            className={filterType === 'Major Offense' ? 'active' : ''}
            onClick={() => setFilterType('Major Offense')}
          >
            Major Offense
          </button>
          <button
            className={filterType === 'Minor Offense' ? 'active' : ''}
            onClick={() => setFilterType('Minor Offense')}
          >
            Minor Offense
          </button>
        </div>
      </div>

      {/* Record List */}
      <div className="record-list">
        {sortedRecords.map((record) => (
          <div key={record.id} className="record-row">
            <div className="icon-box">
              <FaGavel className="gavel-icon" />
            </div>
            <div className="record-info">
              <span className="record-type">{record.type}</span>
              <span className="record-count">{record.count}</span>
            </div>
            <FaChevronRight className="chevron-icon" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViolationRecord;
