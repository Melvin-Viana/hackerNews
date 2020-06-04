import React, {useState,useEffect} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Pagination from 'react-js-pagination';
import DropDownContainer from './DropDownContainer';
import NewsFeed from './NewsFeed';
const App = props => {

  const [selectedPost, setPost] = useState('Stories')
  const [selectedSort, setSort] = useState('Popularity');
  const [selectedTime, setTime] = useState('All Time')
  const [currentSearchResults, setResults] = useState([]);
  const [searchQuery, setSearch] = useState('hello');
  const [numPages, setNumPages] = useState(0);
  const [activePage, setPage] = useState(1);
  useEffect(()=>{
    console.log(activePage);
    axios.get(`http://hn.algolia.com/api/v1/search?tags=story&hitsPerPage=30&page=${activePage-1}`)
    .then(res=>{
      console.log(res)
      setResults(res.data.hits);
      setNumPages(res.data.nbPages);
      console.log('hey')
    }).catch(err=>{
      console.error(err);
    })
  },[activePage]);
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
    <Pagination
      hideNavigation
      pageRangeDisplayed={6}
      activePage={activePage}
      itemsCountPerPage={1}
      totalItemsCount={numPages}
      onChange={setPage}
    />
    </React.Fragment>);
};

ReactDOM.render(<App/>, document.getElementById('app'));


