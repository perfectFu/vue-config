const path = require('path')
const HtmlwebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const PurifyCSS = require('purifycss-webpack')
const glob = require('glob-all')
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.config.base')

const prodConfig = {
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
		filename: 'js/[name]_[chunkhash:8].js', // 开启HMR不支持chunkhash contenthash
	},
	mode: 'production', // 打包环境
	devtool: 'none', // 开发环境配置，生产不建议开启
	// 优化cnd静态资源
	// externals: {
	//     vue: 'Vue'
	// },
	module: {
		rules: [
            {
				test: /\.css$/,
				include: path.resolve(__dirname, 'src'),
				use: [
					{
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../', // 解决独立出来的css中引入图片相对地址，地址会找不到
                        }
                    },
					'css-loader',
					'postcss-loader',
				],
			},
			{
				test: /\.less$/,
				include: path.resolve(__dirname, 'src'),
				use: [
					{
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../', // 解决独立出来的css中引入图片相对地址，地址会找不到
                        }
                    },
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
			minify: {
				// 压缩HTML⽂件
				removeComments: true, // 移除HTML中的注释
				collapseWhitespace: true, // 删除空⽩符与换⾏符
				minifyCSS: true, // 压缩内联css
			},
		}),
		// 抽离css到独立的文件
		new MiniCssExtractPlugin({
			filename: 'css/[name]_[contenthash:6].css',
            chunkFilename: '[id].css',
		}),
		// 压缩css
		new OptimizeCSSAssetsPlugin({
			cssProcessor: require('cssnano'),
			cssProcessorPluginOptions: {
				discardComments: { removeAll: true },
			},
		}),
		// 清除⽆⽤ css
		// new PurifyCSS({
		// 	paths: glob.sync([
		// 		// 要做 CSS Tree Shaking 的路径⽂件
		// 		path.resolve(__dirname, './src/*.html'), // 请注意，我们同样需要对 html ⽂件进⾏ tree shaking
		// 		path.resolve(__dirname, './src/*.js'),
		// 	]),
		// }),
	],
}

module.exports = merge(baseConfig, prodConfig)
