import React, {useState,useEffect} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Pagination from 'react-js-pagination';
import DropDownContainer from './DropDownContainer';
import NewsFeed from './NewsFeed';
import usePrevious from './helpers/UsePrevious';
import {getDateFilter, getTagsFilter} from './helpers/SearchFilters';
import { useDebounce } from 'use-debounce';

const App = props => {
  // Hooks for state
  const [selectedPost, setPost] = useState('Stories')
  const [selectedSort, setSort] = useState('Popularity');
  const [selectedTime, setTime] = useState('All Time')
  const [currentSearchResults, setResults] = useState([]);
  const [numPages, setNumPages] = useState(0);
  const [activePage, setPage] = useState(1);
  const [searchQuery, setQuery] = useState('');
  // Track previous values
  const previousVals = {
    prevPost: usePrevious(selectedPost),
    prevTime: usePrevious(selectedTime),
    prevSort: usePrevious(selectedSort),
    prevSearch:usePrevious(searchQuery)
  }

  // Reusable function for tracking changed state w/ hooks
  const hasChanged = (prevVal, current) =>
  prevVal!== undefined&&prevVal!==current;
  const [debouncedQuery] = useDebounce(searchQuery,800);

  useEffect(() => {
    const {prevPost, prevSort, prevTime, prevSearch} = previousVals;
    // Previous values hasChanged
    let sort = hasChanged(prevSort, selectedSort);
    let time = hasChanged(prevTime, selectedTime);
    let post = hasChanged(prevPost, selectedPost);
    let query = hasChanged(prevSearch, debouncedQuery);
    // Sets page to 1 when activePage is not one and a get request is made
    if(activePage !== 1 &&(sort || time || post || query)) {
      return setPage(1);
    }

    // Get filters to be added to the get request
    let tags = getTagsFilter(selectedPost);
    let date = getDateFilter(selectedTime);
    let currQuery = debouncedQuery !== '' ? '&query='+ debouncedQuery : '';

    const fetchData = async (searchBy) => {
      const res = await axios.get(`http://hn.algolia.com/api/v1/${searchBy}?tags=${tags}${currQuery}&hitsPerPage=30&page=${activePage-1}${date}`);
      setResults(res.data.hits);
      setNumPages(res.data.nbPages);
    }
    // If second dropdown is "Popularity"
    if(selectedSort === "Popularity"){
      fetchData('search');
    } else {
      fetchData('search_by_date');
    }

  },[activePage,selectedSort,selectedPost,selectedTime, debouncedQuery]); // Detects changes within the following hooks
  return(
  <React.Fragment>
    {/* TODO: Make a component for this */}
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