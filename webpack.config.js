const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const plugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.ENV || 'development')
  }),
  new ExtractTextPlugin('styles.css'),
  new webpack.NoEmitOnErrorsPlugin()
];

let browserPlugins = plugins;

if (process.env.ENV === 'production') {
  browserPlugins = plugins.concat([
    new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } })
  ]);
}

const cssLoader = {
  test: /\.css$/,
  use: ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: [
      {
        loader: 'css-loader',
        options: {
          modules: true,
          importLoaders: 1,
          minimize: process.env.ENV === 'production'
        }
      },
      'postcss-loader'
    ]
  })
};

const tslintLoader = { loader: 'tslint-loader', options: { typeCheck: true } };

module.exports = [
  {
    entry: './src/server.tsx',
    output: {
      filename: 'server.js',
      path: path.join(__dirname, 'dist')
    },
    resolve: { extensions: ['.js', '.ts', '.tsx'] },
    target: 'node',
    externals: [nodeExternals({
      whitelist: [/react-toolbox/]
    })],
    module: {
      loaders: [
        { test: /\.(ts|tsx)$/, exclude: /node_modules/, use: [{ loader: 'ts-loader' }, tslintLoader] },
        cssLoader
      ]
    },
    plugins: plugins
  },
  {
    entry: [
      './src/browser.tsx'
    ],
    output: {
      filename: 'browser.js',
      path: path.join(__dirname, 'dist')
    },
    resolve: { extensions: ['.js', '.ts', '.tsx'] },
    target: 'web',
    devtool: 'source-map',
    module: {
      loaders: [
        {
          test: /\.(ts|tsx)$/, exclude: /node_modules/, use: [
            { loader: 'ts-loader?configFileName=tsconfig.browser.json' },
            { loader: 'tslint-loader' }
          ]
        },
        cssLoader
      ]
    },
    plugins: browserPlugins
  }
];
