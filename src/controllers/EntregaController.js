export default class EntregaController {
	/*@ngInject*/
	constructor($scope, navService, $timeout) {
		this.$scope = $scope
		this.navService = navService
		this.$timeout = $timeout
		this.retriesAttempt = 0
		this.loadError = false
		this.loading = true

		$timeout(() => {
			this.$scope.$broadcast('highchartsng.reflow')
		}, 500);

		document.addEventListener("toggleSidebar", () => {
			$timeout(() => {
				this.$scope.$broadcast('highchartsng.reflow')
			}, 500);
		}, false);

		this.$scope.$watch(
			() => {
				return this.navService.flags()
			},
			() => {
				this.loadData()
			}, true);

		this.chartConfig = {
			options: {
				chart: {
					type: 'column'
				},
				tooltip: {
					style: {
						padding: 10
					},
					formatter: function() {
						return this.x + '<br/><br/>' +
							'<b>' + this.series.name +
							'</b> : <b>' + this.y + ' kg</b>';
					}
				}
			},

			series: [{
				name: 'Previsto',
				data: []
			},{
				name: 'Realizado',
				data: []
			}],

			title: {
				text: ''
			},

			xAxis: {
				title: {
					text: 'Estágios'
				},
				categories: ["Projeto", "Fabricação", "Expedição", "Montagem"]
			},
			yAxis: {
				title: {
					text: 'Kg'
				}
			}
		}
	}

	loadData(retry) {
		this.navService.getEntrega(retry)
			.then(data => {
				this.data = data
				this.chartConfig.series[0].data = [{
					name: 'Projeto',
					y: parseInt(data.plan[0])
				}, {
					name: 'Fabricação',
					y: parseInt(data.plan[1])
				}, {
					name: 'Expedição',
					y: parseInt(data.plan[2])
				}, {
					name: 'Montagem',
					y: parseInt(data.plan[3])
				}]

				this.chartConfig.series[1].data = [{
					name: 'Projeto',
					y: parseInt(data.real[0])
				}, {
					name: 'Fabricação',
					y: parseInt(data.real[1])
				}, {
					name: 'Expedição',
					y: parseInt(data.real[2])
				}, {
					name: 'Montagem',
					y: parseInt(data.real[3])
				}]

				this.retriesAttempt = 0
				this.loadError = false
				this.loading = false
				this.$scope.$digest()
				this.$scope.$broadcast('highchartsng.reflow');
			})
			.catch(() => {
				if (this.retriesAttempt < 5) {
					this.$timeout(() => {
						this.loadData(true)
					}, 750);
					this.retriesAttempt = this.retriesAttempt + 1
				} else {
					this.loadError = true
					this.loading = false
					this.$scope.$digest()
				}
			})
	}

}

EntregaController.$inject = ['$scope', 'navService', '$timeout']

// TODO: Real Time Charts
