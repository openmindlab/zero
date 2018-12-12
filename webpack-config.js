const Path = require('path');
const PathConfig = require("./path-config");
const Webpack = require('webpack');

const Package = require("./package.json");

const ENTRIES = {
  zero: "./src/views/manifest.js"
};

module.exports = {

  mode: 'development',

  devtool: 'eval',
  watch: true,

  entry:  ENTRIES,

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      }
    ]
  },

  resolve: {
    alias: {
      Vendor: Path.resolve(__dirname, "node_modules" )
    }
  },

  plugins: [
    new Webpack.DefinePlugin({
        'process.env': {
            VERSION: `'${Package.version}'`
        }
    })
  ],

  output: {
    filename: "[name].dev.js",
    path: Path.resolve(__dirname, 'build'),
    pathinfo: true,
    sourceMapFilename: "[file].js.map"
  },

  devServer: {
    contentBase: Path.join(__dirname, "./build"),
    compress: false,
    port: 3000,
    hot: false,
    before: function(App, server) {
      App.set('view engine', 'pug');
      App.set('views', './src/views');

      App.get("/", (req, res, next) => {
        res.render("home", {components: PathConfig.Components});
      });

    }
  }
};
