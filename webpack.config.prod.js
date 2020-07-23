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
    // js tree shaking
    // 代码分割
	// optimization: {
	// 	usedExports: true, // 哪些模块被使用了，在做打包, 生产环境默认开启
	// 	splitChunks: {
	// 		chunks: 'all', // 所有chunks代码公共的部分抽离出来成为一个单独的js
	// 	},
	// },
	optimization: {
		splitChunks: {
			chunks: 'all', //对同步 initial，异步 async，所有的模块有效 all
			minSize: 30000, //最⼩尺⼨，当模块⼤于30kb
			maxSize: 0, //对模块进⾏⼆次分割时使⽤，不推荐使⽤
			minChunks: 1, //打包⽣成的chunk⽂件最少有⼏个chunk引⽤了这个模块
			maxAsyncRequests: 5, //最⼤异步请求数，默认5
			maxInitialRequests: 3, //最⼤初始化请求书，⼊⼝⽂件同步请求，默认3
			automaticNameDelimiter: '-', //打包分割符号
			name: true, //打包后的名称，除了布尔值，还可以接收⼀个函数function
			cacheGroups: {
				//缓存组
				vendors: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendor', // 要缓存的 分隔出来的 chunk 名称
					priority: -10, //缓存组优先级 数字越⼤，优先级越⾼
				},
				vue: {
					chunks: 'initial', // 必须三选⼀： "initial" | "all" | "async"(默认就是async)
					test: /vue|vue-router|vuex/, // 正则规则验证，如果符合就提取 chunk,
					name: 'vue',
					minSize: 30000,
					minChunks: 1,
                },
                // vchart: {
                //     chunks: 'initial',
                //     test: /v-charts\/lib\/line\.common|echarts/,
                //     name: 'vcharts',
                //     minSize: 10,
				// 	minChunks: 1,
                // },
				default: {
					minChunks: 2,
					priority: -20,
					reuseExistingChunk: true, //可设置是否重⽤该chunk
				},
			},
		},
	},
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
						},
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
						},
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
