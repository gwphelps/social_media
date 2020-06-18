import React from "react";

class Edit extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      file: ""
    };
    this.displayPassword = this.displayPassword.bind(this);
    this.sendImage = this.sendImage.bind(this);
  }
  displayPassword(){
    try{
      return this.props.user.password.replace(/\w/g, "*");
    }
    catch{
      return "";
    }
  }
  sendImage(){
    let xhr = new XMLHttpRequest();
    xhr.open("post", "/updateavatar", true);
    //xhr.setRequestHeader("content-type", 'multipart/form-data');
    let data = new FormData();
    data.append("file", this.state.file.files[0]);
    console.log(data.get("file"));
    xhr.onload = () => {
      console.log(xhr.response);
    }
    xhr.send(data);
  }
  render(){
    return(
      <div className="edit">
      <div className="edit-container">
        <img src={this.props.user.avatar} className="large-img" style={{display: "block"}}/>

        <input accept="image/*" type="file" id="image-upload" style={{display: "block"}} onChange={e => this.setState({file: e.target})}/>
        <a href="#" onClick={this.sendImage}>change</a>

      </div>
        <div className="edit-container">
          <h3>Username: {this.props.user.username}</h3>
          <a href="#">change</a>
        </div>
        <div className="edit-container">
          <h3>Password: {this.displayPassword}</h3>
          <a href="#">change</a>
        </div>
      </div>
    );
  }
}

export default Edit;
