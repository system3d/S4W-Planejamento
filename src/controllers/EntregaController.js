export default class EntregaController {
	/*@ngInject*/
	constructor($scope, navService) {
		this.$scope = $scope
		this.navService = navService
		this.labels = ["Projeto", "Fabricação", "Expedição", "Montagem"];
		this.series = ['Previsto(kg)'];
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
				this.$scope.$digest()
			})
			.catch(() => {
				flashMessage('error', 'Não foi possivel recuperar dados do servidor', 'Ooops....')
			})
	}
}

EntregaController.$inject = ['$scope', 'navService']

// TODO: Real Time Charts
