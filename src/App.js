import React, {useState,useEffect} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Pagination from 'react-js-pagination';
import DropDownContainer from './DropDownContainer';
import NewsFeed from './NewsFeed';
import usePrevious from './helpers/UsePrevious';
import {getDateFilter, getTagsFilter} from './helpers/SearchFilters';
const App = props => {

  const [selectedPost, setPost] = useState('Stories')
  const [selectedSort, setSort] = useState('Popularity');
  const [selectedTime, setTime] = useState('All Time')
  const [currentSearchResults, setResults] = useState([]);
  const [numPages, setNumPages] = useState(0);
  const [activePage, setPage] = useState(1);
  const [searchQuery, setQuery] = useState('')
  const previousVals = {
    prevPost: usePrevious(selectedPost),
    prevTime: usePrevious(selectedTime),
    prevSort: usePrevious(selectedSort),
    prevSearch:usePrevious(searchQuery)
  }

  const hasChanged = (prevVal, current) =>
  prevVal!== undefined&&prevVal!==current;
  useEffect( ()=>{
    const {prevPost, prevSort, prevTime, prevSearch} = previousVals;
    // Previous values hasChanged
    let sort = hasChanged(prevSort, selectedSort);
    let time = hasChanged(prevTime, selectedTime);
    let post = hasChanged(prevPost, selectedPost);
    let query = hasChanged(prevSearch, searchQuery);

    if(activePage !== 1 &&(sort || time || post || query)) {
      return setPage(1);
    }
    let tags = getTagsFilter(selectedPost);
    let currQuery = searchQuery !== '' ? '&query='+searchQuery : '';

    let date = getDateFilter(selectedTime);
    const fetchData = async (searchBy) => {
      const res = await axios.get(`http://hn.algolia.com/api/v1/${searchBy}?tags=${tags}${currQuery}&hitsPerPage=30&page=${activePage-1}${date}`);
      setResults(res.data.hits);
      setNumPages(res.data.nbPages);
    }
    if(selectedSort === "Popularity"){
      fetchData('search');
    } else {
      fetchData('search_by_date');
    }

  },[activePage,selectedSort,selectedPost,selectedTime, searchQuery]);
  return(
  <React.Fragment>
    <div class="header">
        <i class="fa fa-h-square fa-3x"></i>
        <h2>HackerNews</h2>
        <div class="search">
          <i class="fa fa-search fa-2x"></i>
          <input type="text" placeholder="Search stories by author, title, url or author" onChange={e=>setQuery(e.target.value)} value={searchQuery}/>
        </div>
        <i class="fa fa-cog fa-2x"></i>
        <h3>Settings</h3>

      </div>
  <DropDownContainer
    handleTimeChange={setTime}
    selectedTime={selectedTime}
    handleNewsChange={setPost}
    selectedNews={selectedPost}
    handleSortChange={setSort}
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


