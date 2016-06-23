import angular from 'angular'

import routing from './routing'

import config from './app.config'

import MainController from './controllers/MainController'
import HomeController from './controllers/HomeController'
import CronoController from './controllers/CronoController'
import GanttController from './controllers/GanttController'

export default angular.module('app', [routing])
	.config(config)
	.controller('MainController', MainController)
	.controller('HomeController', HomeController)
	.controller('GanttController', GanttController)
	.controller('CronoController', CronoController)
	.name
