import React from "react";
import ReactDOM from "react-dom";
import {withRouter, Link} from "react-router-dom"
class Header extends React.Component{


      updateTitle(){
        let pathname = this.props.location.pathname;
        let title = "Home";
        switch(pathname){
          case "/create": title = "Create Post"; break;
          case "/login": title = "Login"; break;
          case "/register": title = "Register"; break;
          case "/profile": title = "Profile"; break;
        }
        
        return title;
      }
      render(){
        return (
          <div className="header">
            <div className="avatar-title">
              <Link to="/profile"><img src={this.props.avatar} className="header-avatar" /></Link>
              <h1>{this.updateTitle()}</h1>
            </div>
            <Link to="/login" className="login-button">Login</Link>
          </div>
        );
      }
}
export default withRouter(Header);
