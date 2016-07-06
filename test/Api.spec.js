import APIService from '../src/Services/APIService'

describe('API Service', () => {
	let api, $httpBackend;
	window.theme_hash = 'SXNndlVXeVI3RUlWUWMzcUtVbHc1UGpFQlhaMWFaQXpJRDduQ0Zlb1d6ZUhDT21BeHRZVWZiNEl3Z1lM'

	beforeEach(inject(function($http, $location, _$httpBackend_, $window) {
		const baseMeiaQuatro = {
			decode(v) {
				return v
			}
		}
		api = new APIService($http, $location, $window, baseMeiaQuatro);

	}));

	beforeEach(inject(function($injector) {
		$httpBackend = $injector.get('$httpBackend');
	}));

	afterEach(function() {
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	});


	describe("Constructor", () => {
		it('Should Have a $http Service', () => {
			expect(api.$http).toBeDefined()
		})
		it('Should Have a baseUrl', () => {
			expect(api.baseUrl).toBeDefined()
		})
		it('Should Have a token', () => {
			let exp = 'Ml1Z3lENiZWVZRHeB12TDhUZ6d1blZ0QudDRJpXQaFWMahlQFpGU1cHbVtUczMWUWlUR3IVeXVldnNXS'
			expect(api.token).toEqual(exp)
		})
	})

	describe("HTTP Calls", () => {
		it('Should Request Gantt Data', () => {
			$httpBackend.expectPOST(api.baseUrl + 'planejamento/getGantt').respond('Gantt Data');

			api.getGantt(1, 2, 3)
				.then(data => {
					expect(data.data).toEqual('Gantt Data')
				})
			$httpBackend.flush();
		})

		it('Should Request Cronograma Data', () => {
			$httpBackend.expectPOST(api.baseUrl + 'planejamento/getCrono').respond('Crono Data');

			api.getCronogramas(1)
				.then(data => {
					expect(data.data).toEqual('Crono Data')
				})
			$httpBackend.flush();
		})

		it('Should Request Etapa Data', () => {
			$httpBackend.expectPOST(api.baseUrl + 'planejamento/getEtapas').respond('Etapa Data');

			api.getEtapas(1)
				.then(data => {
					expect(data.data).toEqual('Etapa Data')
				})
			$httpBackend.flush();
		})

		it('Should Request Avanco Data', () => {
			$httpBackend.expectPOST(api.baseUrl + 'planejamento/getAvanco').respond('Avanco Data');

			api.getAvanco(1)
				.then(data => {
					expect(data.data).toEqual('Avanco Data')
				})
			$httpBackend.flush();
		})

		it('Should Request Entrega Data', () => {
			$httpBackend.expectPOST(api.baseUrl + 'planejamento/getEntrega').respond('Entrega Data');

			api.getEntrega(1)
				.then(data => {
					expect(data.data).toEqual('Entrega Data')
				})
			$httpBackend.flush();
		})

		it('Should Request Obras Data', () => {
			$httpBackend.expectPOST(api.baseUrl + 'planejamento/getObras').respond('Obras Data');

			api.getObras(1)
				.then(data => {
					expect(data.data).toEqual('Obras Data')
				})
			$httpBackend.flush();
		})

		it('Should Request Save gantt', () => {
			$httpBackend.expectPOST(api.baseUrl + 'planejamento/saveGantt').respond('saveGantt');

			api.saveGantt(1)
				.then(data => {
					expect(data.data).toEqual('saveGantt')
				})
			$httpBackend.flush();
		})

		it('Should Request Save crono', () => {
			$httpBackend.expectPOST(api.baseUrl + 'planejamento/saveCronos').respond('saveCronos');

			api.saveCronos(1)
				.then(data => {
					expect(data.data).toEqual('saveCronos')
				})
			$httpBackend.flush();
		})

		it('Should Request return Revision', () => {
			$httpBackend.expectPOST(api.baseUrl + 'planejamento/returnRevision').respond('returnRevision');

			api.returnRevision(1)
				.then(data => {
					expect(data.data).toEqual('returnRevision')
				})
			$httpBackend.flush();
		})

		describe("Memoizes", () => {

			it('Should Memoize getGantt', () => {
				$httpBackend.expectPOST(api.baseUrl + 'planejamento/getGantt').respond('Gantt Data');

				api.getGantt(1, 2, 3)
					.then(data => {
						expect(data.data).toEqual('Gantt Data')
					})
				$httpBackend.flush()
				api.getGantt(1, 2, 3)
					.then(data => {
						expect(data.data).toEqual('Gantt Data')
					})
			})

			it('Should Memoize cronos', () => {
				$httpBackend.expectPOST(api.baseUrl + 'planejamento/getCrono').respond('Crono Data');

				api.getCronogramas(1)
					.then(data => {
						expect(data.data).toEqual('Crono Data')
					})
				$httpBackend.flush();
				api.getCronogramas(1)
					.then(data => {
						expect(data.data).toEqual('Crono Data')
					})
			})

			it('Should Memoize Etapas', () => {
				$httpBackend.expectPOST(api.baseUrl + 'planejamento/getEtapas').respond('Etapa Data');

				api.getEtapas(1)
					.then(data => {
						expect(data.data).toEqual('Etapa Data')
					})
				$httpBackend.flush();
				api.getEtapas(1)
					.then(data => {
						expect(data.data).toEqual('Etapa Data')
					})
			})

			it('Should Memoize Avanco', () => {
				$httpBackend.expectPOST(api.baseUrl + 'planejamento/getAvanco').respond('Avanco Data');

				api.getAvanco(1)
					.then(data => {
						expect(data.data).toEqual('Avanco Data')
					})
				$httpBackend.flush();
				api.getAvanco(1)
					.then(data => {
						expect(data.data).toEqual('Avanco Data')
					})
			})

			it('Should Memoize Entrega', () => {
				$httpBackend.expectPOST(api.baseUrl + 'planejamento/getEntrega').respond('Entrega Data');

				api.getEntrega(1)
					.then(data => {
						expect(data.data).toEqual('Entrega Data')
					})
				$httpBackend.flush();
				api.getEntrega(1)
					.then(data => {
						expect(data.data).toEqual('Entrega Data')
					})
			})

			it('Should NOT Memoize Obras', () => {
				$httpBackend.expectPOST(api.baseUrl + 'planejamento/getObras').respond('Obras Data');

				api.getObras(1)
					.then(data => {
						expect(data.data).toEqual('Obras Data')
					})
				$httpBackend.flush();
				$httpBackend.expectPOST(api.baseUrl + 'planejamento/getObras').respond('Obras Memo');
				api.getObras(1)
					.then(data => {
						expect(data.data).not.toEqual('Obras Data')
					})
				$httpBackend.flush();
			})

		})

	})
})
