import delay from './delay'

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
			final: '2016-079-12'
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
			final: '2016-079-12'
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
			final: '2016-079-12'
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
	obra_id: 3,
	obra: "Marcha Imperial",
	etapa_id: 5,
	etapa: 'T5',
	revisao: 2,
	cronograma: {
		projeto: {
			inicio: '2016-06-27',
			final: '2016-07-12'
		},
		fabricacao: {
			inicio: '2016-08-27',
			final: '2016-079-12'
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
}]

class API {

	static getObras() {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve(Object.assign([], Obras))
			}, delay);
		});
	}

	static getEtapas(id) {
		return new Promise((resolve, reject) => {
			let Etaps = Etapas.filter((e) => e.obra_id === id)
			setTimeout(() => {
				resolve(Object.assign([], Etaps))
			}, delay);
		});
	}

	static getCronogramas(o, e) {
		return new Promise((resolve, reject) => {
			let Cronos;
			if (e != 0)
				Cronos = Cronogramas.filter((c) => c.etapa_id === e)
			else if (o != 0)
				Cronos = Cronogramas.filter((c) => c.obra_id === o)
			else
				Cronos = Cronogramas
			setTimeout(() => {
				resolve(Object.assign([], Cronos))
			}, delay);
		});
	}

}

export default API
