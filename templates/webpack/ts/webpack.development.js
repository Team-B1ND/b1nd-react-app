const webpackCommon = require("./webpack.config");
const { merge } = require("webpack-merge");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

module.exports = merge(webpackCommon, {
  mode: "development",
  devtool: "source-map",
  devServer: {
    hot: true,
    port: 3000,
    historyApiFallback: true,
  },
  plugins: [new ForkTsCheckerWebpackPlugin()],
});