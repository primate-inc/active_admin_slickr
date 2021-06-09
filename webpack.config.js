const webpack = require("webpack");
const glob = require('glob');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackCleanPlugin = require('webpack-clean');


module.exports = {
  entry: toObject(glob.sync('./app/assets/stylesheets/files_to_edit/**/*.scss*')),

  devServer: {
    contentBase: './assets/stylesheets/files_to_edit'
  },

  output: {
    filename: './app/assets/javascripts/clear_webpack_output/[name].js'
  },

  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
	  {
	    loader: MiniCssExtractPlugin.loader,
	    options: {
	      hmr: process.env.NODE_ENV === 'development',
	      fallback: 'style-loader',
	    }
	  },
	  {
	    loader: 'css-loader',
	    options: {
	      url: false,
	      import: false,
	    }
	  },
          'postcss-loader',
        ]
      }
    ]
  },

  plugins: [
    new MiniCssExtractPlugin({filename: '../app/assets/stylesheets/webpack_output/[name]'}),
    new WebpackCleanPlugin(
      toArray(glob.sync('./app/assets/javascripts/clear_webpack_output/**/*.js*')),
      '/'
    )
  ]
};

function toObject(paths) {
  var ret = {};

  paths.forEach(function(scss_path) {
    // you can define entry names mapped to [name] here
    ret[scss_path.split('/').slice(-1)[0]] = scss_path;
  });

  return ret;
}

function toArray(paths) {
  var array = [];

  paths.forEach(function(js_path) {
    array.push(path.resolve(__dirname, `${js_path}`))
  });

  return array;
}
