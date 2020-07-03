const path = require("path");

module.exports = {
  entry: "./axios.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "axios.js",
  },
};
