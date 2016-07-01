import API from '../../tools/API/API'

export default class GanttController {
  constructor($scope,navService) {
    this.navService = navService
    this.$scope = $scope
    this.API = new API()
    this.ganttData = []
    this.API.getGantt()
    .then( data => {
      this.ganttData = data.data
      this.$scope.$digest()
    })
  }
}

GanttController.$inject = ['$scope','navService']
