import helper from './helper'

export class zoomIn {
	constructor() {
		this.restrict = 'A'
		this.helper = new helper()
		this.scope = false
		this.transclude = false
	}

	link($scope, elem) {
		elem.bind('click', () => {
			if (!$scope.scale) $scope.scale = 3;
			if ($scope.scale < 4) {
				var scal = $scope.scale;
				switch (scal) {
					case 1:
						this.helper.scale_two();
						break;
					case 2:
						this.helper.scale_tree();
						break;
					case 3:
						this.helper.scale_four();
						break;
				}
				$scope.scale++;
				this.helper.balanceGantt();
			}
		});
	}
}

export class zoomOut {
	constructor() {
		this.helper = new helper()
		this.restrict = 'A'
		this.scope = false
		this.transclude = false
	}

	link($scope, elem) {
		elem.bind('click', () => {
			if (!$scope.scale)
				$scope.scale = 3;
			if ($scope.scale > 1) {
				var scal = $scope.scale;
				switch (scal) {
					case 4:
						this.helper.scale_tree();
						break;
					case 2:
						this.helper.scale_one();
						break;
					case 3:
						this.helper.scale_two();
						break;
				}
				$scope.scale--;
				this.helper.balanceGantt();
			}
		});
	}

}
