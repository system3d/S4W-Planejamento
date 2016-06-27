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

export default angular.module('app', [routing])
	.config(config)
	.controller('MainController', MainController)
	.controller('HomeController', HomeController)
	.controller('GanttController', GanttController)
	.controller('CronoController', CronoController)
	.controller('EntregaController', EntregaController)
	.controller('AvancoController', AvancoController)
	.service('navService', navService)
	.name
