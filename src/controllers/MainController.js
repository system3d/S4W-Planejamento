export default class MainController {
	constructor($scope, $location) {
		let activeTemp = $location.$$url
		activeTemp = activeTemp.replace('/','')
		this.active = activeTemp === '' ? 'home' : activeTemp
	}

	changeName() {
		this.name = 'angular-tips';
	}

	changeActive(n) {
		this.active = n
	}
}

MainController.$inject = ['$scope','$location']
