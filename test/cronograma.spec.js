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
				expect(ctrl.CronogramasLegacy.length).toEqual(4)
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

	it('Should ~touch~ a cronograma on the emit', function() {
		let subScope = $scope.$new()
		ctrl.Cronogramas.push({
			touched: false,
			etapa_id: 1
		})
		ctrl.Cronogramas.push({
			touched: false,
			etapa_id: 2
		})
		subScope.$emit('bdDatepickerChanged', 1);
		expect(ctrl.Cronogramas[0].touched).toBeTruthy()
		expect(ctrl.Cronogramas[1].touched).toBeFalsy()
	})

	it('Should reset back the Cronogramas', () => {
		ctrl.Cronogramas.push({
			touched: true,
			obra_id: 1
		})
		ctrl.CronogramasLegacy.push({
			touched: true,
			obra_id: 1
		})
		let param = ctrl.Cronogramas
		ctrl.Cronogramas = {
			x: 'Objeto todo Errado'
		}
		ctrl.resetCrono()
		expect(ctrl.Cronogramas).toEqual(param)
		expect(ctrl.touched).toBeFalsy()
	});

	it('Should Update legacy', () => {
		ctrl.Cronogramas.push({
			touched: true,
			obra_id: 1
		})
		ctrl.CronogramasLegacy.push({
			touched: true,
			obra_id: 1
		})
		ctrl.Cronogramas[0].obra_id = 850
		ctrl.updateLegacy()
		expect(ctrl.CronogramasLegacy[0].obra_id).toEqual(850)
	});

	it('Should Reset the Toucheds', () => {
		ctrl.Cronogramas.push({
			touched: true,
			revisao: 1
		})
		ctrl.Cronogramas.push({
			touched: false,
			revisao: 2
		})
		ctrl.resetToucheds()
		let reseted = true
		ctrl.Cronogramas.forEach(c => {
			if (c.touched)
				reseted = false
		})
		expect(reseted).toBeTruthy()
		expect(ctrl.Cronogramas[0].touched).toBeFalsy()
	});

	it("Should Augment the Revision", function() {
		ctrl.Cronogramas.push({
			touched: true,
			revisao: 1
		})
		ctrl.Cronogramas.push({
			touched: false,
			revisao: 2
		})
		ctrl.augmentRevision()
		expect(ctrl.Cronogramas[0].revisao).toEqual(2)
		expect(ctrl.Cronogramas[1].revisao).toEqual(2)
	});

});
