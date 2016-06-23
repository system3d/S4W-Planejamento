config.$inject = ['$interpolateProvider'];

export default function config($interpolateProvider) {
	$interpolateProvider.startSymbol('[[')
	$interpolateProvider.endSymbol(']]')
}
