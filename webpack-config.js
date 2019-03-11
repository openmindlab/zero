const Path = require('path');
const Webpack = require('webpack');
const PathConfig = require('./path-config');

const Package = require('./package.json');

const ENTRIES = {
  zero: './sample/manifest.js',
};

module.exports = {

  mode: 'development',

  // devtool: 'eval',
  watch: true,

  entry: ENTRIES,

  module: {
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
        },
      },
    }],
  },

  plugins: [
    new Webpack.DefinePlugin({
      'process.env': {
        VERSION: `'${Package.version}'`,
      },
    }),
  ],

  output: {
    filename: '[name].dev.js',
    path: Path.resolve(__dirname, 'build'),
    pathinfo: true,
    sourceMapFilename: '[file].js.map',
    chunkFilename: 'component-[name].dev.js',
  },

  devServer: {
    contentBase: Path.join(__dirname, './build'),
    compress: false,
    port: 3000,
    hot: false,
    disableHostCheck: true,
    before(App) {
      App.set('view engine', 'pug');
      App.set('views', './sample/');

      App.get('/', (req, res) => {
        res.render('home', {
          components: PathConfig.Components,
        });
      });
    },
  },
};
