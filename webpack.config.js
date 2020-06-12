var path = require("path");

module.exports = {
  mode: "development",
  entry: path.join(__dirname, "./src/index.jsx"),
  output: {
    path: __dirname + "/src/",
    filename: "app.js"
  },
  module:{
    rules: [
      {
        test: /\.jsx/,
        exclude: /node_modules/,
        use: "babel-loader"
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      }
    ]
  }
}
