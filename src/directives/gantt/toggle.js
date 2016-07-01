export default class toggle {
	/*@ngInject*/
	constructor($rootScope) {
		this.rootScope = $rootScope
		this.restrict = 'A'
		this.scope = false
		this.transclude = false
	}

	link($scope, elem) {
		elem.bind('click', () => {
			this.rootScope.$broadcast('toggleReal', true);
		});
		this.rootScope.$on('toggleReal', function(event, newVal) {
			if (elem.find('i').hasClass('fa-caret-square-o-down'))
				var what = 1;
			else
				var what = 0;
			elem.find('i').toggleClass('fa-caret-square-o-down fa-caret-square-o-right');
			var ganttData = gantt.serialize().data;
			if (what == 0) {
				ganttData.forEach(function(taske) {
					if (taske.id.match(/[T]/)) {
						if (gantt.hasChild(taske.id))
							gantt.open(taske.id);
					}
				});
			} else {
				ganttData.forEach(function(taske) {
					if (taske.id.match(/[T]/)) {
						if (gantt.hasChild(taske.id))
							gantt.close(taske.id);
					}
				});
			}
		});
	}

}

toggle.$inject = ['$rootScope']
