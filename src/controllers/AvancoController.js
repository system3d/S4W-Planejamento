export default class AvancoController {
	/*@ngInject*/
	constructor($scope, navService, $timeout) {
		this.$scope = $scope
		this.navService = navService

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
			}],

			title: {
				text: 'Gráfico de Avanço - Planejamento'
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
		this.navService.getAvanco()
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

AvancoController.$inject = ['$scope', 'navService', '$timeout']


// TODO: Fucking Load on Gantt Save is fucking fucked, fix that shit
// TODO: Cookie or some oher shit to open/close gantt tree
// TODO: Backend returnRevision fucked as well(line 546 undefined index: id) ~ (Maybe it`s the wrong obj format, most certainly)
// TODO: Re-Arrange Backend Returns
