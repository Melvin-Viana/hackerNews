import React from 'react';

const DropDownList = ({selectedOption, handleChange, options}) => (
  <div class="btn-group">
  <button type="button" class="btn btn-danger dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    {selectedOption}
  </button>
  <div class="dropdown-menu">
   {options.map(option=> <a class="dropdown-item" href="#" onClick={(e)=>handleChange(e.target.innerText)}>{option}</a>)}
  </div>
</div>
);

export default DropDownList;