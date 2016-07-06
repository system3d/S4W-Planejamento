import helper from './helper'

export default class save {
	/*@ngInject*/
	constructor(navService, $rootScope, SweetAlert) {
    this.swal = SweetAlert
		this.navService = navService
		this.rootScope = $rootScope
		this.helper = new helper()
		this.restrict = 'A'
		this.transclude = false
	}


	link($scope, elem) {
		elem.bind('click', () => {
			this.swal.swal({
					title: "Deseja Continuar?",
					text: "Ao salvar o cronograma, você criará uma nova revisão.",
					type: "info",
					showCancelButton: true,
					confirmButtonColor: "#00a65a",
					confirmButtonText: "Continuar",
					cancelButtonText: "Cancelar",
					closeOnConfirm: false,
					showLoaderOnConfirm: true
				},
				isConfirm => {
					if(isConfirm){
						let serialized = gantt.serialize('json')
						this.navService.saveGantt(serialized)
						.then( r => {
							let rStatus = (r.status == 'danger') ? 'error' : r.status;
							let rTitle = (rStatus == 'error') ? 'Oops...' : 'Sucesso';
							this.swal.swal(rTitle, r.data, rStatus);
							if (r.status == 'success') {
								let ganttData = gantt.serialize().data;
								ganttData.forEach(function(task) {
									if (task.id.match(/[E]/)) {
										let thisTaske = gantt.getTask(task.id);
										thisTaske.dirty = 'false';
									}
								});
								this.rootScope.$broadcast('GanttSaveButton', false);
								this.rootScope.$broadcast('GanttSaved', true);
								this.helper.balanceGantt();
							}else{
								this.rootScope.$broadcast('rloadGantt', true);
								this.rootScope.$broadcast('GanttSaveButton', false);
							}
						})
						.catch( () => {
							this.swal.swal('Oops...', 'Erro ao Salvar Cronograma', 'error');
						})
					}
				})
		})

		this.rootScope.$on('GanttSaveButton', function(event, newVal) {
			if (!newVal) {
				elem.addClass('hidden');
			} else {
				elem.removeClass('hidden');
			}
		});

		$scope.$watch('showSave', function(newVal) {
			if (!newVal) {
				elem.addClass('hidden');
			} else {
				elem.removeClass('hidden');
			}
		});

	}

}

save.$inject = ['navService', '$rootScope', 'SweetAlert']
