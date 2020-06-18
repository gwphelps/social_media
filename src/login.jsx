import React from "react";
import {Link, Redirect} from "react-router-dom";
class Login extends React.Component {
  constructor(props){
    super(props);
    this.errorText = React.createRef();
    this.state={
      username: "",
      password: "",
      errorString: "Login failed",
      redirect: false
    };
    this.sendLogin = this.sendLogin.bind(this);
  }
  sendLogin(){
    let user = {
      username: this.state.username,
      password: this.state.password
    };
    let xhr = new XMLHttpRequest();
    xhr.open("post", "/loginuser", true);
    xhr.setRequestHeader("content-type", 'application/json');
    xhr.onload = () => {
      if(xhr.response == "false"){
        this.errorText.current.style.display = "block";
        this.errorText.current.style.color = "red";
      }
      else{
        let obj = JSON.parse(xhr.response);
        this.props.setUser(obj);
        this.setState({redirect:true});
      }
    }
    xhr.send(JSON.stringify(user));

  }
  render(){
    return(
      <div className="login">
        <p style={{color: "red"}} style={{display: "none"}} ref={this.errorText}>{this.state.errorString}</p>
        <h2>username</h2>
        <input className="input-bar" type="text"
          onChange={e => this.setState({username: e.target.value})}
          value={this.state.username}/>
        <h2>password</h2>
        <input className="input-bar" type="password"
          onChange={e => this.setState({password: e.target.value})}
          value={this.state.password}/>
        <div style={{textDecoration: "none"}}><div className="post-button" onClick={this.sendLogin}>Login</div></div>

        <Link className="register-link" to="/register">register</Link>
        {this.state.redirect ? <Redirect to="/"/> : <p></p>}
      </div>
    );
  }
}

export default Login;
