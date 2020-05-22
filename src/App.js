import React, {useState,useEffect} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import DropDownContainer from './DropDownContainer';
import NewsFeed from './NewsFeed';
const App = props => {

  const [selectedPost, setPost] = useState('Stories')
  const [selectedSort, setSort] = useState('Popularity');
  const [selectedTime, setTime] = useState('All Time')
  const [currentSearchResults, setResults] = useState({});
  const [searchQuery, setSearch] = useState('hello');
  useEffect(()=>{
    axios.get(`http://hn.algolia.com/api/v1/search?tags=front_page`)
    .then(res=>{
      setResults(res.data.hits);
      console.log(res.data)
    })
  },[]);
  return(
  <React.Fragment>
  <DropDownContainer
    handleTimeChange={setTime}
    selectedTime={selectedTime}
    handleNewsChange={setPost}
    selectedNews={selectedPost}
    handleSortChange={selectedSort}
    selectedSort={selectedSort}
    />
    <NewsFeed newsFeed={currentSearchResults}/>
    </React.Fragment>);
};

ReactDOM.render(<App/>, document.getElementById('app'));


