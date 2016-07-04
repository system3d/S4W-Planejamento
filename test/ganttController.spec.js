import GanttController from '../src/controllers/GanttController'

describe("Chart Controllers", () => {
	let ctrl, $scope;

	class mockNavServiceGantt {
		constructor() {
			this.teste = null
			this.teste2 = null
		}

		flags() {
				return this.teste
		}

		setTeste(){
			this.teste = Math.floor(Math.random() * 90 + 10)
		}

		getGantt() {
			return new Promise((resolve) => {
				this.teste = {data:'GETGANTT'}
				resolve(this.teste)
			})
		}

	}


	beforeEach(inject(($rootScope, $interval) => {
		$scope = $rootScope.$new()
		ctrl = new GanttController($scope, new mockNavServiceGantt(), $rootScope)
	}));

  describe("Constructor", () => {

    it('Should call loadGantt', () => {
      expect(ctrl.navService.teste).toEqual({ data: 'GETGANTT' })
    })

		it('Should be listening on rloadGantt', () => {
			spyOn(ctrl, "reloadGantt")
			ctrl.rootScope.$broadcast('rloadGantt', true)
			expect(ctrl.reloadGantt).toHaveBeenCalled()
		})

  })

	describe("loadGantt", () => {

		it('Should Get the Gantt data', () => {
			ctrl.loadGantt()
			.then( data => {
				expect(ctrl.ganttData).toEqual('GETGANTT')
				done()
			})
		})

	})

	describe("reloadGantt", () => {

		it( 'Should Erase the cache and load new data' , (done) => {
			ctrl.rootScope.$on('GanttReload', (e, data) => {
				expect(ctrl.ganttData).toEqual('GETGANTT')
				expect(data).toEqual('GETGANTT')
				done()
			})
			ctrl.reloadGantt()

		})

	})

})
