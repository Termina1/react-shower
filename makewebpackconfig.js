var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var fs = require('fs');

const showerThemeRegEx = /shower-[^\/]+\/styles\/[^\/]+\.css/;

module.exports = function(options) {
  var entry, jsLoaders, plugins, cssLoaders, devtool;

  // If production is true
  if (options.prod) {
    // Entry
    entry = [
      path.resolve(__dirname, 'js/app.js') // Start with js/app.js...
    ];
    cssLoaders = ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader');
    // Plugins
    plugins = [// Plugins for Webpack
      new webpack.optimize.UglifyJsPlugin({ // Optimize the JavaScript...
        compress: {
          warnings: false // ...but do not show warnings in the console (there is a lot of them)
        }
      }),
      new HtmlWebpackPlugin({
        template: path.join(__dirname, 'index.html'), // Move the index.html file...
        minify: { // Minifying it while it is parsed
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true
        },
        inject: true // inject all files that are generated by webpack, e.g. bundle.js, main.css with the correct HTML tags
      }),
      new ExtractTextPlugin("css/main.css"),
      new webpack.DefinePlugin({
        "process.env": {
          NODE_ENV: JSON.stringify("production")
        }
      }),
      new webpack.ContextReplacementPlugin(/style-theme/, path.join(process.cwd(), "node_modules"), true, showerThemeRegEx)
    ];

  // If app is in development
  } else {
    // Entry
    entry = [
      "webpack-dev-server/client?http://localhost:3000", // Needed for hot reloading
      "webpack/hot/only-dev-server", // See above
      path.resolve(__dirname, 'js/app.js') // Start with js/app.js...
    ];
    cssLoaders = 'style-loader!css-loader!postcss-loader';
    devtool = 'cheap-module-eval-source-map';
    // Only plugin is the hot module replacement plugin
    plugins = [
      new webpack.HotModuleReplacementPlugin(), // Make hot loading work
      new HtmlWebpackPlugin({
        template: path.join(__dirname, 'index.html'), // Move the index.html file
        inject: true // inject all files that are generated by webpack, e.g. bundle.js, main.css with the correct HTML tags
      }),
      new webpack.ContextReplacementPlugin(/style-theme/, path.join(process.cwd(), "node_modules"), true, showerThemeRegEx)
    ]
  }

  return {
    entry: entry,
    output: { // Compile into js/build.js
      path: path.resolve(process.cwd(), 'build'),
      filename: "js/bundle.js"
    },
    resolve: {
      modulesDirectories: [
        process.cwd(),
        path.resolve(__dirname, "js"),
        __dirname,
        path.join(process.cwd(), "node_modules")
      ]
    },
    module: {
      loaders: [{
          test: /\.js$/,
          loader: 'babel',
          include: [
            path.join(__dirname, "js"),
            path.join(process.cwd(), "presentation.js")
          ],
          query: {
            "plugins": [
              "syntax-class-properties",
              "transform-class-properties"
            ],
            "presets": ["es2015", "react", "stage-2"]
          }
        }, {
          test: /\.css$/,
          loader: cssLoaders,
          include: [
            path.join(process.cwd(), 'css'),
            path.join(__dirname, 'css'),
          ],
        }, {
          test: showerThemeRegEx,
          loader: "style/useable!css",
        }, {
          test: /\.jpe?g$|\.gif$|\.png|\.woff$|\.woff2$|\.eot$|\.ttf$|\.svg$/i,
          loader: "url-loader?limit=10000"
        },
        {
          test:/\.json$/,
          loader: "json-loader"
        }, {
          loader: "raw-loader",
          include: [path.join(process.cwd(), "code")]
        }
      ]
    },
    devtool: devtool,
    plugins: plugins,
    postcss: function() {
      return [
        require('postcss-import')({ // Import all the css files...
          glob: true,
          onImport: function (files) {
              files.forEach(this.addDependency); // ...and add dependecies from the main.css files to the other css files...
          }.bind(this) // ...so they get hot–reloaded when something changes...
        }),
        require('postcss-simple-vars')(), // ...then replace the variables...
        require('postcss-focus')(), // ...add a :focus to ever :hover...
        require('autoprefixer')({ // ...and add vendor prefixes...
          browsers: ['last 2 versions', 'IE > 8'] // ...supporting the last 2 major browser versions and IE 8 and up...
        }),
        require('postcss-reporter')({ // This plugin makes sure we get warnings in the console
          clearMessages: true
        })
      ];
    },
    target: "web", // Make web variables accessible to webpack, e.g. window
    stats: false, // Don't show stats in the console
    progress: true
  }
}
