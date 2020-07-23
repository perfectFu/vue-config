const path = require('path')
const HtmlwebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const PurifyCSS = require('purifycss-webpack')
const glob = require('glob-all')

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
	resolve: {
		// 优化第三方组件库查找速度
		modules: [path.resolve(__dirname, './node_modules')],
		alias: {
			'@': path.resolve(__dirname, './src'),
			vue: path.resolve(
				__dirname,
				'./node_modules/vue/dist/vue.runtime.esm.js'
			),
		},
		extensions: ['.js', '.json'], // 列表尽量少，导入语句尽量带上后缀
	},
	// 优化cnd静态资源
	// externals: {
	//     vue: 'Vue'
	// },
	module: {
		rules: [
			{
				test: /\.vue$/,
				// 优化loader查找速度
				include: path.resolve(__dirname, 'src'),
				loader: 'vue-loader',
			},
			{
				test: /\.js$/,
				include: path.resolve(__dirname, 'src'),
				loader: 'babel-loader',
			},
			{
				test: /\.(png|jpe?g|svg|webp)/,
				include: path.resolve(__dirname, 'src'),
				use: [
					{
						loader: 'url-loader',
						options: {
							name: '[name]_[contenthash:8].[ext]',
							esModule: false, // 解决图片地址被解析为[object module]
							outputPath: 'images/',
							// 小于2kb，才转为base64
							limit: 2048,
						},
					},
				],
			},
			{
				test: /.(eot|ttf|woff|woff2|svg)/,
				include: path.resolve(__dirname, 'src'),
				use: [
					{
						loader: 'url-loader',
						options: {
							name: '[name]_[contenthash:8].[ext]',
							outputPath: 'font/',
							limit: 2048, // 字体文件采用base64方式
						},
					},
				],
			},
			{
				test: /\.less$/,
				include: path.resolve(__dirname, 'src'),
				use: [
					// 'style-loader',
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
		new CleanWebpackPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new VueLoaderPlugin(),
	],
}
