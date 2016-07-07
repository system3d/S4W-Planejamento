export default class GanttController {
	/*@ngInject*/
	constructor($scope, navService, $rootScope, $timeout) {
		this.navService = navService
		this.$scope = $scope
		this.rootScope = $rootScope
		this.ganttData = []
		this.$timeout = $timeout
		this.retriesAttempt = 0
		this.loadError = false
		this.loading = true

		this.loadGantt()

		this.rootScope.$on('rloadGantt', () => {
			this.reloadGantt()
		})

		document.addEventListener("toggleSidebar", () => {
			this.rootScope.$broadcast('ganttResize', this.ganttData);
		}, false);

		this.$scope.$watch(
			() => {
				return this.navService.flags()
			},
			(n, o) => {
				if (n !== o)
					this.reloadGantt()
			}, true);
	}

	loadGantt(retry) {
		return new Promise((resolve) => {
			this.navService.getGantt(retry)
				.then(data => {
					if (data.constructor == Object) {
						this.ganttData = data.data
						this.retriesAttempt = 0
						this.loadError = false
						this.loading = false
						this.$scope.$digest()
						this.rootScope.$broadcast('ganttResize', this.ganttData);
						resolve(true)
					}
				})
				.catch( () => {
					if (this.retriesAttempt < 5) {
						this.$timeout(() => {
							this.loadGantt(true)
						}, 750);
						this.retriesAttempt = this.retriesAttempt + 1
					} else {
						this.loadError = true
						this.loading = false
						this.$scope.$digest()
					}
				})
		})
	}

	reloadGantt() {
		this.loadGantt()
			.then(() => {
				this.rootScope.$broadcast('GanttReload', this.ganttData);
			})
	}

}

GanttController.$inject = ['$scope', 'navService', '$rootScope', '$timeout']
