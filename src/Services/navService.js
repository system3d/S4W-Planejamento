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
			case 'date':
				return base + this.date.start + this.date.end
			default:
				return base
		}
	}

	getGantt() {
		return new Promise((resolve, reject) => {
			this.API.getGantt(this.getUpdate('gantt'), this.obra.id, this.etapa.id)
				.then(data => {
					console.log(data.data);
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
						resolve(r)
				})
				.catch(err => {
					reject(err)
				})
		})
	}

	getAvanco() {
		return new Promise((resolve, reject) => {
			this.API.getAvanco(this.getUpdate('date'), this.obra.id, this.etapa.id, this.date)
				.then(data => {
					let res = data.data.map(d => parseInt(d))
					resolve(res)
				})
				.catch(err => reject(err))
		})
	}

	getEntrega() {
		return new Promise((resolve, reject) => {
			this.API.getEntrega(this.getUpdate('date'),this.obra.id, this.etapa.id, this.date)
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
					console.log(obras.data.data);
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

	getEtapas(id) {
		return new Promise((resolve, reject) => {
			this.API.getEtapas(id)
				.then(etapas => {
					console.log(etapas.data.data);
					if (etapas.data.status == 'success')
						resolve(etapas.data.data)
					else
						reject(cronos.data.data)
				})
				.catch(err => {
					reject(err)
				})
		})
	}

	getCronogramas() {
		return new Promise((resolve, reject) => {
			this.API.getCronogramas(this.getUpdate('cronos'))
				.then(cronos => {
					console.log(cronos.data.data);
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
					resolve(novaEtapa)
			}).catch(e => {
				reject(e)
			})
		})
	}

}

navService.$inject = ['API']
