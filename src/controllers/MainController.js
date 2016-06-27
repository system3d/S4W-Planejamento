export default class MainController {
	constructor($location, $scope, navService) {
		let activeTemp = $location.absUrl()
		activeTemp = activeTemp.split('/').pop()
		this.active = activeTemp === '' ? 'home' : activeTemp
		this.obra = {
			'id': 0,
			'nome': 'Todas'
		}
		this.etapa = {
			'id': 0,
			'nome': 'Todas'
		}
		this.Obras = []
		this.$scope = $scope
		this.navService = navService
		this.loadObras()
		this.load()
	}

	changeActive(n) {
		this.active = n
	}

	obraChanged() {
		if (this.obra.id > 0)
			this.loadEtapas(this.obra.id)
		else {
			this.Etapas = null
			this.etapa = {
				'id': 0,
				'nome': 'Todas'
			}
		}
	}

	loadObras() {
		return new Promise((resolve, reject) => {
			this.navService.getObras()
				.then(obras => {
					this.Obras = obras
					this.Obras.unshift({
						'id': 0,
						'nome': 'Todas'
					});
					this.obra = this.Obras[0]
					this.$scope.$digest()
					resolve(true)
				})
				.catch(err => {
					reject(err)
				})
		})
	}

	loadEtapas(id) {
		return new Promise((resolve, reject) => {
			if (id !== 0) {
				this.navService.getEtapas(id)
					.then(etapas => {
						this.Etapas = etapas
						this.Etapas.unshift({
							'id': 0,
							'codigo': 'Todas'
						});
						this.etapa = this.Etapas[0]
						this.$scope.$digest()
						resolve(true)
					})
					.catch(err => {
						reject(err)
					})
			}
		})
	}

	load() {
		if (this.obra)
			this.navService.setFlags(this.obra, this.etapa)
	}
}

MainController.$inject = ['$location', '$scope', 'navService']
