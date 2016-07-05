import moment from 'moment'

export default class MainController {
	constructor($location, $scope, navService, $rootScope) {
		let activeTemp = $location.absUrl()
		activeTemp = activeTemp.split('/').pop()
		this.active = activeTemp === '' ? 'cronograma' : activeTemp
		this.$rootScope = $rootScope
		this.transSide = 0
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
		this.date = {}
		this.date.start =  moment().format('YYYY-MM-DD')
		this.date.end = 	 moment().add(1,'month').format('YYYY-MM-DD')
		this.navService.setDate(this.date)
		this.loadObras()
		this.load()
		this.$rootScope.$on('$stateChangeStart', (evt, toState, toParams, fromState) => {
			(this.getOrder(fromState.name) > this.getOrder(toState.name)) ? this.transSide = 1 : this.transSide = 0
		});
	}

	changeActive(n) {
		this.active = n
	}

	getOrder(page) {
		switch (page) {
			case 'home':
				return 0
			case 'cronograma':
				return 1
			case 'gantt':
				return 2
			case 'avanco':
				return 3
			case 'entrega':
				return 4
			default:
				return 0
		}
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
						if(this.Etapas[0].id !== 0){
							this.Etapas.unshift({
								'id': 0,
								'codigo': 'Todas'
							});
						}
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

MainController.$inject = ['$location', '$scope', 'navService', '$rootScope']

// TODO: Loading pre-Bootstrap
// TODO: Make Chasrts dynamic(labels, series and data coming from back-end)
