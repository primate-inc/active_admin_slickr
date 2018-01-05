const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");


module.exports = {
  entry: {
    application: ["./app/assets/stylesheets/active_admin_slickr_sass.scss"]
  },

  devServer: {
    contentBase: './assets/stylesheets'
  },

  output: {
    filename: 'not_used/bundle.js'
  },

  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'postcss-loader',
            'sass-loader'
          ]
        })
      }
    ]
  },

  plugins: [
    new ExtractTextPlugin({
      filename: 'app/assets/stylesheets/active_admin_slickr_postcss.scss'
    })
  ]
};
