 const path = require('path');
 const HtmlWebpackPlugin = require('html-webpack-plugin');
 const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin


 module.exports = {
    mode: 'development',
    entry: { index: './src/index.js', },
   devtool: 'inline-source-map',
   devServer: {
    static: './dist',
  },
   output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
      assetModuleFilename: "[name][ext]",
    },
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
    port: 3000,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },
    module: {
      rules: [
        {
          test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
        },
        {
          test: /\.(png|svg|gif)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Development',
        template: "src/index.html",
      }),
      new BundleAnalyzerPlugin(),
    ],
  
  
  };
