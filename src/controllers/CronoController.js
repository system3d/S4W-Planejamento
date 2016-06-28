export default class CronoController {
	constructor($scope, navService) {
		this.$scope = $scope
		this.navService = navService
		this.Cronogramas = []
		this.filter = {}
		this.$scope.$watch(
			() => {
				return this.navService.flags()
			},
			() => {
				if (this.Cronogramas.length < 1)
					this.loadCrono()
				this.setFilters()
			}, true);

		this.$scope.$on('bdDatepickerChanged', (e, row) => {
			this.Cronogramas.forEach(c => {
				if (c.etapa_id === row)
					c.touched = true
			})
		})
	}

	loadCrono() {
		return new Promise((resolve, reject) => {
			this.navService.getCronogramas()
				.then(cronos => {
					this.Cronogramas = cronos;
					this.$scope.$digest()
					resolve(true)
				}).catch(err => {
					reject(err)
				})
		})
	}

	setFilters() {
		let tObra = this.navService.getObra()
		let tEtapa = this.navService.getEtapa()
		if (tObra.id > 0)
			this.filter.obra = tObra.id
		else
			delete this.filter.obra

		if (tEtapa.id > 0)
			this.filter.etapa = tEtapa.id
		else
			delete this.filter.etapa
	}
}

CronoController.$inject = ['$scope', 'navService']
