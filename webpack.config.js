let webpack = require('webpack')
let isDevServer = process.argv.join('').indexOf('webpack-dev-server') > -1;
let outPath = 'C:/xampp/htdocs/FeeltheSteel/public/modules/planejamento'

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
		}]
	},
	resolve: {
		extensions: ['', '.js', '.jade', '.html']
	},
	output: {
		path: outPath,
		publicPath: '/',
		filename: 'planejamento.js'
	},
	plugins: [

	]
}

if (!isDevServer) {
	config.plugins.push(new webpack.NoErrorsPlugin())
	config.plugins.push(new webpack.optimize.DedupePlugin())
	config.plugins.push(new webpack.optimize.OccurenceOrderPlugin())
	config.plugins.push(new webpack.optimize.UglifyJsPlugin())
	config.plugins.push(
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('production')
			}
		})
	)
	config.plugins.push(
		new webpack.DefinePlugin({
      '__DEVTOOLS__': false
    })
	)
	config.devtool = 'cheap-module-source-map'
} else {
	config.plugins.push(new webpack.HotModuleReplacementPlugin())
	config.devtool = 'inline-source-map';
}


module.exports = config
