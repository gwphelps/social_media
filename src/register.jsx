import React from "react";
import {Redirect, Link, withRouter} from "react-router-dom";
class Register extends React.Component {
  constructor(props){
    super(props);
    this.errorText = React.createRef();
    this.registerUser = this.registerUser.bind(this);


    this.state = {
      username: "",
      password: "",
      password2: "",
      redirect: false,
      errorString: "Passwords do not match"
    };
  }
  registerUser(){
    if(this.state.password != this.state.password2){
      this.errorText.current.style.display = "block";
      this.errorText.current.style.color = "red";
    }
    else{
      let xhr = new XMLHttpRequest();
      xhr.open("post", "/adduser", true);
      xhr.setRequestHeader("content-type", 'application/json');
      let data = {};
      data.username = this.state.username;
      data.password = this.state.password;
      xhr.onload = () => {
        if(xhr.response == "true"){
          this.setState({redirect: true});
          alert("Account successfully created!");
        }
        else{
          this.setState({errorString: "Username already exists!"});
          this.errorText.current.style.display = "block";
          this.errorText.current.style.color = "red";
        }
      }
      xhr.send(JSON.stringify(data));
    }
  }


  render(){
    return(
      <div className="register">
        <p style={{color: "red"}} style={{display: "none"}}ref={this.errorText}>{this.state.errorString}</p>
        <h2>username</h2>
        <input type="text" className="input-bar" onChange={e => this.setState({username: e.target.value})} value={this.state.username}/>
        <h2>password</h2>
        <input type="password" className="input-bar" onChange={e => this.setState({password: e.target.value,})} value={this.state.password}/>
        <h2>re-enter password</h2>
        <input type="password" className="input-bar" onChange={e => this.setState({password2: e.target.value})} value={this.state.password2}/>
        <a href="#" style={{textDecoration: "none"}} onClick={this.registerUser}><div className="post-button">Register</div></a>
        {this.state.redirect ? <Redirect to="/"/> : <p></p>}
      </div>
    );
  }
}


export default withRouter(Register);
