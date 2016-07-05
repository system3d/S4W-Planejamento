export default class GanttHelper {
	constructor() {

	}

	scale_one() {
		gantt.config.scale_unit = "month";
		gantt.config.date_scale = "%F, %Y";
		gantt.config.scale_height = 50;
		gantt.config.subscales = [{
			unit: "day",
			step: 1,
			date: "%j, %D"
		}];
		gantt.render();
	}

	scale_two() {
		gantt.config.scale_unit = "month";
		gantt.config.date_scale = "%F, %Y";
		gantt.config.scale_height = 50;
		gantt.config.subscales = [{
			unit: "week",
			step: 1,
			date: "Sem. #%W"
		}];
		gantt.render();
	}

	scale_tree() {
		gantt.config.scale_unit = "year";
		gantt.config.date_scale = "%Y";
		gantt.config.scale_height = 50;
		gantt.config.subscales = [{
			unit: "month",
			step: 1,
			date: "%M"
		}];
		gantt.render();
	}

	scale_four() {
		gantt.config.scale_unit = "year";
		gantt.config.date_scale = "%Y";
		gantt.config.scale_height = 30;
		gantt.config.subscales = [];
		gantt.render();
	}

	balanceGantt() {
		let ganttData = gantt.serialize().data;
		ganttData.forEach(function(taske) {
			if (taske.id.match(/[T]/)) {
				let task = gantt.getTask(taske.id);
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
			}
		});
	}

}
