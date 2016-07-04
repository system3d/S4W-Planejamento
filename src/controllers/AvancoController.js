export default class AvancoController {
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
		this.navService.getAvanco()
			.then(data => {
				this.data = data
				this.$scope.$digest()
			})
			.catch( () => {
				flashMessage('error','Não foi possivel recuperar dados do servidor', 'Ooops....')
			})
	}
}

AvancoController.$inject = ['$scope', 'navService']
