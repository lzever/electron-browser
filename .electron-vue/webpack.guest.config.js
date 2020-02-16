'use strict'

// process.env.BABEL_ENV = 'guest'

const path = require('path')
const { dependencies } = require('../package.json')
const webpack = require('webpack')

const BabiliWebpackPlugin = require('babili-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const env_prod = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')
/**
 * List of node_modules to include in webpack bundle
 *
 * Required for specific packages like Vue UI libraries
 * that provide pure *.vue files that need compiling
 * https://simulatedgreg.gitbooks.io/electron-vue/guest/en/webpack-configurations.html#white-listing-externals
 */
let whiteListedModules = ['vue']

let guestConfig = {
  name: 'guest',
  devtool: '#cheap-module-eval-source-map',
  entry: {
    guest: path.join(__dirname, '../src/renderer/guest/main.js')
  },
  // externals: {
  //   //不打包的  
  //   'vue': 'Vue',
  //   'vue-router': 'VueRouter',
  //   'vuex': 'Vuex',
  //   'axios': 'axios',
  //   'echarts': 'echarts'
  // },
  // externals: [
  //   ...Object.keys(dependencies || {}).filter(d => !whiteListedModules.includes(d))
  // ],
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        enforce: 'pre',
        exclude: /node_modules/,
        use: {
          loader: 'eslint-loader',
          options: {
            formatter: require('eslint-friendly-formatter')
          }
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.html$/,
        use: 'vue-html-loader'
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.node$/,
        use: 'node-loader'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
        // use: {
        //   loader: 'vue-loader',
        //   options: {
        //     extractCSS: process.env.NODE_ENV === 'production',
        //     loaders: {
        //       sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax=1',
        //       scss: 'vue-style-loader!css-loader!sass-loader'
        //     }
        //   }
        // }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          query: {
            limit: 10000,
            name: 'imgs/[name]--[folder].[ext]'
          }
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'media/[name]--[folder].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          query: {
            limit: 10000,
            name: 'fonts/[name]--[folder].[ext]'
          }
        }
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('styles-guest.css'),
    new HtmlWebpackPlugin({
      filename: 'guest.html',
      template: path.resolve(__dirname, '../src/renderer/guest/index.ejs'),
      minify: {
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        removeComments: true
      },
      inject: true,//是否开启注入
      chunks: ['guest'],//需要引入的Chunk，不配置就会引入所有页面的资源
      nodeModules: false
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  output: {
    filename: '[name].js',
    path: path.join(__dirname, '../dist/electron/static')
  },
  resolve: {
    alias: {
      '@': path.join(__dirname, '../src/renderer'),
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['.js', '.vue', '.json', '.css']
  },
  target: 'web'
}

/**
 * Adjust guestConfig for development settings
 */
if (process.env.NODE_ENV !== 'production') {
  guestConfig.plugins.push(
    new webpack.DefinePlugin({
      '__static': `"${path.join(__dirname, '../static').replace(/\\/g, '\\\\')}"`,
      ...env_prod.env
    })
  )
}

/**
 * Adjust guestConfig for production settings
 */
if (process.env.NODE_ENV === 'production') {
  guestConfig.devtool = ''

  guestConfig.plugins.push(
    new BabiliWebpackPlugin(),
    new CopyWebpackPlugin([
      {
        from: path.join(__dirname, '../static'),
        to: path.join(__dirname, '../dist/electron/static'),
        ignore: ['.*']
      }
    ]),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
      ...env_prod.prod
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  )
}

module.exports = guestConfig
