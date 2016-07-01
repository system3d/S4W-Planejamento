export default class GanttController {
	/*@ngInject*/
	constructor($scope, navService, $rootScope) {
		this.navService = navService
		this.$scope = $scope
		this.rootScope = $rootScope
		this.ganttData = []
		this.loadGantt()
		this.rootScope.$on('rloadGantt', () => {
			this.reloadGantt()
		})

		this.$scope.$watch(
			() => {
				return this.navService.flags()
			},
			(n,o) => {
				if(n !== o)
					this.reloadGantt()
			}, true);
	}

	loadGantt() {
		return new Promise((resolve, reject) => {
			this.navService.getGantt()
				.then(data => {
					if (data.constructor == Object) {
						this.ganttData = data.data
						this.$scope.$digest()
						resolve(true)
					}
				})
				.catch(err => {
					console.log(err);
				})
		})
	}

	reloadGantt() {
		this.navService.eraseCache('Gantt')
		this.loadGantt()
			.then(() => {
				this.rootScope.$broadcast('GanttReload', this.ganttData);
			})
	}

}

GanttController.$inject = ['$scope', 'navService', '$rootScope']

// TODO: Make Gantt compatible with Planejamento data
// TODO: Error Service to handle errors(e.e) and display to user if it influence him
