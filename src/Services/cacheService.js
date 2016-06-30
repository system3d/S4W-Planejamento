export default class cacheService {
	/*@ngInject*/
	constructor($interval) {
		this.$interval = $interval
		this.Memory = []
		this.$interval(() => this.scan(), 300000);
	}

	setValue(key, payload, expire = 5) {

		if (this.index(key) !== -1) {
			this.delete(key)
		}
		this.mount(key, payload, expire)
	}

	mount(key, payload, expire) {
		this.Memory.push({
			expire: Date.now() + (expire * 60000),
			expireRate: expire,
			payload: payload,
			key: key
		})
	}

	get(key) {
		return new Promise((resolve, reject) => {
			if (this.getByKey(key)) {
				if (this.checkTime(key)) {
					resolve(this.getByKey(key).payload)
				} else {
					reject(null)
				}
			} else {
				reject(null)
			}
		})
	}

	getByKey(key) {
		if (this.index(key) !== -1)
			return this.Memory[this.index(key)]
		else
			return null
	}

	checkTime(key) {
		if (this.getByKey(key)) {
			if (this.getByKey(key).expire < Date.now()) {
				return false
			}
			return true
		}
		return false
	}

	delete(key) {
		if (this.index(key) !== -1)
			this.Memory.splice(this.index(key), 1)
	}

	index(key) {
		return this.Memory.indexOf(this.Memory.find(c => c.key === key))
	}

	scan() {
		if (this.Memory) {
			this.Memory.forEach(m => {
				if (!this.checkTime(m.key)) {
					this.delete(m.key)
				}
			})
		}
	}

}

cacheService.$inject = ["$interval"]
