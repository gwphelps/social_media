import React from "react";
import Post from "./post.jsx";
import {Link} from "react-router-dom";
class Profile extends React.Component {
  constructor(props){
    super(props);
    this.getPosts = this.getPosts.bind(this);
    this.state = {
      user: this.props.user,
      posts: []
    };
  }

  getPosts(){
    let xhr = new XMLHttpRequest();
    xhr.open("get", "/getuserposts?id="+this.state.user.id, true);
    xhr.onload = () => {
      let posts = JSON.parse(xhr.response);
      let postState = this.state.posts;
      for(let i = 0; i < posts.length; i++){
        postState.push({key: posts[i].id, data: posts[i]});
      }
      this.setState({posts: postState});
      console.log(this.state);
    }
    xhr.send();
  }

  componentDidMount(){
    this.getPosts();
  }
  render(){
    return(
      <div id="profile">
        <div className="flex-center">
          <div className="profile-header">
            <img style={{alignSelf: "center"}} src={this.state.user.avatar} className="large-img"/>
            <h2 style={{alignSelf: "center"}}>{this.state.user.username}</h2>
            <Link style={{textDecoration:"none"}} to="/edit"><div className="post-button">Edit</div></Link>
          </div>
        </div>
        <div className="user-posts">{this.state.posts.map(post => <Post key={post.key} data={post.data}/>)}</div>
      </div>
    );
  }
}

export default Profile;
