import React from "react";
import ReactDOM from "react-dom";

import Header from "./header.jsx";
import Feed from "./feed.jsx";
import Create from "./create.jsx";
import Login from "./login.jsx";
import Register from "./register.jsx";
import Profile from "./profile.jsx";
import Edit from "./edit.jsx";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation
} from "react-router-dom";


class HomeComponent extends React.Component{
      constructor(props){
        super(props);
        this.state = {
          user: {}
        }
        this.setUser = this.setUser.bind(this);
      }
      componentDidMount(){

        if(sessionStorage.getItem("socialUser") != null){
          this.setState({user: JSON.parse(sessionStorage.getItem("socialUser"))});
          console.log("state has been set "+this.state.user);
        }
        else{
          this.setState({
            user: {
              id: 1,
              username: "guest",
              password: "",
              avatar: "none.jpg"
            }
          })
        }
      }
      setUser(e) {
        console.log("userObject " + e);
        this.setState({user: e});
        let userString = JSON.stringify(this.state.user);
        sessionStorage.setItem("socialUser", userString);
      }
      render(){
        return (
          <Router>
          <div className="page">
            <Header avatar={this.state.user.avatar} />
            <div className="feed-footer">
              <div className="content-container">
                <Switch>
                  <Route exact path="/">
                    <Feed/>
                  </Route>
                  <Route exact path="/create">
                    <Create user={this.state.user}/>
                  </Route>
                  <Route exact path="/login">
                    <Login setUser={this.setUser}/>
                  </Route>
                  <Route exact path="/register">
                    <Register />
                  </Route>
                  <Route exact path="/profile">
                    <Profile user={this.state.user} />
                  </Route>
                  <Route exact path="/edit">
                    <Edit user={this.state.user} />
                  </Route>
                </Switch>
              </div>

              <ul className="navbar">
                <li className="nav-li"><Link to="/" className="nav-icon"><i className="fa fa-home fa-lg"></i></Link></li>
                <li className="nav-li"><a className="nav-icon" href="#"><i className="fa fa-search fa-lg"></i></a></li>
                <li className="nav-li"><a className="nav-icon" href="#"><i className="fa fa-bell fa-lg"></i></a></li>
                <li className="nav-li"><Link to="/create" className="nav-icon"><i className="fa fa-envelope fa-lg"></i></Link></li>
                <Link to="/profile" className="nav-icon center-content"><img src={this.state.user.avatar} className="nav-avatar"/></Link>
              </ul>
            </div>
          </div>
          </Router>
        );
      }
}

ReactDOM.render(<HomeComponent />, document.getElementById("root"));
