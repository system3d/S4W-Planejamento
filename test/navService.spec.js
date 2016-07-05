import navService from '../src/Services/navService'
import cacheService from '../src/Services/cacheService'
import API from '../tools/API/API'

describe('Navigation Service', () => {
	let nav;

	beforeEach(inject(function($interval) {
		nav = new navService(new API(), new cacheService($interval));
	}));
	describe("get/set Obra", function() {

		it('Should set then get an obra', () => {
			nav.setObra({
				id: 1,
				nome: 'Faroeste Cabloco'
			})
			expect(nav.obra.nome).toBe('Faroeste Cabloco')
			expect(nav.getObra().id).toBe(1)
		});

	});

	describe("get/set Etapa", function() {

		it('Should set then get an etapa', () => {
			nav.setEtapa({
				id: 1,
				codigo: 'DANCE'
			})
			expect(nav.etapa.codigo).toBe('DANCE')
			expect(nav.getEtapa().id).toBe(1)
		});

	});

	describe("getObras", function() {

		it("Should get The obras", function(done) {
			nav.getObras()
				.then(obras => {
					expect(obras.length).toBe(5)
					done()
				})
		});

	});

	describe("getEtapas", function() {

		it("Should get The Etapas", function(done) {
			nav.getEtapas(1)
				.then(etapas => {
					expect(etapas.length).toBe(2)
					done()
				})
		});

	});

	describe("getCronogramas", function() {

		it("Should get all Cronogramas", function(done) {
			nav.getCronogramas()
				.then(cronos => {
					expect(cronos.length).toBe(4)
					done()
				})
		});


		it("Should get all Cronogramas despite what obra is selected", function(done) {
			nav.setObra({
				id: 1,
				nome: 'Faroeste Cabloco'
			})
			nav.getCronogramas()
				.then(cronos => {
					expect(cronos.length).toBe(4)
					done()
				})
		});

	});

	describe("setFlags/flags", function() {

		it("should set and return the flags", function() {
			let obra = ({
				id: 1,
				nome: 'Faroeste Cabloco'
			})
			let etapa = ({
				id: 1,
				codigo: 'DANCE'
			})
			let date = ({
				start: "1970-01-01",
				end: "1970-01-01"
			})
			nav.setFlags(obra, etapa, date)
			expect(nav.flags()).toBe('1x1x1970-01-01x1970-01-01');
		});

	});

	describe("getAvanco", function() {

		it("Should get the avanco data", function(done) {
			nav.getAvanco()
				.then(data => {
					expect(data.length).toBe(1)
					expect(data[0].length).toBe(4)
					done()
				})
		});

	});

	describe("getEntrega", function() {

		it("Should get the entrega data", function(done) {
			nav.getEntrega()
				.then(data => {
					expect(data.length).toBe(1)
					expect(data[0].length).toBe(4)
					done()
				})
		});

	});

});

describe("navService with MockApi", function() {

	class mockApi {
		constructor() {
			this.teste = null
		}

		saveCronos(value) {
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

	}

	let nav;

	beforeEach(() => {
		nav = new navService(new mockApi());
	});

	describe("saveRevision", function() {

		it("Should Send the cronos to be saved", function(done) {
			nav.saveRevision({
					id: 1,
					crono: 'lindão'
				})
				.then(() => {
					expect(nav.API.teste).toEqual({
						id: 1,
						crono: 'lindão'
					})
					done()
				})
		});

	});

	describe("returnRevision", function() {

		it("Should send the revision and get the old one", function(done) {
			nav.returnRevision(1)
				.then(() => {
					expect(nav.API.teste).toBe(1)
					done()
				})
		});

	});

});

// describe("navService with MockCache", function() {
//
// 	class mockCache {
// 		constructor() {
// 			this.teste = null
// 		}
//
// 		setValue(useless, value) {
// 			this.teste = value
// 		}
//
// 	}
//
// 	let nav;
//
// 	beforeEach(() => {
// 		nav = new navService(new API(), new mockCache());
// 	});
//
// 	describe("syncCronogramas", function() {
//
// 		it("Should send the crono to cache", function() {
// 			nav.syncCronogramas('cold winter night')
// 			expect(nav.Cache.teste).toBe('cold winter night')
// 			nav.syncCronogramas('hot summer morning')
// 			expect(nav.Cache.teste).toBe('hot summer morning')
// 		});
//
// 	});
//
// 	describe("syncGantt", () => {
// 		it('Should send the gantt to cache', () => {
// 			nav.syncGantt('cold winter night')
// 			expect(nav.Cache.teste).toBe('cold winter night')
// 			nav.syncGantt('hot summer morning')
// 			expect(nav.Cache.teste).toBe('hot summer morning')
// 		})
// 	})
//
// });

describe("Mock API Cache Normal", () => {

	class mockApi {
		constructor() {
			this.teste = null
			this.update = null
		}

		saveCronos(value) {
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

		getGantt(value, otherValue) {
			return new Promise((resolve) => {
				this.teste = otherValue
				this.update = value
				resolve(true)
			})
		}

		saveGantt(value) {
			return new Promise((resolve) => {
				this.teste = value
				resolve(true)
			})
		}

	}

	let nav;

	beforeEach(inject(function($interval) {
		nav = new navService(new mockApi(), new cacheService($interval));
	}));

	describe("saveGantt", () => {
		it('Should Call Send Gantt', (done) => {
			nav.saveGantt('Test Save GAntt')
				.then(() => {
					expect(nav.API.teste).toEqual('Test Save GAntt')
					done()
				})
		})
	})


	describe("getGantt", () => {

		it('Should call API`s getGantt', (done) => {
			nav.obra = {
				id: 58
			}
			nav.getGantt()
				.then(() => {
					expect(nav.API.teste).toEqual(58)
					expect(nav.API.update).toEqual('5800')
					done()
				})
		})

	})
})
