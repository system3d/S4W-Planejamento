module.exports = function(config) {
	config.set({
		frameworks: ['jasmine'],
		browsers: ['PhantomJS'],
		reporters: ['progress'],
		files: [
			'test/tests.webpack.js'
		],
		preprocessors: {
			'test/tests.webpack.js': ['webpack', 'sourcemap']
		},
		webpack: require('./webpack.config'),
		webpackMiddleware: {
			noInfo: 'errors-only'
		}
	});
};
