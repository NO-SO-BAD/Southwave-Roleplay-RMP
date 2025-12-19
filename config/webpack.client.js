const path = require("path");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

module.exports = {
  mode: "development",
  target: "web",
  entry: path.resolve(__dirname, "../src/client/src/index.ts"),
  output: {
    path: path.resolve(__dirname, "../client_packages/southwave"),
    filename: "bundle.js"
  },
  resolve: {
    extensions: [".ts", ".js", ".json"],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: path.resolve(__dirname, "../src/client/tsconfig.json")
      })
    ]
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: "ts-loader",
            options: { transpileOnly: true }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        type: "json"
      }
    ]
  },
  devtool: false
};
