import cacheService from '../src/Services/cacheService'

describe("Cache Service", () => {
	let cache;

	beforeEach(inject(function($interval) {
		cache = new cacheService($interval)
	}));

	describe("Constructor", () => {

	it("Should set Initial Params", function() {
		expect(cache.Memory).toEqual([])
	});

	it("Shoul trigger the scan", function() {
		spyOn(cache, "scan");
		cache.$interval.flush(300000)
		expect(cache.scan).toHaveBeenCalled()
	});

	it("Should NOT trigger the scan", function() {
		spyOn(cache, "scan");
		cache.$interval.flush(290000)
		expect(cache.scan).not.toHaveBeenCalled()
	});

})

	it("should set a thing", () => {
		spyOn(cache, 'mount')
		spyOn(cache, 'delete')
		cache.set('test', {
			payload: true
		}, 50)
		expect(cache.mount).toHaveBeenCalledWith('test', {
			payload: true
		}, 50)
		expect(cache.delete).not.toHaveBeenCalled()
	})

	it("Should mount a thing", function() {
		cache.mount('test', {
			a: 'sim',
			b: 'nao'
		}, 500)
		expect(cache.Memory.length).toBe(1)
		expect(cache.Memory[0].expireRate).toEqual(500)
		expect(cache.Memory[0].key).toEqual('test')
	});

	it("should return the index", function() {
		cache.mount('test', {
			a: 'sim',
			b: 'nao'
		}, 500)
		cache.mount('test1', {
			a: 'sim',
			b: 'nao'
		}, 500)
		cache.mount('test2', {
			a: 'sim',
			b: 'nao'
		}, 500)
		expect(cache.index('test')).toBe(0)
		expect(cache.index('test1')).toBe(1)
		expect(cache.index('test2')).toBe(2)
	});

	it("Should get the obj by key", function() {
		cache.mount('testa', {
			a: 'simdede',
			b: 'nfwfwgao'
		}, 5050)
		cache.mount('test', {
			a: 'sim',
			b: 'nao'
		}, 500)
		cache.mount('teste', {
			a: 'siacafaefrgm',
			b: 'naasfrgo'
		}, 5080)
		expect(cache.getByKey('test').payload).toEqual({
			a: 'sim',
			b: 'nao'
		})
		expect(cache.getByKey('NAO')).toBe(null)
	});

	it("Should Update a thing", function() {
		spyOn(cache, 'mount')
		spyOn(cache, 'delete')
		cache.Memory = [{
			key: 'test',
			payload: 'JOHN CENA'
		}, {
			key: 'Lotes',
			payload: {
				nome: 'Arroz',
				Peso: 80
			}
		}]
		cache.set('test', 'MANTEIGA')
		expect(cache.delete).toHaveBeenCalledWith('test')
		expect(cache.mount).toHaveBeenCalledWith('test', 'MANTEIGA', 5)
	});

	it("Should Check Time", function() {
		cache.Memory = [{
			key: 'test',
			payload: 'JOHN CENA',
			expireRate: 2,
			expire: Date.now() + (2 * 60000)
		}, {
			key: 'fail',
			payload: 'JOHN CENA',
			expireRate: 2,
			expire: Date.now() - (2 * 60000)
		}]
		expect(cache.checkTime('test')).toBeTruthy()
		expect(cache.checkTime('fail')).toBeFalsy()
	});

	it("should scan", function() {
		cache.Memory = [{
			key: 'test',
			payload: 'JOHN CENA',
			expireRate: 2,
			expire: Date.now() + (2 * 60000)
		}, {
			key: 'fail',
			payload: 'JOHN CENA',
			expireRate: 2,
			expire: Date.now() - (2 * 60000)
		}, {
			key: 'success',
			payload: 'JOHN CENA',
			expireRate: 2,
			expire: Date.now() + (2 * 60000)
		}]
		cache.scan()
		expect(cache.Memory.length).toBe(2)
		expect(cache.Memory[1].key).toBe('success')
		expect(cache.getByKey('fail')).toBe(null)
	});

	it('Should get a obj', (done) => {
		cache.Memory = [{
			key: 'test',
			payload: 'JOHN CENA',
			expireRate: 2,
			expire: Date.now() + (2 * 60000)
		}, {
			key: 'success',
			payload: 'JOHN CENA',
			expireRate: 2,
			expire: Date.now() + (2 * 60000)
		}]
		cache.get('test')
			.then(x => {
				expect(x.payload).toBe('JOHN CENA')
				done()
			})
	});

	it('Should get null', (done) => {
		cache.Memory = [{
			key: 'test',
			payload: 'JOHN CENA',
			expireRate: 2,
			expire: Date.now() + (2 * 60000)
		}, {
			key: 'fail',
			payload: 'JOHN CENA',
			expireRate: 2,
			expire: Date.now() - (2 * 60000)
		}]
		cache.get('fail')
			.catch(x => {
				expect(x).toBe(null)
				done()
			})
	});

	it('Should get null again', (done) => {
		cache.Memory = [{
			key: 'test',
			payload: 'JOHN CENA',
			expireRate: 2,
			expire: Date.now() + (2 * 60000)
		}, {
			key: 'fail',
			payload: 'JOHN CENA',
			expireRate: 2,
			expire: Date.now() - (2 * 60000)
		}]
		cache.get('faila')
			.catch(x => {
				expect(x).toBe(null)
				done()
			})
	});

})

// TODO: Organize this and all the others tests to have a describe block for function
// TODO: Import this Service in app.js, and apply it in the application =)
