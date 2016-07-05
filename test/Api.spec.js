import APIService from '../src/Services/APIService'

describe('API Service', () => {
	let api, $httpBackend;

	beforeEach(inject(function($http, $location, _$httpBackend_) {
		api = new APIService($http, $location);
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
