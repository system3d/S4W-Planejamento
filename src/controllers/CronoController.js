export default class CronoController {
	constructor($scope, navService) {
		this.$scope = $scope
		this.navService = navService
		this.Cronogramas = []
		this.$scope.$watch(
			() => {
				return this.navService.flags()
			},
			() => {
				this.loadCrono()
				.then( () => this.$scope.$digest() )
			}, true);
	}

	loadCrono() {
		return new Promise((resolve, reject) => {
			this.navService.getCronogramas()
				.then(cronos => {
					this.Cronogramas = cronos;
					resolve(true)
				}).catch(err => {
					reject(err)
				})
		})
	}
}

CronoController.$inject = ['$scope', 'navService']

//TODO: Unit Test for this whole controller
//TODO: End it obviously
