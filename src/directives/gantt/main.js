import helper from './helper'
import moment from 'moment'
export default class ganttDirective {
	/*@ngInject*/
	constructor($rootScope) {
		this.helper = new helper()
		this.$rootScope = $rootScope
		this.restrict = 'A'
		this.scope = {
			ganttData: '='
		}
		this.transclude = true
		this.template = '<div ng-transclude></div>'
	}

	link($scope, $element, $attrs) {

		gantt.config.row_height = 24;
		gantt.config.scale_unit = "year";
		gantt.config.date_scale = "%Y";
		gantt.config.scale_height = 50;
		gantt.config.subscales = [{
			unit: "month",
			step: 1,
			date: "%M"
		}];

		gantt.templates.tooltip_text = (start, end, task) => {
			let starto = new Date(task.start_date)
			start = moment(starto).format("DD/MM/YYYY");
			end = starto.setDate(starto.getDate() + task.duration);
			let endo = new Date(end);
			let termino = moment(endo).format("DD/MM/YYYY");
			return task.text + "<br/><b>Começo:</b> " + start + "<br/><b>Previsão de Término:</b> " + termino;
		};

		gantt.config.round_dnd_dates = false;
		gantt.init($element[0]);

		function createBox(sizes, class_name) {
			let box = document.createElement('div');
			box.style.cssText = [
				"height:" + sizes.height + "px",
				"line-height:" + sizes.height + "px",
				"width:" + sizes.width + "px",
				"top:" + sizes.top + 'px',
				"left:" + sizes.left + "px",
				"position:absolute"
			].join(";");
			box.className = class_name;
			return box;
		}

		gantt.templates.grid_row_class = gantt.templates.task_class = function(start, end, task) {
			let css = [];
			if (gantt.hasChild(task.id)) {
				css.push("task-parent");
			}
			if (task.id.match(/[E,O,R]/)) {
				css.push("task-noDrag");
			}
			if (!task.$open && gantt.hasChild(task.id) && task.id.match(/[E,O]/)) {
				css.push("task-collapsed");
			}

			return css.join(" ");
		};

		gantt.addTaskLayer(function show_hidden(task) {
			if (!task.$open && gantt.hasChild(task.id) && task.id.match(/[E,O]/)) {
				let sub_height = gantt.config.row_height - 5,
					el = document.createElement('div'),
					sizes = gantt.getTaskPosition(task);

				let sub_tasks = gantt.getChildren(task.id);

				let child_el;

				for (let i = 0; i < sub_tasks.length; i++) {
					let child = gantt.getTask(sub_tasks[i]);
					let child_sizes = gantt.getTaskPosition(child);

					child_el = createBox({
						height: sub_height,
						top: sizes.top,
						left: child_sizes.left,
						width: child_sizes.width
					}, "child_preview gantt_task_line");
					child_el.innerHTML = child.text;
					el.appendChild(child_el);
				}
				return el;
			}
			return false;
		});

		gantt.config.grid_width = 250;
		gantt.config.add_column = false;
		gantt.config.drag_progress = false;
		gantt.config.show_links = false;
		gantt.config.autofit = true;
		gantt.config.autosize = true;
		// gantt.config.fit_tasks = true;
		gantt.locale = {
			date: {
				month_full: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
				month_short: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
				day_full: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
				day_short: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"]
			},
			labels: {
				dhx_cal_today_button: "Hoje",
				day_tab: "Dia",
				week_tab: "Semana",
				month_tab: "Mês",
				new_event: "Novo evento",
				icon_save: "Sallet",
				icon_cancel: "Cancelar",
				icon_details: "Detalhes",
				icon_edit: "Editar",
				icon_delete: "Deletar",
				confirm_closing: "Suas alterações serão perdidas. Você tem certeza?",
				confirm_deleting: "Tem certeza que deseja excluir?",
				section_description: "Descrição",
				section_time: "Período de tempo",
				section_type: "Tipo",
				column_text: "Nome tarefa",
				column_start_date: "Data início",
				column_duration: "Duração",
				column_add: "",
				link: "Link",
				confirm_link_deleting: "será apagado",
				link_start: " (início)",
				link_end: " (fim)",
				type_task: "Tarefa",
				type_project: "Projeto",
				type_milestone: "Marco",
				minutes: "Minutos",
				hours: "Horas",
				days: "Dias",
				weeks: "Semanas",
				months: "Mêses",
				years: "Anos"
			}
		};

		gantt.config.columns = [{
			name: "text",
			label: "Gantt de Planejamento",
			tree: true,
			width: '*'
		}];


		gantt.attachEvent("onBeforeTaskDrag", function(id, mode, e) {
			if (id.match(/[E,O,R]/)) {
				return false;
			}
			return true;
		});

		gantt.attachEvent("onAfterTaskDrag", (id, mode, task, original) => {
			setTimeout(() => {
				this.helper.balanceGantt();
			}, 300);
		})

		gantt.attachEvent("onTaskDrag", (id, mode, task, original) => {
			this.$rootScope.$broadcast('GanttSaveButton', true);
			let startDate = new Date(task.start_date);
			let endDate = new Date(task.end_date);
			let etapa_id = gantt.getParent(task.id);
			let etapa = gantt.getTask(etapa_id);
			let obra_id = gantt.getParent(etapa_id);
			let obra = gantt.getTask(obra_id);
			let etapaEndDate = etapa.end_date;
			let etapaStartDate = etapa.start_date;
			let obraEndDate = obra.end_date;
			let obraStartDate = obra.start_date;
			etapa.dirty = 'true';
			if (endDate > etapaEndDate) {
				etapa.end_date = endDate;
				gantt.updateTask(etapa_id);
				gantt.refreshData();
			} else {
				let major = true;
				let childrens = gantt.getChildren(etapa_id);
				childrens.forEach(function(task_id) {
					let new_task = gantt.getTask(task_id);
					if (new_task.id != task.id) {
						if (new_task.end_date >= endDate) {
							major = false;
						}
					}
				});
				if (major == true) {
					etapa.end_date = endDate;
					gantt.updateTask(etapa_id);
					gantt.refreshData();
				}
			}

			if (startDate < etapaStartDate) {
				etapa.start_date = startDate;
				gantt.updateTask(etapa_id);
				gantt.refreshData();
			} else {
				let major = true;
				let childrens = gantt.getChildren(etapa_id);
				childrens.forEach(function(task_id) {
					let new_task = gantt.getTask(task_id);
					if (new_task.id != task.id) {
						if (new_task.start_date <= startDate) {
							major = false;
						}
					}
				});
				if (major == true) {
					etapa.start_date = startDate;
					gantt.updateTask(etapa_id);
					gantt.refreshData();
				}
			}

			if (etapaEndDate > obraEndDate) {
				obra.end_date = etapaEndDate;
				gantt.updateTask(obra_id);
				gantt.refreshData();
			} else {
				let major = true;
				let childrens = gantt.getChildren(obra_id);
				childrens.forEach(function(task_id) {
					let new_task = gantt.getTask(task_id);
					if (new_task.id != task.id && new_task.id.match(/[E]/)) {
						if (new_task.end_date >= etapaEndDate) {
							major = false;
						}
					}
				});
				if (major == true) {
					obra.end_date = etapaEndDate;
					gantt.updateTask(obra_id);
					gantt.refreshData();
				}
			}

			if (etapaStartDate < obraStartDate) {
				obra.start_date = etapaStartDate;
				gantt.updateTask(obra_id);
				gantt.refreshData();
			} else {
				let major = true;
				let childrens = gantt.getChildren(obra_id);
				childrens.forEach(function(task_id) {
					let new_task = gantt.getTask(task_id);
					if (new_task.id != task.id && new_task.id.match(/[E]/)) {
						if (new_task.start_date <= etapaStartDate) {
							major = false;
						}
					}
				});
				if (major == true) {
					obra.start_date = etapaStartDate;
					gantt.updateTask(obra_id);
					gantt.refreshData();
				}
			}
		});

		gantt.attachEvent("onTaskDblClick", function(id, e) {
			e.stopPropagation();
		});


		$scope.$watch('ganttData', (collection) => {
			if (collection.length > 0 && !$scope.ganttDid) {
				let tempObj = {
					data: collection
				}
				gantt.clearAll();
				gantt.parse(tempObj, "json");
				this.helper.balanceGantt();
				$scope.ganttDid = true;
				gantt.render();
			}
		}, true);

		this.$rootScope.$on('GanttReload', (event, collection) => {
			let tempObj = {
				data: collection
			}
			gantt.clearAll();
			gantt.parse(tempObj, "json");
			this.helper.balanceGantt();
			$scope.ganttDid = true;
			gantt.render();
		})

		this.$rootScope.$on('ganttResize', () => {
			setTimeout(function() {
				gantt.render();
			}, 600);
		})

		window.onresize = () => {
			gantt.render();
		};

		window.onload = () => {
			setTimeout(function() {
				gantt.render();
			}, 600);
		}

	}

}

ganttDirective.$inject = ['$rootScope']
