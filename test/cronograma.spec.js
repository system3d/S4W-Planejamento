import CronoController from '../src/controllers/CronoController'
import navService from '../src/Services/navService'
import cache from '../src/Services/cacheService'
import API from '../tools/API/API'

describe("Cronograma Controller", function() {
	let ctrl, $scope;

	let soloCrono = {
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
	}


	beforeEach(inject(function($rootScope, $interval,$timeout) {
		$scope = $rootScope.$new()
		ctrl = new CronoController($scope, new navService(new API(), new cache($interval), $timeout))
	}));

	describe("Constructor", function() {

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

	describe("loadCrono", function() {

		it('Should load the Cronos', (done) => {
			ctrl.loadCrono()
				.then(() => {
					expect(ctrl.Cronogramas.length).toEqual(4)
					expect(ctrl.CronogramasLegacy.length).toEqual(4)
					done()
				})
		});

	});

	describe("sortBy", function() {

		it("Should change de sortBy params", function() {
			ctrl.sortBy('Fabricação', 'inicio')
			expect(ctrl.sort).toEqual({
				param: 'fabricacao.inicio',
				reverse: true,
				literal: 'Fabricação.inicio'
			})
		});

	});

	describe("setFilters", function() {

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

	describe("Datepicker Emit", function() {

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

	});

	describe("resetCrono", function() {

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

	});

	describe("updateLegacy", function() {

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

	});

	describe("resetTouched", function() {

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

	});

	describe("augmentRevision", function() {

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

	describe("changeReturned", function() {

		it("Should return the revision to the one that is passed", function() {
			ctrl.Cronogramas.push({
				touched: true,
				revisao: 2,
				etapa_id: 1,
				param: 'actual'
			})
			let oldRevision = {
				touched: false,
				revisao: 1,
				etapa_id: 1,
				param: 'old'
			}
			ctrl.changeReturned(oldRevision)
			expect(ctrl.Cronogramas.length).toBe(1)
			expect(ctrl.Cronogramas[0].param).toEqual('old')
		});

	});

	describe("changeReturnedLegacy", function() {

		it("Should return the revision(legacy) to the one that is passed", function() {
			ctrl.CronogramasLegacy.push({
				touched: true,
				revisao: 2,
				etapa_id: 1,
				param: 'actual'
			})
			let oldRevision = {
				touched: false,
				revisao: 1,
				etapa_id: 1,
				param: 'old'
			}
			ctrl.changeReturnedLegacy(oldRevision)
			expect(ctrl.CronogramasLegacy.length).toBe(1)
			expect(ctrl.CronogramasLegacy[0].param).toEqual('old')
		});

	});

});

class mockApi {
	constructor() {
		this.teste = null
	}

	saveRevision(value) {
		return new Promise((resolve) => {
			this.teste = value
			resolve(true)
		})
	}

	returnRevision(value) {
		return new Promise((resolve) => {
			this.teste = value
			resolve(true)
		})
	}

	flags() {
		return 'flag'
	}
}

describe("cronoController with Mock API", function() {
	let ctrl, $scope;

	beforeEach(inject(function($rootScope) {
		$scope = $rootScope.$new()
		ctrl = new CronoController($scope, new mockApi())
	}));

	describe("sendRevisao", function() {

		it('Should Send the Revision', (done) => {
			ctrl.Cronogramas.push({
				touched: true,
				revisao: 2,
				etapa_id: 1
			})
			ctrl.sendRevisao()
				.then(() => {
					expect(ctrl.navService.teste).toEqual([{
						touched: true,
						revisao: 2,
						etapa_id: 1
					}])
					done()
				})
		});

	});

	describe("sendReturnRevision", function() {

		it('Should call returnRevision', (done) => {
			ctrl.sendReturnRevision('teste')
				.then(() => {
					expect(ctrl.navService.teste).toEqual('teste')
					done()
				}).catch(x => {
					console.log(x);
					done()
				})
		});

	});

});
