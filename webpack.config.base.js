const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
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
		filename: 'bundle.js',
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
			}
		],
	},
	plugins: [
		new CleanWebpackPlugin(),
		new VueLoaderPlugin(),
	],
}
