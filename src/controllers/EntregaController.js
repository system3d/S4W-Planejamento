export default class EntregaController {
	/*@ngInject*/
	constructor($scope, navService, $timeout) {
		this.$scope = $scope
		this.navService = navService

		$timeout(() => {
			this.$scope.$broadcast('highchartsng.reflow')
		}, 500);

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
			}],

			title: {
				text: 'Gráfico de Entrega - Planejamento'
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

	loadData() {
		this.navService.getEntrega()
			.then(data => {
				this.data = data
				this.chartConfig.series[0].data = [{
					name: 'Projeto',
					y: data[0]
				}, {
					name: 'Fabricação',
					y: data[1]
				}, {
					name: 'Expedição',
					y: data[2]
				}, {
					name: 'Montagem',
					y: data[3]
				}]
				this.$scope.$digest()
				this.$scope.$broadcast('highchartsng.reflow');
			})
			.catch(() => {
				flashMessage('error', 'Não foi possivel recuperar dados do servidor', 'Ooops....') // eslint-disable-line no-undef
			})
	}

}

EntregaController.$inject = ['$scope', 'navService', '$timeout']

// TODO: Real Time Charts
