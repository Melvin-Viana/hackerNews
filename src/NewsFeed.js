import React from 'react';
import parse from 'html-react-parser';
import moment from 'moment';
import Posts from './Posts';
const NewsFeed = props => {

  if(props.newsFeed.length!==0){

    return (<div className="feed">
      <Posts {...props}/>
    </div>);
  }
  else {
    return <div className="feed">
    LOADING
      </div>
  }
}
export default NewsFeed;