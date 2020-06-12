let express = require("express");
let body_parser = require("body-parser");
let db_handler = require("./db_handler.js");
const port = 3000;
const app = express();

app.use(express.static("src"));
app.use(body_parser.json());



app.post('/adduser', function(req, res){
  console.log("add user");
  console.log(req.body);
  let data = {username: req.body.username, password: req.body.password};
  db_handler.addUser(data, function(success){
    console.log(success);
    res.send(success);
  });
});

app.post("/loginuser", function(req, res){
  console.log("login");
  console.log(req.body);
  let data = {username: req.body.username, password: req.body.password};
  db_handler.login(data, function(returnString){
    console.log(returnString);
    res.send(returnString);
  });
});

app.get("/getuserposts", (req, res) => {
  console.log("get user posts");
  console.log(req.query);
  db_handler.getPosts(req.query.id, (returnString) => {
    console.log(returnString);
    res.send(returnString);
  });
});

app.get('/*', function (req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

app.listen(port, function () {
  console.log("Server is running on "+ port +" port");
});
