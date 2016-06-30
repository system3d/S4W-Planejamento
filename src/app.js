import angular from 'angular'

import routing from './routing'

import config from './app.config'

import MainController from './controllers/MainController'
import HomeController from './controllers/HomeController'
import CronoController from './controllers/CronoController'
import GanttController from './controllers/GanttController'
import EntregaController from './controllers/EntregaController'
import AvancoController from './controllers/AvancoController'

import navService from './Services/navService'
import api from '../tools/API/API'
import cacheService from './Services/cacheService'

import bdDatepicker from './directives/bdDatepickerDirective'

import '../node_modules/angular-sweetalert/SweetAlert'

import './plugins/dirPagination'

export default angular.module('app', [routing, 'oitozero.ngSweetAlert', 'angularUtils.directives.dirPagination'])
	.config(config)
	.controller('MainController', MainController)
	.controller('HomeController', HomeController)
	.controller('GanttController', GanttController)
	.controller('CronoController', CronoController)
	.controller('EntregaController', EntregaController)
	.controller('AvancoController', AvancoController)
	.service('Cache', cacheService)
	.service('navService', navService)
	.service('API', api)
	.directive('bdDatepicker',() => new bdDatepicker())
	.name
