const path = require('path');

module.exports = {
  mode: 'production',

  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [{
          loader: 'url-loader',
          options: {
            name: '[name].[ext]_[hash:4]',
            outputPath: 'images',
            limit: 25000,
          },
        }]
      },

      
    ]
  },


}