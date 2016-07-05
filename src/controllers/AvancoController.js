export default class AvancoController {
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
		this.navService.getAvanco()
			.then(data => {
				this.data = data
				console.log(this.data);
				this.$scope.$digest()
			})
			.catch( () => {
				flashMessage('error','Não foi possivel recuperar dados do servidor', 'Ooops....')
			})
	}
}

AvancoController.$inject = ['$scope', 'navService']

// TODO: Fix Charts series
// TODO: Find a Way to work with both APIs
// TODO: Fucking Load on Gantt Save is fucking fucked, fix that shit
// TODO: Cookie or some oher shit to open/close gantt tree
// TODO: Backend returnRevision fucked as well(line 546 undefined index: id) ~ (Maybe it`s the wrong obj format, most certainly)
// TODO: Charts Number Format may be fucked, rounding 6000 to 6
