import MainController from '../src/controllers/MainController'
import navService from '../src/Services/navService'
import API from '../tools/API/API'

describe('MainController', () => {
	let ctrl, $location, $scope;

	// beforeEach(function() {
	//   jasmineEventually.setup();
	// });

	beforeEach(inject(function($rootScope) {
		$location = {
			absUrl: () => {
				return ''
			}
		}
		$scope = $rootScope.$new()
		ctrl = new MainController($location, $scope, new navService(new API()), $rootScope);

	}));

	describe("Constructor", function() {

		it('Should Initialize stuff', () => {
			expect(ctrl.active).toBe('cronograma');
			expect(ctrl.obra).toEqual({
				'id': 0,
				'nome': 'Todas'
			})
			expect(ctrl.etapa).toEqual({
				'id': 0,
				'nome': 'Todas'
			})
		});

	});

	describe("changeActive", function() {

		it("Should change the active page", () => {
			ctrl.changeActive('gantt')
			expect(ctrl.active).toBe('gantt')
		});

	});

	describe("loadObras", function() {

		it("Should load the Obras", function(done) {
			ctrl.loadObras()
				.then(() => {
					expect(ctrl.Obras.length).toEqual(6)
					done()
				})
		})

	});

	describe("loadEtapas", function() {

		it("Should load the Etapas", function(done) {
			ctrl.loadEtapas(1)
				.then(() => {
					expect(ctrl.Etapas.length).toEqual(3)
					done()
				})
		})

	});

});
