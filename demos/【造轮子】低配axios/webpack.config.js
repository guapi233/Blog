const path = require("path");

module.exports = {
  entry: "./axios.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "axios.js",
  },
  module: {
    rules: [
      {
        test: "/.js$/",
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["es2015", { modules: false }], "stage-2"],
          },
        },
      },
    ],
  },
  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    compress: true,
    port: 3000,
    publicPath: "/",
  },
  mode: "development",
};
