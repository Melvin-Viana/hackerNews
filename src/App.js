import React, {useState,useEffect} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

const App = props => {
  useEffect(()=>{
    axios.get('http://hn.algolia.com/api/v1/search?tags=front_page')
    .then(data=>{
      console.log(data);
    })
  },[]);
  return(<h2>Hey</h2>);
};

ReactDOM.render(<App/>, document.getElementById('app'));


