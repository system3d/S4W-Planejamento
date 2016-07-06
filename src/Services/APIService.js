import _memoize from 'lodash/memoize'

export default class APIService {
	/*@ngInject*/
	constructor($http, $location, $window, base64) {
		this.$http = $http
		this.baseUrl = $location.protocol() + "://" + location.host + '/'
		this.Decoder = base64
		this.$window = $window
		this.token = this.Decoder.decode(this.$window.theme_hash).split('').reverse().join('')
		this.getGantt = _memoize((u, obra, etapa) => {
			return this.$http({
				url: this.baseUrl + 'planejamento/getGantt',
				method: "POST",
				data: {
					'obra_id': obra,
					'etapa_id': etapa,
					'api_token': this.token
				}
			})
		})

		this.getCronogramas = _memoize((u) => { // eslint-disable-line no-unused-vars
			return this.$http({
				url: this.baseUrl + 'planejamento/getCrono',
				method: "POST",
				data: {
					'api_token': this.token
				}
			})
		})

		this.getEtapas = _memoize((id) => {
			return this.$http({
				url: this.baseUrl + 'planejamento/getEtapas',
				method: "POST",
				data: {
					'obra_id': id,
					'api_token': this.token
				}
			})
		})

		this.getAvanco = _memoize((u, o, e, d) => {
			return this.$http({
				url: this.baseUrl + 'planejamento/getAvanco',
				method: "POST",
				data: {
					'obra_id': o,
					'etapa_id': e,
					'date': d,
					'api_token': this.token
				}
			})
		})

		this.getEntrega = _memoize((u, o, e, d) => {
			return this.$http({
				url: this.baseUrl + 'planejamento/getEntrega',
				method: "POST",
				data: {
					'obra_id': o,
					'etapa_id': e,
					'date': d,
					'api_token': this.token
				}
			})
		})

	}

	getObras() {
		return this.$http({
			url: this.baseUrl + 'planejamento/getObras',
			method: "POST",
			data: {
				'api_token': this.token
			}
		})
	}

	saveCronos(cronos) {
		return this.$http({
			url: this.baseUrl + 'planejamento/saveCronos',
			method: "POST",
			data: {
				'cronos': cronos,
				'api_token': this.token
			}
		})
	}

	returnRevision(etapa_id) {
		return this.$http({
			url: this.baseUrl + 'planejamento/returnRevision',
			method: "POST",
			data: {
				'etapa_id': etapa_id,
				'api_token': this.token
			}
		})
	}

	saveGantt(data) {
		return this.$http({
			url: this.baseUrl + 'planejamento/saveGantt',
			method: "POST",
			data: {
				'gantt': data,
				'api_token': this.token
			}
		})
	}

}

APIService.$inject = ["$http", "$location", "$window", 'base64']

// TODO: Get Tokerino
