const path = require('path')
const HtmlwebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    // 入口文件
    entry: './src/index.js',
    // 会将index other合并到一个bundle中
    // entry: ['./src/index.js', './src/other.js'],
    // 多入口模式，会生成多个bundle
    // entry: {
    //     index: './src/index.js',
    //     other: './src/other.js'
    // },
    // 输出目录
    output: {
        path: path.resolve(__dirname, './dist'),
        // filename: 'js/[name]_[chunkhash:8].js', // 开启HMR不支持chunkhash contenthash
        filename: 'bundle.js'
    },
    mode: 'development', // 打包环境
    devtool: 'cheap-module-eval-source-map', // 开发环境配置，生产不建议开启
    devServer: {
        contentBase: './dist',
        open: true,
        port: 8081,
        hot: true,
        hotOnly: true, // 即使HMR不生效，也不刷新浏览器
        proxy: {
            '/api': {
                target: 'http://localhost:9091'
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader'
            },
            {
                test: /\.(png|jpe?g|svg|webp)/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: '[name]_[contenthash:8].[ext]',
                            esModule: false, // 解决图片地址被解析为[object module]
                            outputPath: 'images/',
                            // 小于2kb，才转为base64
                            limit: 2048
                        }
                    }
                ]
            },
            {
                test: /.(eot|ttf|woff|woff2|svg)/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: '[name]_[contenthash:8].[ext]',
                            outputPath: 'font/',
                            limit: 2048, // 字体文件采用base64方式
                        }
                    }
                ]
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'less-loader'
                ]
            }
        ]
    },
    plugins: [
        new HtmlwebpackPlugin({
            title: 'hello webpack',
            filename: 'index.html',
            template: './index.html'
        }),
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new VueLoaderPlugin()
    ]
}