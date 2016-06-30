export default class navService {
	/*@ngInject*/
	constructor(API, Cache) {
		this.obra = {
			id: 0
		}
		this.etapa = {
			id: 0
		}
		this.flag = 0
		this.API = API
		this.Cache = Cache
	}

	setObra(obra) {
		this.obra = obra
	}

	setEtapa(etapa) {
		this.etapa = etapa
	}

	getObra() {
		return this.obra
	}

	getEtapa() {
		return this.etapa
	}

	getObras() {
		return new Promise((resolve, reject) => {
			this.API.getObras()
				.then(obras => {
					if (obras.length > 0)
						resolve(obras)
					else
						resolve(null)
				})
				.catch(err => {
					reject(err)
				})
		})
	}

	getEtapas(id) {
		return new Promise((resolve, reject) => {
			this.API.getEtapas(id)
				.then(etapas => {
					if (etapas.length > 0)
						resolve(etapas)
					else
						resolve(null)
				})
				.catch(err => {
					reject(err)
				})
		})
	}

	getCronogramas() {
		return new Promise((resolve, reject) => {
			this.Cache.get('Cronogramas')
				.then(cronos => {
					if (cronos.length > 0)
						resolve(cronos)
					else
						resolve(null)
				})
				.catch(e => {
					if (!e) {
						this.API.getCronogramas()
							.then(cronos => {
								if (cronos.length > 0) {
									resolve(cronos)
									this.syncCronogramas(cronos)
								} else
									resolve(null)
							})
							.catch(err => {
								reject(err)
							})
					}
				})
		})
	}

	syncCronogramas(cronos) {
		this.Cache.setValue('Cronogramas', cronos)
	}

	flags() {
		return this.flag
	}

	setFlags(obra, etapa) {
		this.obra = obra
		if (!etapa) {
			etapa = {
				id: 0
			}
		}
		this.etapa = etapa
		this.flag = this.obra.id.toString() + 'x' + this.etapa.id.toString()
	}

	saveRevision(cronos) {
		return new Promise((resolve, reject) => {
			this.API.saveCronos(cronos).then(() => {
				resolve(true)
			}).catch(e => {
				reject(e)
			})
		})
	}

	returnRevision(etapa_id) {
		return new Promise((resolve, reject) => {
			this.API.returnRevision(etapa_id).then((novaEtapa) => {
				resolve(novaEtapa)
			}).catch(e => {
				reject(e)
			})
		})
	}

}

navService.$inject = ['API', 'Cache']
