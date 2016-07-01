export default class GanttHelper {
	constructor() {
		this.scale = 3
	}

  changeScale(which){
    (which === 0) ? this.scale-- : this.scale++
    switch (this.scale) {
      case 1:
        scale_one()
        break
      case 2:
        scale_two()
        break
      case 3:
        scale_tree()
        break
      case 4:
        scale_four()
        break
      default:
        scale_tree()
        break
    }
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
				let etapaEndDate = etapa.end_date;
				let etapaStartDate = etapa.start_date;
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
			}
		});
	}

}
