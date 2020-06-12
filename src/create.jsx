import React from "react";
import moment from "moment";
import {Link} from "react-router-dom";

class Create extends React.Component {
  constructor(props){
    super(props);
    this.setHeight = this.setHeight.bind(this);
    this.newPost = this.newPost.bind(this);
    this.state = {
      message: ""
    }
  }
  setHeight(e){
    e.target.style.height = 'inherit';
    e.target.style.height = `${e.target.scrollHeight}px`;
    this.setState({message: e.target.value});
  }
  newPost(){
    let xhr = new XMLHttpRequest();
    xhr.open("post", "/addpost", true);
    xhr.setRequestHeader("content-type", 'application/json');
    let date_format = moment().format('YYYY-MM-DD hh:mm:ss');
    let postObj = {
      user_id: this.props.user.id,
      message: this.state.message,
      date: date_format
    };
    xhr.onload = () {
      
    };
    xhr.send(JSON.stringify(postObj))
  }


  render(){
    return(
      <div className="create">
        <div className="avatar-and-message">
          <img className="message-avatar" src={this.props.user.avatar} />
          <textarea id="message-input" className="message-input" value={this.state.message} onChange={this.setHeight}></textarea>
        </div>
        <Link to="/" style={{textDecoration: "none"}}><div className="post-button" onClick={this.newPost}>Post</div></Link>
      </div>
    );
  }
}

export default Create;
