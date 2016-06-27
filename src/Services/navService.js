import API from '../../tools/API/API'

export default class navService {

	constructor(API) {
		this.obra = {
			id: 0
		}
		this.etapa = {
			id: 0
		}
		this.flag = 0
		this.API = API
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
			API.getObras()
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
			API.getEtapas(id)
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
			if (this.obra && this.etapa) {
				API.getCronogramas(this.obra.id, this.etapa.id)
					.then(cronos => {
						if (cronos.length > 0)
							resolve(cronos)
						else
							resolve(null)
					})
					.catch(err => {
						reject(err)
					})
			} else {
				reject('No Obra or Etapa')
			}
		})
	}

	flags() {
		return this.flag
	}

	setFlags(obra, etapa) {
		this.obra = obra
		if(!etapa){
			etapa = {
				id: 0
			}
		}
		this.etapa = etapa
		this.flag = this.obra.id.toString() + 'x' + this.etapa.id.toString()
	}

}

navService.$inject = []
