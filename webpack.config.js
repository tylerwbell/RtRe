const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const output = path.join(__dirname, 'build/');
const isProduction = process.env.NODE_ENV === 'production';
const devServer = {
  port: 9000,
  contentBase: output,
  historyApiFallback: true
};

module.exports = {
  mode: isProduction ? 'production' : 'development',
  devServer: isProduction ? undefined : devServer,
  entry: {
    app: './lib/js/src/dom/app/Index.bs.js',
    util: './lib/js/src/dom/lib/worker/RenderWorker.bs.js'
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: '[name].js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/dom/app/index.html')
    })
  ]
};