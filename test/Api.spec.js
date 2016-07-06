import APIService from '../src/Services/APIService'

describe('API Service', () => {
	let api, $httpBackend;
	window.theme_hash = 'SXNndlVXeVI3RUlWUWMzcUtVbHc1UGpFQlhaMWFaQXpJRDduQ0Zlb1d6ZUhDT21BeHRZVWZiNEl3Z1lM'

	beforeEach(inject(function($http, $location, _$httpBackend_,$window) {
		const baseMeiaQuatro = {
			decode(v){
				return v
			}
		}
		api = new APIService($http, $location,$window, baseMeiaQuatro);

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

			api.getGantt(1,2,3)
				.then(data => {
					expect(data.data).toEqual('Gantt Data')
				})
			$httpBackend.flush();
		})
	})

})
