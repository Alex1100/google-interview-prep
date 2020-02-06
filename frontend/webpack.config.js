const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({ size: 5 });

module.exports = {
  context: __dirname,
  mode: 'production',
  entry: path.resolve(__dirname, 'widgets/index.js'),
  plugins: [
    new webpack.ProgressPlugin(),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new HappyPack({
      id: 'url',
      threadPool: happyThreadPool,
      loaders: ['url-loader?limit=100000']
    }),
    new HappyPack({
      id: 'fonts',
      threadPool: happyThreadPool,
      loaders: ['file-loader?name=public/fonts/[name].[ext]']
    }),
    new HappyPack({
      id: 'images',
      threadPool: happyThreadPool,
      loaders: [
        'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
        'url-loader?limit=100000',
        'image-webpack-loader?disable=true'
      ]
    }),
    new HappyPack({
      id: 'json',
      threadPool: happyThreadPool,
      loaders: ['json-loader']
    }),
    new HappyPack({
      id: 'styles',
      threadPool: happyThreadPool,
      loaders: ['style-loader', 'css-loader', 'font-loader?format[]=truetype&format[]=woff&format[]=embedded-opentype']
    }),
    new HappyPack({
      id: 'jsx',
      threadPool: happyThreadPool,
      loaders: [
        {
          loader: 'babel-loader',
          exclude:/(node_modules|bower_components)/,
          options: {
            cacheDirectory: true,
            presets: ["@babel/preset-env", "@babel/preset-react"],
            plugins: [
              '@babel/plugin-proposal-async-generator-functions',
              '@babel/plugin-proposal-object-rest-spread',
              '@babel/plugin-proposal-class-properties',
              ['@babel/plugin-proposal-decorators', { decoratorsBeforeExport: false }],
              '@babel/plugin-proposal-export-default-from',
              '@babel/plugin-proposal-export-namespace-from',
              '@babel/plugin-proposal-logical-assignment-operators',
              '@babel/plugin-proposal-optional-chaining',
              '@babel/plugin-transform-react-jsx-source'
            ]
          }
        }
      ]
    })
  ],
  output: {
    path: path.resolve(__dirname, 'widgets/public/dist'),
    publicPath: '/widgets/public/dist/',
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: 'happypack/loader?id=styles'
      },
      {
        test: /\.json$/,
        use: 'happypack/loader?id=json'
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: 'happypack/loader?id=images'
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: 'happypack/loader?id=fonts'
      },
      { test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        use: 'happypack/loader?id=url'
      },
      {
        test: /\.js[x]?$/,
        use: 'happypack/loader?id=jsx'
      }
    ],
  },
  resolve: {
    descriptionFiles: ['package.json'],
    extensions: ['.js', '.jsx', '.json', '.css'],
    modules: ['node_modules']
  },
  performance: {
    hints: 'error',
    maxAssetSize: 30000000,
    maxEntrypointSize: 30000000,
    assetFilter: function(assetFilename) {
      // Function predicate that provides asset filenames
      return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
    }
  },
  devtool: 'source-map',
  target: 'web',
  bail: true,
  watch: true,
  watchOptions: {
    ignored: /node_modules/,
    poll: 500
  }
}
