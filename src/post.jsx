import React from "react";

class Post extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return (
      <div className="post">
        <img src={this.props.data.avatar} className="post-avatar" />
        <div className="username-post">
          <h3>{this.props.data.username}</h3>
          <p className="post-message">{this.props.data.message}</p>
        </div>
      </div>
    );
  }
}

export default Post;
