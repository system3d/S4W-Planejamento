import CronoController from '../src/controllers/CronoController'
import navService from '../src/Services/navService'
import API from '../tools/API/API'

describe("Cronograma Controller", function() {
	let ctrl, $location, $scope;


	beforeEach(inject(function($rootScope) {
		$scope = $rootScope.$new()
		ctrl = new CronoController($scope, new navService(API, $scope))
	}));

	it('Should load the Cronos', (done) => {
		ctrl.navService.setObra({
			id: 1
		})
		ctrl.loadCrono()
			.then(() => {
				expect(ctrl.Cronogramas.length).toEqual(4)
				done()
			})
	});

	describe("Initial Functions", function() {

		beforeEach(() => {
			spyOn(ctrl, 'loadCrono');
			spyOn(ctrl, 'setFilters');
			ctrl.navService.setFlags({
				id: 1
			}, {
				id: 1
			})
			ctrl.$scope.$digest()
		});

		it('Should Trigger loadCronos', () => {
			expect(ctrl.loadCrono).toHaveBeenCalled()
		});

		it("Should Trigger setFilters", function() {
			expect(ctrl.setFilters).toHaveBeenCalled()
		});

	});

	it("Should Set the Filters", function(done) {
		ctrl.navService.setObra({
			id: 1
		})
		ctrl.setFilters()
		expect(ctrl.filter.obra).toEqual(1)
		done();
	});

	it('Should Reset the Filters', function() {
		ctrl.navService.setFlags({
			id: 1
		}, {
			id: 1
		})
		ctrl.setFilters()
		expect(ctrl.filter).toEqual({
			obra: 1,
			etapa: 1
		})
		ctrl.navService.setFlags({
			id: 0
		}, {
			id: 0
		})
		ctrl.setFilters()
		expect(ctrl.filter).toEqual({})
	})

});
