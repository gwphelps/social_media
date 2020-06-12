import React from "react";
import ReactDOM from "react-dom";
import Post from "./post.jsx";
class Feed extends React.Component{

      getPosts() {
        let postsData = [
          {
            key: 0,
            avatar: "./none.jpg",
            username: "gwphelps",
            post_date: "2020/05/27 19:48",
            likes: 5,
            comments: 2,
            message: "So what's the deal with elevator music?"
          }
        ];
        let posts = [];
        for(let i = 0; i < 10; i+=1){
          let post = postsData[0];
          posts.push(<Post key={i} data={post}/>);
        }
        return posts;
      }

      render(){
        return (
          <div className="feed">
            <div id="feed-root" >
              {this.getPosts()}
            </div>
          </div>
        );
      }
}
export default Feed;
