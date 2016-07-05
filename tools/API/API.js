import delay from './delay'

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

const Gantt = {
	data: [{
		id: "E25",
		text: "LOTE M4",
		progress: 0,
		dirty: "false",
		open: false,
		start_date: "19/03/2016",
		end_date: "17/05/2016"
	}, {
		id: "E26",
		text: "M1M3",
		progress: 0,
		dirty: "false",
		open: false,
		start_date: "31/12/2015",
		end_date: "29/05/2016"
	}, {
		id: "T26x14",
		text: "Preparação",
		start_date: "31/12/2015",
		end_date: "18/04/2016",
		progress: 0,
		bright: true,
		open: false,
		color: "rgb(255,140,0)",
		parent: "E26"
	}, {
		id: "R26x14",
		text: "Realizado",
		progress: 0,
		start_date: "21/03/2016",
		end_date: "21/03/2016",
		parent: "T26x14",
		color: "rgb(12,255,0)",
		bright: true
	}, {
		id: "T26x15",
		text: "Gabarito",
		start_date: "31/12/2015",
		end_date: "25/04/2016",
		progress: 0,
		bright: false,
		open: false,
		color: "rgb(84,107,47)",
		parent: "E26"
	}, {
		id: "R26x15",
		text: "Realizado",
		progress: 0,
		start_date: "21/03/2016",
		end_date: "21/03/2016",
		parent: "T26x15",
		color: "rgb(12,255,0)",
		bright: true
	}, {
		id: "T26x16",
		text: "Solda",
		start_date: "31/12/2015",
		end_date: "01/05/2016",
		progress: 0,
		bright: true,
		open: false,
		color: "rgb(0,255,0)",
		parent: "E26"
	}, {
		id: "R26x16",
		text: "Realizado",
		progress: 0,
		start_date: "21/03/2016",
		end_date: "21/03/2016",
		parent: "T26x16",
		color: "rgb(12,255,0)",
		bright: true
	}, {
		id: "T26x17",
		text: "Pintura",
		start_date: "31/12/2015",
		end_date: "08/05/2016",
		progress: 0,
		bright: true,
		open: false,
		color: "rgb(64,224,207)",
		parent: "E26"
	}, {
		id: "E28",
		text: "M2M4",
		progress: 0,
		dirty: "false",
		open: false,
		start_date: "31/12/2015",
		end_date: "01/09/2016"
	}, {
		id: "T28x14",
		text: "Preparação",
		start_date: "31/12/2015",
		end_date: "01/05/2016",
		progress: 0,
		bright: true,
		open: false,
		color: "rgb(255,140,0)",
		parent: "E28"
	}, {
		id: "R28x14",
		text: "Realizado",
		progress: 0,
		start_date: "21/03/2016",
		end_date: "21/03/2016",
		parent: "T28x14",
		color: "rgb(12,255,0)",
		bright: true
	}, {
		id: "T28x15",
		text: "Gabarito",
		start_date: "31/12/2015",
		end_date: "01/06/2016",
		progress: 0,
		bright: false,
		open: false,
		color: "rgb(84,107,47)",
		parent: "E28"
	}, {
		id: "R28x15",
		text: "Realizado",
		progress: 0,
		start_date: "21/03/2016",
		end_date: "21/03/2016",
		parent: "T28x15",
		color: "rgb(12,255,0)",
		bright: true
	}, {
		id: "T28x16",
		text: "Solda",
		start_date: "31/12/2015",
		end_date: "01/07/2016",
		progress: 0,
		bright: true,
		open: false,
		color: "rgb(0,255,0)",
		parent: "E28"
	}, {
		id: "R28x16",
		text: "Realizado",
		progress: 0,
		start_date: "25/03/2016",
		end_date: "25/03/2016",
		parent: "T28x16",
		color: "rgb(12,255,0)",
		bright: true
	}]
}

const Obras = [{
	id: 1,
	codigo: "Trans",
	nome: "TransVilmar",
	descricao: "A noite, Vilmar não segue padrões sociais",
	cidade: "New York",
	endereco: "53990-580, Travessa Agostinho Camacho, 1466 - Fidalgo d'Oeste - SC",
	cep: "95320-000",
	cliente_id: 2,
	status: 1,
	user_id: 3,
	locatario_id: 1
}, {
	id: 2,
	codigo: "C02",
	nome: "Cascata cascavel",
	descricao: "Construção desse treco",
	cidade: "Nova Prata - RS",
	endereco: "Rua Capoeiras 22",
	cep: "95320-000",
	cliente_id: 5,
	status: 1,
	user_id: 6,
	locatario_id: 1
}, {
	id: 3,
	codigo: "M4",
	nome: "Marcha Imperial",
	descricao: "Tan Tan Tan,TanTanTan TanTanTan, Tan Tan Tan, TanTanTan TanTan Tan",
	cidade: "Nova Prata - RS",
	endereco: "Rua Capoeiras 22",
	cep: "95320-000",
	cliente_id: 6,
	status: 1,
	user_id: 7,
	locatario_id: 1
}, {
	id: 4,
	codigo: "L5",
	nome: "Obra Legal",
	descricao: "Obra Legal",
	cidade: "Nova Prata",
	endereco: "Rua Capoeiras 22 - Bairro Santa Cruz",
	cep: "95320-000",
	cliente_id: 8,
	status: 1,
	user_id: 10,
	locatario_id: 1
}, {
	id: 5,
	codigo: "T5",
	nome: "Wish you were Potato",
	descricao: "Not Really",
	cidade: "New Silver - BS",
	endereco: "St. Street Baby",
	cep: "59595-595",
	cliente_id: 2,
	status: 1,
	user_id: 3,
	locatario_id: 1
}]
const Etapas = [{
	id: 1,
	codigo: "T1",
	peso: 10234,
	observacao: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi nulla fuga quod sed, tempora quo Alias voluptate tempore libero.",
	obra_id: 1,
	user_id: 3,
	locatario_id: 1
}, {
	id: 2,
	codigo: "T2",
	peso: 10234,
	observacao: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi nulla fuga quod sed, tempora quo Alias voluptate tempore libero.",
	obra_id: 1,
	user_id: 3,
	locatario_id: 1
}, {
	id: 3,
	codigo: "T3",
	peso: 10234,
	observacao: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi nulla fuga quod sed, tempora quo Alias voluptate tempore libero.",
	obra_id: 2,
	user_id: 3,
	locatario_id: 1
}, {
	id: 4,
	codigo: "T4",
	peso: 10234,
	observacao: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi nulla fuga quod sed, tempora quo Alias voluptate tempore libero.",
	obra_id: 2,
	user_id: 3,
	locatario_id: 1
}, {
	id: 5,
	codigo: "T5",
	peso: 10234,
	observacao: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi nulla fuga quod sed, tempora quo Alias voluptate tempore libero.",
	obra_id: 3,
	user_id: 3,
	locatario_id: 1
}, {
	id: 6,
	codigo: "T6",
	peso: 10234,
	observacao: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi nulla fuga quod sed, tempora quo Alias voluptate tempore libero.",
	obra_id: 3,
	user_id: 3,
	locatario_id: 1
}, {
	id: 7,
	codigo: "T7",
	peso: 10234,
	observacao: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi nulla fuga quod sed, tempora quo Alias voluptate tempore libero.",
	obra_id: 4,
	user_id: 3,
	locatario_id: 1
}, {
	id: 8,
	codigo: "T8",
	peso: 10234,
	observacao: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi nulla fuga quod sed, tempora quo Alias voluptate tempore libero.",
	obra_id: 4,
	user_id: 3,
	locatario_id: 1
}, {
	id: 9,
	codigo: "T9",
	peso: 10234,
	observacao: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi nulla fuga quod sed, tempora quo Alias voluptate tempore libero.",
	obra_id: 5,
	user_id: 3,
	locatario_id: 1
}, {
	id: 10,
	codigo: "T10",
	peso: 10234,
	observacao: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi nulla fuga quod sed, tempora quo Alias voluptate tempore libero.",
	obra_id: 5,
	user_id: 3,
	locatario_id: 1
}]

const Cronogramas = [{
	obra_id: 1,
	obra: 'TransVilmar',
	etapa_id: 1,
	etapa: 'T1',
	revisao: 2,
	cronograma: {
		projeto: {
			inicio: '2016-06-27',
			final: '2016-07-12'
		},
		fabricacao: {
			inicio: '2016-08-27',
			final: '2016-09-12'
		},
		expedicao: {
			inicio: '2016-10-27',
			final: '2016-11-12'
		},
		montagem: {
			inicio: '2016-12-27',
			final: '2017-01-12'
		}
	}
}, {
	obra_id: 1,
	obra: 'TransVilmar',
	etapa: 'T2',
	etapa_id: 2,
	revisao: 4,
	cronograma: {
		projeto: {
			inicio: '2016-06-27',
			final: '2016-07-12'
		},
		fabricacao: {
			inicio: '2016-08-27',
			final: '2016-09-12'
		},
		expedicao: {
			inicio: '2016-10-27',
			final: '2016-11-12'
		},
		montagem: {
			inicio: '2016-12-27',
			final: '2017-01-12'
		}
	}
}, {
	obra_id: 2,
	obra: "Cascata cascavel",
	etapa_id: 3,
	etapa: 'T3',
	revisao: 1,
	cronograma: {
		projeto: {
			inicio: '2016-06-27',
			final: '2016-07-12'
		},
		fabricacao: {
			inicio: '2016-08-27',
			final: '2016-09-12'
		},
		expedicao: {
			inicio: '2016-10-27',
			final: '2016-11-12'
		},
		montagem: {
			inicio: '2016-12-27',
			final: '2017-01-12'
		}
	}
}, {
	obra_id: 5,
	obra: "Wish you were Potato",
	etapa_id: 10,
	etapa: 'T8',
	revisao: 0,
	cronograma: {
		projeto: {
			inicio: null,
			final: null
		},
		fabricacao: {
			inicio: null,
			final: null
		},
		expedicao: {
			inicio: null,
			final: null
		},
		montagem: {
			inicio: null,
			final: null
		}
	}
}]

import _memoize from 'lodash/memoize'

class API {

	constructor() {

		this.getGantt = _memoize((u, obra, etapa) => {
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					console.log('Api Gantt');
					resolve(JSON.parse(JSON.stringify(GanttPlan)))
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
				setTimeout(() => {
					console.log('Api Cronos');
					resolve(Object.assign([], Cronos))
				}, delay);
			});
		})

		this.getEtapas = _memoize(id => {
			return new Promise((resolve, reject) => {
				let Etaps = Etapas.filter((e) => e.obra_id === id)
				setTimeout(() => {
					console.log('Api Etapas');
					resolve(Object.assign([], Etaps))
				}, delay);
			});
		})

		this.getAvanco = _memoize((u, o, e, d) => {
			return new Promise((resolve, reject) => {
				console.log('Api Avanco');
				resolve(this.generateRandomChart())
			})
		})

		this.getEntrega = _memoize((u, o, e, d) => {
			return new Promise((resolve, reject) => {
				console.log('Api Entrega');
				resolve(this.generateRandomChart())
			})
		})

	}

	getObras() {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve(Object.assign([], Obras))
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
				resolve(etapa)
		})
	}

	saveGantt(data) {
		return new Promise((resolve, reject) => {
			resolve({
				title: 'Sucesso',
				msg: 'Cronograma salvo com sucesso',
				status: 'success'
			})
		})
	}

	// getAvanco() {
	// 	return new Promise((resolve, reject) => {
	// 		resolve(this.generateRandomChart())
	// 	})
	// }

	// getEntrega() {
	// 	return new Promise((resolve, reject) => {
	// 		resolve(this.generateRandomChart())
	// 	})
	// }

	generateRandomChart() {
		let a = [],
			c = [];
		for (var i = 0; i < 4; i++) {
			a.push(Math.floor(Math.random() * 90 + 10))
		}
		c.push(a)
		return c
	}

}

export default API
