const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js', // Use [name] for dynamic filenames based on entry points
    chunkFilename: '[id].[chunkhash].js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
  devServer: {
    historyApiFallback: true,
    compress: true,
    port: 3000,
    proxy: [
      {
        context:['/auth', '/api'],
        target: "http://localhost:8000",
        secure: false,
        router: function (req) {
          if (req.headers.accept.indexOf('html') !== -1) {
            console.log('Skipping proxy for browser request.');
            return '/index.html';
          }
        },
      },
      // Add more proxy configurations as needed
    ],
    static: {
      directory: path.join(__dirname, 'dist'),
    },
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    minimize: true,
    minimizer : [
      new TerserPlugin({
        terserOptions:{
          format:{
            comments :false,
          }
        },
        extractComments: false,
      })
    ]
  },
};
