import React from 'react';
import DropDownList from './DropDownList';
const DropDownContainer = ({selectedNews, selectedSort, selectedTime,handleTimeChange}) => {
  return (<div className="dropdown-container">
    <span>Search</span>
    <input type="select"></input>
    <span>by</span>
    <input type="select"></input>
    <span>for</span>
  <div class="btn-group">
   <button type="button" class="btn btn-danger dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    {selectedTime}
  </button>
  <div class="dropdown-menu">
    <a class="dropdown-item" href="#" onClick={(e)=>handleTimeChange(e.target.innerText)}>Action</a>
    <a class="dropdown-item" href="#">Another action</a>
    <a class="dropdown-item" href="#">Something else here</a>
    <div class="dropdown-divider"></div>
    <a class="dropdown-item" href="#">Separated link</a>
  </div>
</div>
  <DropDownList selectedOption={selectedTime} handleChange={handleTimeChange} options={['All time','Last 24h','Past Week','Past Month', 'Past Year', 'Custom range']} />
</div>)
}

export default DropDownContainer;