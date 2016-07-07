export default class navService {
	/*@ngInject*/
	constructor(API) {
		this.obra = {
			id: 0
		}
		this.etapa = {
			id: 0
		}
		this.cronoUpdate = 0
		this.ganttUpdate = 0
		this.entregaUpdate = 0
		this.avancoUpdate = 0
		this.date = {}
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

	getDates() {
		return this.date
	}

	setDate(date) {
		this.date = date
	}

	getUpdate(which) {
		let base = this.obra.id.toString() + this.etapa.id.toString()
		switch (which) {
			case 'cronos':
				return this.cronoUpdate
			case 'gantt':
				return base + this.ganttUpdate.toString()
			case 'avanco':
				return base + this.date.start + this.date.end + this.avancoUpdate.toString()
			case 'entrega':
				return base + this.date.start + this.date.end + this.entregaUpdate.toString()
			default:
				return base
		}
	}

	getGantt(retry) {
		if (retry) {
			this.ganttUpdate++
		}
		return new Promise((resolve, reject) => {
			this.API.getGantt(this.getUpdate('gantt'), this.obra.id, this.etapa.id)
				.then(data => {
					resolve(data.data)
				})
				.catch(err => {
					reject(err)
				})
		})
	}

	saveGantt(data) {
		return new Promise((resolve, reject) => {
			this.API.saveGantt(data)
				.then(r => {
					this.ganttUpdate++
						this.cronoUpdate++
						resolve(r.data)
				})
				.catch(err => {
					reject(err)
				})
		})
	}

	getAvanco(retry) {
		if (retry) {
			this.avancoUpdate++
		}
		return new Promise((resolve, reject) => {
			this.API.getAvanco(this.getUpdate('avanco'), this.obra.id, this.etapa.id, this.date)
				.then(data => {
					let res = data.data.map(d => parseInt(d))
					resolve(res)
				})
				.catch(err => reject(err))
		})
	}

	getEntrega(retry) {
		if (retry) {
			this.entregaUpdate++
		}
		return new Promise((resolve, reject) => {
			this.API.getEntrega(this.getUpdate('entrega'), this.obra.id, this.etapa.id, this.date)
				.then(data => {
					let res = data.data.map(d => parseInt(d))
					resolve(res)
				})
				.catch(err => reject(err))
		})
	}

	getObras() {
		return new Promise((resolve, reject) => {
			this.API.getObras()
				.then(obras => {
					if (obras.data.status == 'success')
						resolve(obras.data.data)
					else
						reject(obras.data.data)
				})
				.catch(err => {
					reject(err)
				})
		})
	}

// TODO: Refactor this fn(getEtapas) to retry on fails
	getEtapas(id) {
		return new Promise((resolve, reject) => {
			this.API.getEtapas(id)
				.then(etapas => {
					if (etapas.data.status == 'success')
						resolve(etapas.data.data)
					else
						reject(etapas.data.data)
				})
				.catch(err => {
					reject(err)
				})
		})
	}

	getCronogramas(retry) {
		if (retry) {
			this.cronoUpdate++
		}
		return new Promise((resolve, reject) => {
			this.API.getCronogramas(this.getUpdate('cronos'))
				.then(cronos => {
					if (cronos.data.status == 'success')
						resolve(cronos.data.data)
					else
						reject(cronos.data.data)
				})
				.catch(err => {
					reject(err)
				})
		})
	}

	flags() {
		return this.flag
	}

	setFlags(obra, etapa, dates = null) {
		this.obra = obra
		if (!etapa) {
			etapa = {
				id: 0
			}
		}
		this.etapa = etapa
		if (dates)
			this.date = dates
		this.flag = this.obra.id.toString() + 'x' + this.etapa.id.toString() + 'x' + this.date.start + 'x' + this.date.end
	}

	saveRevision(cronos) {
		return new Promise((resolve, reject) => {
			this.API.saveCronos(cronos).then(() => {
				this.cronoUpdate++
				this.ganttUpdate++
				this.avancoUpdate++
				this.entregaUpdate++
					resolve(true)
			}).catch(e => {
				reject(e)
			})
		})
	}

	returnRevision(etapa_id) {
		return new Promise((resolve, reject) => {
			this.API.returnRevision(etapa_id).then((novaEtapa) => {
				this.cronoUpdate++
				this.ganttUpdate++
				this.avancoUpdate++
				this.entregaUpdate++
					resolve(novaEtapa.data.data)
			}).catch(e => {
				reject(e)
			})
		})
	}

}

navService.$inject = ['API']
