export default class GanttController {
	/*@ngInject*/
	constructor($scope, navService, $rootScope) {
		this.navService = navService
		this.$scope = $scope
		this.rootScope = $rootScope
		this.ganttData = []
		this.loadGantt()
		this.rootScope.$on('rloadGantt', () => {
			this.navService.eraseCache('Gantt')
			console.log(this.navService.Cache.Memory);
			this.loadGantt()
				.then(() => {
					this.reloadGantt()
				})
		})
	}

	loadGantt() {
		return new Promise((resolve) => {
			this.navService.getGantt()
				.then(data => {
					if (data.constructor == Object) {
						this.ganttData = data.data
						this.$scope.$digest()
						resolve(true)
					}
				})
		})
	}

	reloadGantt() {
		this.rootScope.$broadcast('GanttReload', this.ganttData);
	}

}

GanttController.$inject = ['$scope', 'navService', '$rootScope']

// TODO: Fix the response on save gantt if fails it`s not behaving like wanted
// TODO: Make Gantt compatible with Planejamento data
