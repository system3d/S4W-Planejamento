import moment from 'moment'

export default class bdDatepicker {
	constructor() {
		this.restrict = 'AE'
		this.scope = {
			minDate: '=',
			maxDate: '=',
			ngModel: "=",
			bdChange: '=',
			bdClass: '@',
			bdEmit: '='
		}
		this.template = `<input class="form-control bd-datepicker" type="text"></input>`
	}

	link($scope, elem) {
		if ($scope.bdClass) {
			if ($scope.bdClass.constructor === String) {
				elem.find('input').addClass($scope.bdClass)
			} else if ($scope.bdClass.constructor === Array) {
				$scope.bdClass.forEach(c => {
					elem.find('input').addClass(c)
				})
			}
		}

		$scope.$watch('minDate', function() {
			if ($scope.minDate) {
				let temp = moment($scope.minDate, 'YYYY-MM-DD');
				temp = temp.format('DD/MM/YYYY');
				elem.find('input').datepicker('setStartDate', temp);
			}
		}, true);
		$scope.$watch('maxDate', function() {
			if ($scope.maxDate) {
				let temp = moment($scope.maxDate, 'YYYY-MM-DD');
				temp = temp.format('DD/MM/YYYY');
				elem.find('input').datepicker('setEndDate', temp);
			}
		}, true);
		$scope.$watch('ngModel', function() {
			if ($scope.ngModel) {
				let temp = moment($scope.ngModel, 'YYYY-MM-DD');
				temp = temp.format('DD/MM/YYYY');
				elem.find('input').datepicker('update', temp);
				changeEvent();
			}
		}, true);

		function changeEvent() {
			elem.find('input').datepicker().on('changeDate', function(e) {
				let temp = moment(e.dates[0]).format('YYYY-MM-DD');
				if (temp !== $scope.ngModel) {
					if ($scope.bdChange) {
						$scope.bdChange()
					}
					if ($scope.bdEmit) {
						$scope.$emit('bdDatepickerChanged', $scope.bdEmit);
					}
				}
				$scope.ngModel = temp;
				$scope.$apply();
			});
		}

		elem.bind("keydown", function() {
			return false;
		});

		angular.element('.bd-datepicker').datepicker({
			format: "dd/mm/yyyy",
			language: "pt-BR",
			autoclose: true,
			todayHighlight: true,
			todayBtn: "linked",
			showOnFocus: true
		});
	}

}
