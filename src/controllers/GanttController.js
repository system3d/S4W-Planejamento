export default class GanttController {
	/*@ngInject*/
	constructor($scope, navService, $rootScope) {
		this.navService = navService
		this.$scope = $scope
		this.rootScope = $rootScope
		this.ganttData = []
		this.loadGantt()
		.catch( () => {
			flashMessage('error','Não foi possivel recuperar dados do servidor', 'Ooops....')
		})
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
					reject(err)
				})
		})
	}

	reloadGantt() {
		this.loadGantt()
			.then(() => {
				this.rootScope.$broadcast('GanttReload', this.ganttData);
			})
			.catch( () => {
				flashMessage('error','Não foi possivel recuperar dados do servidor', 'Ooops....')
			})
	}

}

GanttController.$inject = ['$scope', 'navService', '$rootScope']

// TODO: Make Gantt compatible with Planejamento data
