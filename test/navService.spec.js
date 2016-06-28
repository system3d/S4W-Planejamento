import navService from '../src/Services/navService'
import API from '../tools/API/API'

describe('Navigation Service', () => {
	let nav;

	beforeEach(() => {
		nav = new navService(API);
	});

	it('Getter/Setter Obra', () => {
		nav.setObra({
			id: 1,
			nome: 'Faroeste Cabloco'
		})
		expect(nav.obra.nome).toBe('Faroeste Cabloco')
		expect(nav.getObra().id).toBe(1)
	});

	it('Getter/Setter Etapa', () => {
		nav.setEtapa({
			id: 1,
			codigo: 'DANCE'
		})
		expect(nav.etapa.codigo).toBe('DANCE')
		expect(nav.getEtapa().id).toBe(1)
	});

	it("Should get The obras", function(done) {
		nav.getObras()
			.then(obras => {
				expect(obras.length).toBe(5)
				done()
			})
	});

	it("Should get The Etapas", function(done) {
		nav.getEtapas(1)
			.then(etapas => {
				expect(etapas.length).toBe(2)
				done()
			})
	});

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

	it("should set and return the flags", function() {
		nav.setObra({
			id: 1,
			nome: 'Faroeste Cabloco'
		})
		nav.setEtapa({
			id: 1,
			codigo: 'DANCE'
		})
		nav.setFlags(nav.obra, nav.etapa)
		expect(nav.flags()).toBe('1x1');
	});

});
