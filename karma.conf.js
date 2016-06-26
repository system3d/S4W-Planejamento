module.exports = function(config) {
	config.set({
		frameworks: ['jasmine'],
		browsers: ['PhantomJS'],
		reporters: ['progress'],
		autoWatch: true,
    singleRun: false,
		files: [
			'test/tests.webpack.js'
		],
		preprocessors: {
			'test/tests.webpack.js': ['webpack']
		},
		webpack: {
             devtool: 'source-map',
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
							}]
             }
         },
         webpackMiddleware: {
             noInfo: true,
						 quiet: true
         }
	});
};
