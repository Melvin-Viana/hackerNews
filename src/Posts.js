import React from 'react';
import parse from 'html-react-parser';
import moment from 'moment';
const Posts = props => {
  return (<React.Fragment>{props.newsFeed.map(post=>(<div className="story-text">
  <p>{post.title}</p>
  <p className="post-data">{post.points} points | {post.author} | {moment(post.created_at,'YYYYMMDD').fromNow()} |{(post.num_comments) ? post.num_comments + ' comments' : 'on: ' + post.story_title}</p>

  {[(post.story_text)?parse(post.story_text) : null, (post.comment_text) ? parse(post.comment_text) : null]}
</div>))}</React.Fragment>)
}

export default Posts;