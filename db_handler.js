var mysql = require('mysql');
function connectDB(){
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: ""
  });

  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });
  con.query("use user_database;");
  return con;
}


function addUser(user, func){
  let returnState = true;

  let con = connectDB();

  let query = "insert into Users (username, password, avatar) values (\""
    + user.username + "\",\""
    + user.password + "\",\"none.jpg\");";
  console.log("query used\n" + query);
  con.query(query, function(err, result){
    if (err && err.code=='ER_DUP_ENTRY'){
      console.log("username exists");
      func("false");
    }
    else{
      func("true");
    }
    con.end(function(err){
      if(err) throw err;
      console.log("Disconnected!");
    });
  });
}

function login(data, func){
  let con = connectDB();
  let query = "select * from Users where username=\""+data.username+"\" and password=\""+data.password+"\"";
  con.query(query, function(err, result){
    if(err) {
      console.log(err.code);
      func("false");
    }
    else {
      Object.keys(result).forEach(function(key) {
        var row = result[key];
        func(JSON.stringify(row));
      });
    }
    con.end(function(err){
      if(err) throw err;
      console.log("Disconnected!");
    });
  });
}


function getPosts(id, func){
  let con = connectDB();
  let query = "select * from Users inner join Posts on Posts.user_id=Users.id where Users.id="+id+";";
  let resultArr = [];
  con.query(query, function(err, result){
    if(err) {
      console.log(err.code);
      func("false");
    }
    else {
      let count = 0;
      let keysList = Object.keys(result)
      keysList.forEach(function(key) {
        var row = result[key];
        resultArr.push(row);
        count+=1;
        if(count == keysList.length) func(JSON.stringify(resultArr));
      });
    }
    con.end(function(err){
      if(err) throw err;
      console.log("Disconnected!");
    });
  });
}
exports.addUser = addUser;
exports.login = login;
exports.getPosts = getPosts;
