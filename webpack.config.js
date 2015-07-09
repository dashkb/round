var webpack = require('webpack');

module.exports = {
  context: __dirname + '/assets/javascripts',
  entry: {
    app:    './main',
    vendor: ['react', 'react-router', 'react-router/lib/BrowserHistory', 'redux', 'moment']
  },
  output: {
    path: __dirname + '/build',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"vendor.bundle.js")
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel?optional[]=runtime&stage=0'
      }
    ]
  }
}
