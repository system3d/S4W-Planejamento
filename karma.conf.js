module.exports = function(config) {
	config.set({
		frameworks: ['jasmine'],
		browsers: ['PhantomJS'],
		reporters: ['mocha'],
		files: [{
			pattern: 'node_modules/babel-es6-polyfill/browser-polyfill.min.js',
			watched: false,
			included: true,
			served: true
		}, {
			pattern: 'test/tests.webpack.js',
			watched: false,
			included: true,
			served: true
		}],

		preprocessors: {
			'test/tests.webpack.js': ['webpack']
		},
		autoWatchBatchDelay: 1000,
		webpack: {
			devtool: 'source-map',
			module: {
				loaders: [{
					test: /\.js$/,
					loaders: ['babel', 'ng-annotate'],
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
				}]
			}
		},
		webpackMiddleware: {
			noInfo: true,
			quiet: true
		}
	});
};
