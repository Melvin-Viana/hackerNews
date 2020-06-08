import React, {useState,useEffect} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Pagination from 'react-js-pagination';
import DropDownContainer from './DropDownContainer';
import moment from 'moment';
import NewsFeed from './NewsFeed';
import usePrevious from './helpers/UsePrevious';

const App = props => {

  const [selectedPost, setPost] = useState('Stories')
  const [selectedSort, setSort] = useState('Popularity');
  const [selectedTime, setTime] = useState('All Time')
  const [currentSearchResults, setResults] = useState([]);
  const [searchQuery, setSearch] = useState('hello');
  const [numPages, setNumPages] = useState(0);
  const [activePage, setPage] = useState(1);
  const previousVals = {
    prevPost: usePrevious(selectedPost),
    prevTime: usePrevious(selectedTime),
    prevSort: usePrevious(selectedSort),
  }

  const hasChanged = (prevVal, current) =>
  prevVal!== undefined&&prevVal!==current;
  useEffect(()=>{
    let tags;
    const {prevPost, prevSort, prevTime} = previousVals;

    let sort = hasChanged(prevSort, selectedSort);
    let time = hasChanged(prevTime, selectedTime);
    let post = hasChanged(prevPost, selectedPost);

    if(activePage !== 1 &&(sort || time || post)) {
      return setPage(1);
    }
    switch(selectedPost) {
      case "Stories":
        tags = "story";
        break;
      case "Comments":
        tags = "comment";
        break;
      default:
        tags = "(story,comment)"
        break;
    }
    let date = (selectedTime==="All Time") ? '' : "&numericFilters=created_at_i>";

    switch(selectedTime){
      case 'Last 24h':
        date+=moment().subtract(1, 'days').unix();
        break;
      case 'Past Week':
        date += moment().subtract(1, 'weeks')
        .unix();
        break;
      case 'Past Month':
        date += moment().subtract(1,'months').unix();
        break;
      case 'Past Year':
        date += moment().subtract(1, 'years').unix();
        break;
      default:
        break;
    }
    if(selectedSort === "Popularity"){

      axios.get(`http://hn.algolia.com/api/v1/search?tags=${tags}&hitsPerPage=30&page=${activePage-1}${date}`)
      .then(res=>{
        setResults(res.data.hits);
        setNumPages(res.data.nbPages);
      }).catch(err=>{
        console.error(err);
      })
    } else {
      axios.get(`http://hn.algolia.com/api/v1/search_by_date?tags=${tags}&hitsPerPage=30&page=${activePage-1}${date}`)
        .then(res=>{
          setResults(res.data.hits);
          setNumPages(res.data.nbPages);
        }).catch(err=>{
          console.error(err);
        })
    }

  },[activePage,selectedSort,selectedPost,selectedTime]);
  return(
  <React.Fragment>
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


