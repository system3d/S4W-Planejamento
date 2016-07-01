let webpack = require('webpack')
let isDevServer = process.argv.join('').indexOf('webpack-dev-server') > -1;

let config = {
	entry: [
		'./src/index.js'
	],
	module: {
		loaders: [{
			test: /\.js$/,
			loaders: ['ng-annotate', 'babel'],
			exclude: /node_modules/
		}, {
			test: /\.html$/,
			loader: 'html'
		}, {
			test: /\.jade$/,
			loader: 'jade-loader'
		}, {
			test: /\.styl$/,
			loader: 'style-loader!css-loader!stylus-loader'
		}, {
			test: /\.css$/,
			loader: "style-loader!css-loader"
		} ]
	},
	resolve: {
		extensions: ['', '.js', '.jade', '.html']
	},
	output: {
		path: __dirname + '/dist',
		publicPath: '/',
		filename: 'planejamento.js'
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	]
}

if (!isDevServer) {
	config.plugins.push(new webpack.NoErrorsPlugin())
	config.plugins.push(new webpack.optimize.DedupePlugin())
	config.plugins.push(new webpack.optimize.UglifyJsPlugin())
	config.plugins.push(new webpack.optimize.OccurenceOrderPlugin())
} else {
	config.devtool = 'inline-source-map';
}


module.exports = config
