export default class EntregaController {
	/*@ngInject*/
	constructor($scope, navService) {
		this.$scope = $scope
		this.navService = navService
		this.labels = ["Projeto", "Fabricação", "Expedição", "Montagem"];
		this.series = ['Previsto', 'Realizado'];
		this.data = [];

		this.$scope.$watch(
			() => {
				return this.navService.flags()
			},
			() => {
				this.loadData()
			}, true);

		this.colors = ['#00ADF9', '#12A030']
	}

	loadData() {
		this.navService.getEntrega()
			.then(data => {
				this.data = data
			})
	}
}

EntregaController.$inject = ['$scope', 'navService']

// TODO: Real Time Charts
