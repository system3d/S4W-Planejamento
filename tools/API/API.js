import delay from './delay'

const Obras = {
	"status": '200',
	"data": {
		"status": "success",
		"data": [{
			id: 1,
			nome: "TransVilmar"
		}, {
			id: 2,
			nome: "Cascata cascavel"
		}, {
			id: 3,
			nome: "Marcha Imperial"
		}, {
			id: 4,
			nome: "Obra Legal"
		}, {
			id: 5,
			nome: "Wish you were Potato"
		}]
	}
}

const GanttPlan = {
	data: [{
		id: "O2",
		text: "Robson",
		start_date: "28/06/2016",
		end_date: "06/10/2016",
		progress: 0,
		open: false,
		color: "#052DD9"
	}, {
		id: "E1",
		text: "Romario",
		progress: 0,
		dirty: "false",
		open: true,
		start_date: "28/06/2016",
		end_date: "06/10/2016",
		parent: "O2"
	}, {
		id: "T698",
		text: "Projeto",
		progress: 0,
		start_date: "28/06/2016",
		end_date: "27/07/2016",
		parent: "E1",
		color: "#289A00"
	}, {
		id: "R698",
		text: "Realizado",
		progress: 0,
		start_date: "05\/07\/2016",
		end_date: "25\/07\/2016",
		parent: "T698",
		color: "#0CFF00 "
	}, {
		id: "T699",
		text: "Fabrica\u00e7\u00e3o",
		progress: 0,
		start_date: "28/07/2016",
		end_date: "06/08/2016",
		parent: "E1",
		color: "#A200FF"
	}, {
		id: "T700",
		text: 'Expedi\u00e7\u00e3o',
		progress: 0,
		start_date: "07/08/2016",
		end_date: "23/08/2016",
		parent: "E1",
		color: "#A70000"
	}, {
		id: "T701",
		text: "Montagem",
		progress: 0,
		start_date: "10/09/2016",
		end_date: "06/10/2016",
		parent: "E1",
		color: "#008977"
	}]
}

const ObrasB = {
	status: "success",
	data: [{
		id: 1,
		nome: "TransVilmar"
	}, {
		id: 2,
		nome: "Cascata cascavel"
	}, {
		id: 3,
		nome: "Marcha Imperial"
	}, {
		id: 4,
		nome: "Obra Legal"
	}, {
		id: 5,
		nome: "Wish you were Potato"
	}]
}

const Etapas = {
	status: "success",
	data: [{
		id: 1,
		codigo: "T1",
		obra_id: 1
	}, {
		id: 2,
		codigo: "T2",
		obra_id: 1
	}, {
		id: 3,
		codigo: "T3",
		obra_id: 2
	}, {
		id: 4,
		codigo: "T4",
		obra_id: 2
	}, {
		id: 5,
		codigo: "T5",
		obra_id: 3
	}, {
		id: 6,
		codigo: "T6",
		obra_id: 3
	}, {
		id: 7,
		codigo: "T7",
		obra_id: 4
	}, {
		id: 8,
		codigo: "T8",
		obra_id: 4
	}, {
		id: 9,
		codigo: "T9",
		obra_id: 5
	}, {
		id: 10,
		codigo: "T10",
		obra_id: 5
	}]
}

const Cronogramas = [{
	obra_id: 1,
	obra: 'TransVilmar',
	etapa_id: 1,
	etapa: 'T1',
	revisao: 2,
	cronograma: [{
		'inicio': '2016-06-27',
		'final': '2016-07-12',
		'id': 1,
		'nome': 'Projeto'
	}, {
		'inicio': '2016-08-27',
		'final': '2016-09-12',
		'id': 2,
		'nome': 'Fabricação'
	}, {
		'inicio': '2016-10-27',
		'final': '2016-11-12',
		'id': 3,
		'nome': 'Expedição'
	}, {
		'inicio': '2016-12-27',
		'final': '2017-01-12',
		'id': 4,
		'nome': 'Montagem'
	}]
}, {
	obra_id: 1,
	obra: 'TransVilmar',
	etapa: 'T2',
	etapa_id: 2,
	revisao: 4,
	cronograma: [{
		'inicio': '2016-06-27',
		'final': '2016-07-12',
		'id': 1,
		'nome': 'Projeto'
	}, {
		'inicio': '2016-08-27',
		'final': '2016-09-12',
		'id': 2,
		'nome': 'Fabricação'
	}, {
		'inicio': '2016-10-27',
		'final': '2016-11-12',
		'id': 3,
		'nome': 'Expedição'
	}, {
		'inicio': '2016-12-27',
		'final': '2017-01-12',
		'id': 4,
		'nome': 'Montagem'
	}]
}, {
	obra_id: 2,
	obra: "Cascata cascavel",
	etapa_id: 3,
	etapa: 'T3',
	revisao: 1,
	cronograma: [{
		'inicio': '2016-06-27',
		'final': '2016-07-12',
		'id': 1,
		'nome': 'Projeto'
	}, {
		'inicio': '2016-08-27',
		'final': '2016-09-12',
		'id': 2,
		'nome': 'Fabricação'
	}, {
		'inicio': '2016-10-27',
		'final': '2016-11-12',
		'id': 3,
		'nome': 'Expedição'
	}, {
		'inicio': '2016-12-27',
		'final': '2017-01-12',
		'id': 4,
		'nome': 'Montagem'
	}]
}, {
	obra_id: 5,
	obra: "Wish you were Potato",
	etapa_id: 10,
	etapa: 'T8',
	revisao: 0,
	cronograma: [{
		'inicio': null,
		'final': null,
		'id': 1,
		'nome': 'Projeto'
	}, {
		'inicio': null,
		'final': null,
		'id': 2,
		'nome': 'Fabricação'
	}, {
		'inicio': null,
		'final': null,
		'id': 3,
		'nome': 'Expedição'
	}, {
		'inicio': null,
		'final': null,
		'id': 4,
		'nome': 'Montagem'
	}]
}]

import _memoize from 'lodash/memoize'

class API {

	constructor() {

		this.getGantt = _memoize((u, obra, etapa) => {
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					console.log('Api Gantt');
					let Gat = {
						"status": '200',
						"data": GanttPlan
					}
					resolve(JSON.parse(JSON.stringify(Gat)))
				}, delay);
			})
		})

		this.getCronogramas = _memoize((u) => {
			return new Promise((resolve, reject) => {
				let Cronos = []
				let ids = []
				Cronogramas.forEach(c => {
					if (ids.indexOf(c.etapa_id) === -1) {
						Cronos.push(c)
						ids.push(c.etapa_id)
					} else {
						if (c.revisao > Cronos[ids.indexOf(c.etapa_id)].revisao) {
							Cronos.splice(ids.indexOf(c.etapa_id), 1)
							Cronos.push(c)
						}
					}
				})
				let Cro = {
					"status": '200',
					"data": {
						"status": "success",
						"data": Cronos
					}
				}
				setTimeout(() => {
					console.log('Api Cronos');
					resolve(Object.assign([], Cro))
				}, delay);
			});
		})

		this.getEtapas = _memoize(id => {
			return new Promise((resolve, reject) => {
				let Etaps = Etapas.data.filter((e) => e.obra_id === id)
				let Eta = {
					"status": '200',
					"data": {
						"status": "success",
						"data": Etaps
					}
				}
				setTimeout(() => {
					console.log('Api Etapas');
					resolve(JSON.parse(JSON.stringify(Eta)))
				}, delay);
			});
		})

		this.getAvanco = _memoize((u, o, e, d) => {
			return new Promise((resolve, reject) => {
				console.log('Api Avanco');
				let Cha = {
					"status": '200',
					"data": this.generateRandomChart()
				}
				resolve(Cha)
			})
		})

		this.getEntrega = _memoize((u, o, e, d) => {
			return new Promise((resolve, reject) => {
				console.log('Api Entrega');
				let Cha = {
					"status": '200',
					"data": this.generateRandomChart()
				}
				resolve(Cha)
			})
		})

	}

	getObras() {
		return new Promise((resolve, reject) => {
			console.log('Api Obras');
			setTimeout(() => {
				resolve(JSON.parse(JSON.stringify(Obras)))
			}, delay);
		});
	}

	// getEtapas(id) {
	// 	return new Promise((resolve, reject) => {
	// 		let Etaps = Etapas.filter((e) => e.obra_id === id)
	// 		setTimeout(() => {
	// 			resolve(Object.assign([], Etaps))
	// 		}, delay);
	// 	});
	// }

	// getCronogramas(o, e) {
	// 	return new Promise((resolve, reject) => {
	// 		let Cronos = []
	// 		let ids = []
	// 		Cronogramas.forEach(c => {
	// 			if (ids.indexOf(c.etapa_id) === -1) {
	// 				Cronos.push(c)
	// 				ids.push(c.etapa_id)
	// 			} else {
	// 				if (c.revisao > Cronos[ids.indexOf(c.etapa_id)].revisao) {
	// 					Cronos.splice(ids.indexOf(c.etapa_id), 1)
	// 					Cronos.push(c)
	// 				}
	// 			}
	// 		})
	// 		setTimeout(() => {
	// 			resolve(Object.assign([], Cronos))
	// 		}, delay);
	// 	});
	// }

	saveCronos(cronos) {
		return new Promise((resolve, reject) => {
			cronos.forEach(crono => {
				Cronogramas.push(crono)
			})
			resolve(true)
		})
	}

	returnRevision(etapa_id) {
		return new Promise((resolve, reject) => {
			let etapa = Cronogramas.filter(c => c.etapa_id === etapa_id)[0]
			etapa.revisao--
				resolve({
					data: {
						data: etapa,
						status: 'success'
					}
				})
		})
	}

	saveGantt(data) {
		return new Promise((resolve, reject) => {
			resolve({
				data: {
					data: 'Cronograma salvo com sucesso',
					status: 'success'
				}
			})
		})
	}

	generateRandomChart() {
		let a = [],
			b = [],
			c = []
		for (var i = 0; i < 4; i++) {
			a.push(Math.floor(Math.random() * 90 + 10))
			b.push(Math.floor(Math.random() * 90 + 10))
		}
		return {
			plan: a,
			real: b
		}
	}

}

export default API
