const webpack = require("webpack");
const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = {
	devtool: "cheap-module-source-map",

	entry: {
		app: [
			"whatwg-fetch",
			"./src/scripts/index.js"
		],
		vendor: [
			"react",
			"react-dom",
			"react-router-dom",
			"react-transition-group"
		]
	},

	module: {
		rules: [
			{
				test: /\.js?$/,
				use: [
					{
						loader: "babel-loader",
						options: {
							babelrc: false,
							presets: [
								["env", { modules: false }],
								"react",
								"stage-0"
							],
							plugins: [
								"react-hot-loader/patch",
								"transform-decorators-legacy"
							]
						}
					}
				],
				exclude: /node_modules/
			},
			{
				test: /\.css|scss$/,
				use: [
					"style-loader",
					"css-loader",
					{
						loader: "postcss-loader",
						options: {
							sourceMap: true
						}
					},
					"resolve-url-loader",
					"sass-loader?sourceMap",
					"import-glob-loader"
				]
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				use: [
					"file-loader?hash=sha512&digest=hex&name=assets/[hash].[ext]",
					{
						loader: "image-webpack-loader",
						options: {
							mozjpeg: {
								progressive: true
							},
							gifsicle: {
								interlaced: false
							},
							optipng: {
								optimizationLevel: 4
							},
							pngquant: {
								quality: "75-90",
								speed: 4
							}
						}
					}
				]
			}
		]
	},

	plugins: [
		new webpack.NoEmitOnErrorsPlugin(),
		new HtmlWebpackPlugin({
			template: "src/templates/index.html"
		}),
		new CopyWebpackPlugin([
			{
				from: 'src/assets/images',
				to: 'assets/images'
			},
			{
				from: 'src/assets/fonts',
				to: 'assets/fonts'
			}
		]),
		new webpack.optimize.CommonsChunkPlugin({
			name: "vendor"
		}),
		new UglifyJSPlugin({
			sourceMap: true,
			beautify: false,
			mangle: {
				screw_ie8: true,
				keep_fnames: true
			},
			compress: {
				screw_ie8: true
			},
			comments: false
		}),
		new webpack.DefinePlugin({
			"process.env.NODE_ENV": JSON.stringify("production")
		})
	],

	output: {
		filename: "scripts/[name].[chunkhash].js",
		path: resolve(__dirname, "dist"),
		publicPath: `/`
	}
};
