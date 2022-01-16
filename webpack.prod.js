const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin").default;
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: "production",
  optimization: {
    minimize: true,
    minimizer: [new OptimizeCssAssetsPlugin(), new TerserPlugin()],
  },
  output: {
    filename: "main.[fullhash].js",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        exclude: /styles\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /styles\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
        options: {
          // Disables attributes processing
          sources: false,
          minimize: true,
        },
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html",
      inject: "body",
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[fullhash].css",
      ignoreOrder: false,
    }),
    new CopyPlugin({
      patterns: [{ from: "src/assets", to: "assets/" }],
    }),
  ],
};
