import AvancoController from '../src/controllers/AvancoController'
import EntregaController from '../src/controllers/EntregaController'

describe("Chart Controllers", () => {
	let ctrl, $scope;

	class mockNavService {
		constructor() {
			this.teste = null
		}

		getAvanco() {
			return new Promise((resolve) => {
				this.teste = 'avanco'
				resolve(true)
			})
		}

		getEntrega() {
			return new Promise((resolve) => {
				this.teste = 'entrega'
				resolve(true)
			})
		}
	}

	describe("Avanco Controller", () => {

		beforeEach(inject(($rootScope, $interval) => {
			$scope = $rootScope.$new()
			ctrl = new AvancoController($scope, new mockNavService())
		}));

		it('Should get the chart Avanco data', () => {
			ctrl.loadData()
			expect(ctrl.navService.teste).toEqual('avanco')
		});

	})

	describe("Entrega Controller", () => {

		beforeEach(inject(($rootScope, $interval) => {
			$scope = $rootScope.$new()
			ctrl = new EntregaController($scope, new mockNavService())
		}));

		it('Should get the chart Avanco data', () => {
			ctrl.loadData()
			expect(ctrl.navService.teste).toEqual('entrega')
		});

	})


})
