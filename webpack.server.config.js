const path = require("path");
const webpack = require("webpack");

module.exports = {
  mode: "none",
  entry: {
    // This is our Express server for Dynamic universal
    server: "./server.ts"
  },
  target: "node",
  //to enable redis in local uncomment the below two lines and comment the above line
  resolve: {
    extensions: [".ts", ".js", ".scss", ".css"],
    alias: { hiredis: path.join(__dirname, "hiredis.js") }
  },
  // Make sure we include all node_modules etc
  externals: [/(node_modules|main\..*\.js)/],
  output: {
    // Puts the output at the root of the dist folder
    path: path.join(__dirname, "dist"),
    filename: "[name].js"
  },
  module: {
    rules: [{ test: /\.ts$/, loader: "ts-loader" }]
  },
  plugins: [
    new webpack.ContextReplacementPlugin(
      // fixes WARNING Critical dependency: the request of a dependency is an expression
      /(.+)?angular(\\|\/)core(.+)?/,
      path.join(__dirname, "src"), // location of your src
      {} // a map of your routes
    ),
    new webpack.ContextReplacementPlugin(
      // fixes WARNING Critical dependency: the request of a dependency is an expression
      /(.+)?express(\\|\/)(.+)?/,
      path.join(__dirname, "src"),
      {}
    )
  ]
};
