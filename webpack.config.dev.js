const path = require('path')
const HtmlwebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const baseConfig = require('./webpack.config.base')
const {merge} = require('webpack-merge')

const devConfig = {
	// 输出目录
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: 'bundle.js',
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
				target: 'http://localhost:9091',
			},
		},
	},
	module: {
		rules: [
            {
				test: /\.css$/,
				include: path.resolve(__dirname, 'src'),
				use: [
					'vue-style-loader',
					'css-loader',
					'postcss-loader',
				],
			},
			{
				test: /\.less$/,
				include: path.resolve(__dirname, 'src'),
				use: [
					'vue-style-loader',
					'css-loader',
					'postcss-loader',
					'less-loader',
				],
			},
		],
	},
	plugins: [
		new HtmlwebpackPlugin({
			title: 'hello webpack',
			filename: 'index.html',
			template: './index.html',
		}),
		new webpack.HotModuleReplacementPlugin(),
	],
}


module.exports = merge(baseConfig, devConfig)