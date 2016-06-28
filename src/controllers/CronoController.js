export default class CronoController {
	constructor($scope, navService, SweetAlert) {
		this.$scope = $scope
		this.navService = navService
		this.Cronogramas = []
		this.CronogramasLegacy = []
		this.filter = {}
		this.sweetalert = SweetAlert
		this.$scope.$watch(
			() => {
				return this.navService.flags()
			},
			() => {
				if (this.Cronogramas.length < 1)
					this.loadCrono()
				this.setFilters()
			}, true);

		this.$scope.$on('bdDatepickerChanged', (e, row) => {
			this.Cronogramas.forEach(c => {
				if (c.etapa_id === row)
					c.touched = true
			})
			this.touch()
		})
	}

	loadCrono() {
		return new Promise((resolve, reject) => {
			this.navService.getCronogramas()
				.then(cronos => {
					this.Cronogramas = angular.fromJson(angular.toJson(cronos))
					this.CronogramasLegacy = angular.fromJson(angular.toJson(cronos))
					this.$scope.$digest()
					resolve(true)
				}).catch(err => {
					reject(err)
				})
		})
	}

	resetCrono() {
		this.Cronogramas = angular.fromJson(angular.toJson(this.CronogramasLegacy))
		this.touched = false
	}

	updateLegacy() {
		this.CronogramasLegacy = angular.fromJson(angular.toJson(this.Cronogramas))
	}

	touch() {
		this.touched = true
	}

	setFilters() {
		let tObra = this.navService.getObra()
		let tEtapa = this.navService.getEtapa()
		if (tObra.id > 0)
			this.filter.obra = tObra.id
		else
			delete this.filter.obra

		if (tEtapa.id > 0)
			this.filter.etapa = tEtapa.id
		else
			delete this.filter.etapa
	}

	salvarRevisao() {
		this.sweetalert.swal({
				title: "Deseja Continuar?",
				text: "Todas Datas Alteradas serão salvas.",
				type: "info",
				showCancelButton: true,
				confirmButtonColor: "#00a65a",
				confirmButtonText: "Continuar",
				closeOnConfirm: false,
				showLoaderOnConfirm: true
			},
			isConfirm => {
				if (isConfirm) {
					this.sendRevisao().then(() => {
							this.sweetalert.swal("Sucesso!", "Revisão salva com sucesso", "success")
							this.touched = false
							this.augmentRevision()
							this.resetToucheds()
							this.updateLegacy()
						})
						.catch(() => {
							this.sweetalert.swal("Ooops...", "Erro ao Salvar Revisão", "error")
							this.resetCrono()
						})
				}
			});
	}

	resetToucheds() {
		this.Cronogramas.filter(c => c.touched).forEach(r => r.touched = false)
	}

	augmentRevision() {
		this.Cronogramas.filter(c => c.touched).forEach(r => r.revisao = r.revisao + 1)
	}

	sendRevisao() {
		return new Promise((resolve, reject) => {
			let touchedRevisions = this.Cronogramas.filter(c => c.touched)
			this.navService.saveRevision(touchedRevisions)
				.then( () => {
					resolve(true)
				}).catch(e => {
					reject(e)
				})
		})
	}

	voltarRevisao(etapa) {
		this.sweetalert.swal({
				title: "Deseja Continuar?",
				text: "A versão antiga será completamente excluída do sistema.",
				type: "warning",
				showCancelButton: true,
				confirmButtonColor: "#dd6b55",
				confirmButtonText: "Confirmar",
				closeOnConfirm: false
			},
			isConfirm => {
				if (isConfirm) {
					this.sendReturnRevision(etapa).then((n) => {
							this.sweetalert.swal("Sucesso!", "Revisão salva com sucesso", "success")
							this.changeReturned(n)
							this.changeReturnedLegacy(n)
						})
						.catch(() => {
							this.sweetalert.swal("Ooops...", "Erro ao Reverter Revisão", "error")
						})
				}
			});
	}

	sendReturnRevision(etapa) {
		return new Promise((resolve, reject) => {
			this.navService.returnRevision(etapa)
				.then( (r) => {
					resolve(r)
				})
				.catch( e => {
					reject(e)
				})
		})
	}

	changeReturned(etapa){
		this.Cronogramas.forEach( (c,i) => {
			if(c.etapa_id == etapa.etapa_id){
				this.Cronogramas.splice(i,1)
				this.Cronogramas.push(etapa)
			}
		})
			this.$scope.$digest()
	}

	changeReturnedLegacy(etapa){
		this.CronogramasLegacy.forEach( (c,i) => {
			if(c.etapa_id == etapa.etapa_id){
				this.CronogramasLegacy.splice(i,1)
				this.CronogramasLegacy.push(etapa)
			}
		})
	}

}

CronoController.$inject = ['$scope', 'navService', 'SweetAlert']

// TODO: Unit Test for ChangeReturned, ChangeReturnedLegacy, sendRevision and SendReturnedRevision(last 2 may be a little tricky)
// TODO: orderBy - Column in the table
// TODO: Unit Test for Failure(reject Promises mostly, must write a mock service for it)
// TODO: maybe store the crono(and the charts data as well) in the navService or in a cacheService(performances tests may be needed)
// TODO: THINK ABOUT: Advise the maluco when he is trying to leave with changed data and when he is saving with unseen rows changed
