let path = require('path');
let webpack = require('webpack');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let autoprefixer = require('autoprefixer');
let px2rem = require('postcss-px2rem');
//压缩css
let OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
let WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
let webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools-config')).development();
let LiveReloadPlugin = require('webpack-livereload-plugin');
// 常量
const CONTAINERS_DIR = path.resolve(__dirname, './containers'); // pages目录
const DIST_DIR = path.resolve(__dirname, '../dist'); // dist目录

const DEV_ENV = 'development';
const PROD_ENV = 'production';
const ENV = DEV_ENV;

module.exports = {
    context: path.resolve(__dirname, '../'),
    // entry的键名作为output中[name]
    entry: {
        'app': path.resolve('./index.js'),
        'public': ['react', 'react-dom', 'react-router', 'redux', 'react-redux', 'react-router-redux'],
        'lib-flexible': path.resolve('./libs/lib-flexible')
    },
    // 实际path和filename拼接字符串，所以可以把entry的键名设置为目录形式造成分开存放的形式
    output: {
        path: DIST_DIR,
        publicPath: '/', //用于css中引用文件的相对路径
        // [name]
        // [hash] 本次编译的hash版本
        // [chunkhash] 当前chunk的hash版本
        filename: 'js/[name].js',
        chunkFilename: 'js/chunk/[name]/[hash].js' // chunkFilename参数指定的是除入口文件外的chunk
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({ // 合成公告部分代码
            name: ['common', 'public'],
            filename: 'js/[name].bundle.js',
            minChunks: 2 // 有两个js require 相同的文件即提取
        }),
        new ExtractTextPlugin('css/[name].css'), // 分离代码块
        // new webpack.ProvidePlugin({ // 自动引用需要的模块
        //   $: 'jquery',
        //   jQuery: 'jquery'
        // }),
        // new webpack.DefinePlugin({
        //   'NODE_ENV': JSON.stringify(ENV) // 在编译之前简单的替换变量名，这里替换成development或production变量 所以应该加上JSON.stringify以加上双引号 定义的NODE_ENV不能在webpack.config.js中使用
        // }),
        // new webpack.EnvironmentPlugin(),// 不知道如何使用
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './index.html'),
            filename: 'index.html',
            chunksSortMode: 'dependency',
            inject: 'body' //引入的资源放在哪里 head/body
        }), 
        // Webpack 2.1.0-beta23 之后的config里不能直接包含自定义配置项
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: function() {
                    return [
                        px2rem({
                            remUnit: 64,
                        }),
                        autoprefixer({
                            browsers: ['> 1%', 'Android >= 2.1', 'ios 7', 'firefox >= 15', 'IE 9'],
                        })
                    ];
                }
            }
        }),
        // 压缩js 开发环境不用
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false
        //     },
        //     // comments: /\/\*.*\*\//
        // }),
        //压缩css
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g, // 匹配文件
            cssProcessor: require('cssnano'),
            cssProcessorOptions: { discardComments: { removeAll: true } },
            canPrint: true //输出信息console.log
         }),
        
        webpackIsomorphicToolsPlugin,
        //key就是需要替换的变量名
        new webpack.DefinePlugin({
            // 定义生产环境
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        }),
        // 开发环境更新文件自动刷新
        new LiveReloadPlugin({
            appendScriptTag: true,
            port: 7001
        }),
    ], // 数组元素是插件实例
    module: {
        loaders: [{
            test: /\.(js|jsx)$/,
            // 这里用数组纯粹是为了用多种方式
            include: [
                path.resolve(__dirname)
            ],
            exclude: [
                /node_modules/
            ],
            // 以上上个参数的值都可以是正则、字符串、数组，数组内元素可以是以上三者，数组内的条件都得满足即是与关系
            loader: 'babel-loader' //可以省略loader，多个loader用!相连，后面的loader先执行
        }, {
            test: webpackIsomorphicToolsPlugin.regular_expression('scss'),// /\.scss$/,
            include: path.resolve(__dirname),
            exclude: [
                /node_modules/
            ],
            loader: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: 'css-loader?modules&localIdentName=[name]-[local]!postcss-loader!sass-loader'
            })
            // loader: 'style-loader/url!css-loader?modules&localIdentName=[name]-[local]-[hash:base64:8]!postcss-loader!sass-loader'
        }, {
            test: webpackIsomorphicToolsPlugin.regular_expression('css'), ///\.css$/,
            include: [path.resolve(__dirname)],
            exclude: [
                /node_modules/
            ],
            loader: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: 'css-loader?modules&localIdentName=[name]-[local]-[hash:base64:8]!postcss-loader'
            })
        }, {
            test: webpackIsomorphicToolsPlugin.regular_expression('images'),///\.(png|jpg|jpeg|gif)$/,
            exclude: [
                /node_modules/
            ],
            loader: 'url-loader?limit=8192&name=static/images/[name].[hash].[ext]',
            // query: {
            //     limit: '8192', // 8K
            //     //mimetype
            //     name: 'static/images/[name].[ext]' // 图片放在static下
            // }
        }, {
            test: webpackIsomorphicToolsPlugin.regular_expression('fonts'),
            loader: 'file-loader',
            query: {
                name: 'static/fonts/[name].[ext]'
            }
        }]
    }, 
    resolve: {
        extensions: ['.js', '.jsx'], // require 无需后缀
        // require时require('assets')即可
        alias: {
            assets: path.resolve(__dirname, './assets'),
        },
    },
    devServer: {
        historyApiFallback: true,
    },
    devtool: 'inline-source-map',
}
