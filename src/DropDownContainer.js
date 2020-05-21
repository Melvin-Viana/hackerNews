import React from 'react';
import DropDownList from './DropDownList';
const categories = ['Stories', 'Comments', 'All'];
const postFilters = ['Popularity', 'Date'];
const times = ['All time','Last 24h','Past Week','Past Month', 'Past Year', 'Custom range'];
const DropDownContainer = ({selectedNews, selectedSort, selectedTime,handleTimeChange, handleNewsChange, handleSortChange}) => {
  return (<div className="dropdown-container">
    <span>Search</span>
    <DropDownList selectedOption={selectedNews} handleChange={handleNewsChange} options={categories} />
    <span>by</span>
    <DropDownList selectedOption={selectedSort} handleChange={handleSortChange} options={postFilters} />
    <span>for</span>
  <DropDownList selectedOption={selectedTime} handleChange={handleTimeChange} options={times} />
</div>)
}

export default DropDownContainer;