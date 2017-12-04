var webpack = require('webpack');

module.exports = {
    entry: "./index.js",
    output: {
        filename: "./output.js"
    },
    module: {
      rules: [
        { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
      ]
    }
};
