const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const config = {
    entry: path.join(__dirname, 'src/index.jsx'),
    output: {
        path: path.join(__dirname, 'public'),
        publicPath: '/public/',
        filename: 'bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader']
        },
        {
            test: /\.css$/,
            loader: "style-loader!css-loader",
        },
        {
            test: /\.module\.s(a|c)ss$/,
            include: path.join(__dirname, 'src'),
            loader: [
              MiniCssExtractPlugin.loader,
              {
                loader: 'css-loader',
                options: {
                  modules: true,
                  sourceMap: true,
                  url: false,
                },
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: true
                }
              }
            ]
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [{
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images',
              publicPath: 'images',
            }
          }]
        },
      ]
    },
    resolve: {
      extensions: ['.js', '.jsx', '.scss']
    },
    plugins: [
      new MiniCssExtractPlugin({
          // Options similar to the same options in webpackOptions.output
          // both options are optional
          filename: '[name].css',
          chunkFilename: '[id].css'
      }),
      /*new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('production'),
      }),*/
      //new BundleAnalyzerPlugin(),
    ],
    devServer: {
      contentBase: './public'
    }
};


module.exports = config;