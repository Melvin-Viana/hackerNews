import React from 'react';
import DropDownList from './DropDownList';
const categories = ['Stories', 'Comments', 'All'];
const postFilters = ['Popularity', 'Date'];
const times = ['All time','Last 24h','Past Week','Past Month', 'Past Year', 'Custom range'];
const DropDownContainer = ({selectedNews, selectedSort, selectedTime,handleTimeChange}) => {
  return (<div className="dropdown-container">
    <span>Search</span>
    <DropDownList selectedOption={selectedNews} handleChange={handleTimeChange} options={categories} />
    <span>by</span>
    <DropDownList selectedOption={selectedSort} handleChange={handleTimeChange} options={postFilters} />
    <span>for</span>

  <DropDownList selectedOption={selectedTime} handleChange={handleTimeChange} options={times} />
</div>)
}

export default DropDownContainer;