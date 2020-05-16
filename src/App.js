import React, {useState,useEffect} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import DropDownContainer from './DropDownContainer';
const App = props => {

  const [selectedTime, setTime] = useState('All Time')

  useEffect(()=>{
    // axios.get('http://hn.algolia.com/api/v1/search?tags=front_page')
    // .then(data=>{
    //   console.log(data);
    // })
  },[]);
  return(<DropDownContainer
    handleTimeChange={setTime}
    selectedTime={selectedTime}/>);
};

ReactDOM.render(<App/>, document.getElementById('app'));


