/**
 * Created by bykovdenis on 11.03.17.
 */
require('babel-polyfill');
// Установка режима работы сборщика
const nodeEnv = process.env.NODE_ENV || 'development';
// Режим очистки старых файлов билда при каждой сборке
const REFRESH = process.env.REFRESH;
// webpack.config.js
const webpack = require('webpack');
const path = require('path');
var fs = require('fs');
// Плагин очистки директории
const CleanWebpackPlugin = require('clean-webpack-plugin');
// для плагина формирования css в отдельные файлы
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin'); // копирование файлов
const HtmlWebpackPlugin = require('html-webpack-plugin');  // для плагина формирования html из шаблонизатора
// dashbord
var DashboardPlugin = require('webpack-dashboard/plugin');
// для плагина по минификации и оптимизации css
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const buildPath = path.join(__dirname, './build');
const jsSourcePath = path.join(__dirname, './src');
const pathRoute = '';
const host = (process.env.HOST || 'localhost');
const port = (+process.env.PORT + 1) || 3001;

var babelrc = fs.readFileSync('./.babelrc');
var babelrcObject = {};

try {
  babelrcObject = JSON.parse(babelrc);
} catch (err) {
  console.error('==>     ERROR: Error parsing your .babelrc.');
  console.error(err);
}

var babelrcObjectDevelopment = babelrcObject.env && babelrcObject.env.development || {};

// merge global and dev-only plugins
var combinedPlugins = babelrcObject.plugins || [];
combinedPlugins = combinedPlugins.concat(babelrcObjectDevelopment.plugins);

var babelLoaderQuery = Object.assign({}, babelrcObjectDevelopment, babelrcObject, {plugins: combinedPlugins});
delete babelLoaderQuery.env;

// Since we use .babelrc for client and server, and we don't want HMR enabled on the server, we have to add
// the babel plugin react-transform-hmr manually here.

// make sure react-transform is enabled
babelLoaderQuery.plugins = babelLoaderQuery.plugins || [];
var reactTransform = null;
for (var i = 0; i < babelLoaderQuery.plugins.length; ++i) {
  var plugin = babelLoaderQuery.plugins[i];
  if (Array.isArray(plugin) && plugin[0] === 'react-transform') {
    reactTransform = plugin;
  }
}

if (!reactTransform) {
  reactTransform = ['react-transform', {transforms: []}];
  babelLoaderQuery.plugins.push(reactTransform);
}

if (!reactTransform[1] || !reactTransform[1].transforms) {
  reactTransform[1] = Object.assign({}, reactTransform[1], {transforms: []});
}

// make sure react-transform-hmr is enabled
reactTransform[1].transforms.push({
  transform: 'react-transform-hmr',
  imports: ['react'],
  locals: ['module']
});

module.exports = {
  devServer: {
    contentBase: buildPath,
    historyApiFallback: true,
    historyApiFallback: {
      index: '/airlines/'
    },
    publicPath: '/airlines/',
    stats: {
      assets: true,
      children: false,
      chunks: false,
      hash: false,
      modules: false,
      publicPath: true,
      timings: true,
      version: false,
      warnings: true,
      colors: {
        green: '\u001b[32m',
      },
    },
  },
  context: jsSourcePath,
  entry: {
    components: './js/',
    components_styles: './scss'
  },
  output: {
    path: buildPath,
    filename: path.join(pathRoute, 'js/[name].[hash].js'),
    chunkFilename: path.join(pathRoute, 'js/[name].[hash].js')
  },
  devtool: 'inline-source-map',
  // Определение расширений файлов по-умолчанию
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx', '.scss', '.html', '.jade']
  },
  resolveLoader: {
    modules: ["web_loaders", "web_modules", "node_loaders", "node_modules"],
    extensions: [".webpack-loader.js", ".web-loader.js", ".babel-loader.js", ".loader.js", ".js"]
  },
  // Настройка плагинов
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(nodeEnv),
      },
    }),
    // генерация html файла на основе шаблонизатора jade
    new HtmlWebpackPlugin({
      title: 'Title',
      template: 'jade/index.jade',
      inject: true,
      path: jsSourcePath,
      minify: {
        collapseWhitespace: true,
        preserveLineBreaks: true,
        keepClosingSlash: true,
        removeAttributeQuotes: true,
        removeComments: true,
        trimCustomFragments: true,
      }
    }),
    new DashboardPlugin(),
    // Формировать отдельный css файл
    new ExtractTextPlugin({
      filename: path.join(pathRoute, 'css/[name].[hash].css'),
      allChunks: true
    }),
    // это функциональность webpack, предназначенная не только для быстрой подгрузки изменений на машине разработчика, но и для обновления сайтов в production
    new webpack.HotModuleReplacementPlugin(),
    // Плагин копирования файлов
    new CopyWebpackPlugin([{
      context: __dirname + '/src/api',
      from: '**/*',
      to: 'data/'
    }]),
    new webpack.LoaderOptionsPlugin({
      debug: true
    })
  ],
  module: {
    rules: [{
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract({
        use: [
          'css-loader?modules&importLoaders=2&localIdentName=[local]',
          'postcss-loader',
          'sass-loader'
        ]
      })
    }, {
      test: /\.jade$/,
      loader: "jade-loader",
      query: {pretty: true}
    }, {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loaders: [
        'react-hot-loader',
        'babel-loader?' + JSON.stringify(babelLoaderQuery),
        'eslint-loader'
        ]
    }, {
      test: /\.js$/,
      use: ["source-map-loader"],
      enforce: "pre"
    }, {
      test: /\.(gif|png|jpe?g|svg)$/i,
      loaders: [
        'file-loader?name=themes/owm/assets/img/[name].[ext]'
      ]
    }, {
      test: /\.(woff|woff2|ttf|eot)([\?]?.*)$/i,
      loader: 'file-loader?name=themes/owm/assets/fonts/[name].[ext]'
    }]
  }
};

if(nodeEnv === 'production') {
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: true,
        unsafe: true
      }
    })
  );
  module.exports.plugins.push(
    new OptimizeCssAssetsPlugin({ // Оптимизация и минификация сгенерированного css кода
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorOptions: { discardComments: {removeAll: true } },
      canPrint: true
    }));
}

// if(NODE_ENV == 'development') {
  module.exports.plugins.push(
    new webpack.LoaderOptionsPlugin({
      debug: true
    })
  );
// }

if(REFRESH == 'refresh') {
  module.exports.plugins.push(
    // Чистить папку с билдом перед каждой сборкой
    new CleanWebpackPlugin('build/', {
      root: __dirname,
      verbose: true,
      dry: false,
    })
  );

}
