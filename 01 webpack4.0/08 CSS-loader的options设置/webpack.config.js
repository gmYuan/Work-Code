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
        test: /\.(scss|css)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,   // 让CSS文件中通过@import引入的其他文件也使用后2个loader处理
              modules: true,     // 开启CSS文件的局部作用域
            },
          },
          'sass-loader',
          'postcss-loader',
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