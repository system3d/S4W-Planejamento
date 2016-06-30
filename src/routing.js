import angular from 'angular'
import uirouter from 'angular-ui-router'

function routing($urlRouterProvider, $locationProvider, $stateProvider) {
	$locationProvider.html5Mode({
		enabled: false
	})
	$urlRouterProvider.otherwise('/cronograma')
	$stateProvider
		.state('layout', {
			abstract: true,
			views: {
				'layout': {
					template: require('./views/layout.jade')
				}
			}
		})
		// .state('home', {
		// 	url: '/',
		// 	parent: 'layout',
		// 	views: {
		// 		"content@layout": {
		// 			template: require('./views/home.jade'),
		// 			controller: 'HomeController',
		// 			controllerAs: 'home'
		// 		}
		// 	}
		// })
		.state('cronograma', {
			url: '/cronograma',
			parent: 'layout',
			views: {
				"content@layout": {
					template: require('./views/cronograma.jade'),
					controller: 'CronoController',
					controllerAs: 'crono'
				}
			}
		})
		.state('gantt', {
			url: '/gantt',
			parent: 'layout',
			views: {
				"content@layout": {
					template: require('./views/gantt.jade'),
					controller: 'GanttController',
					controllerAs: 'gantt'
				}
			}
		}).state('entrega', {
			url: '/entrega',
			parent: 'layout',
			views: {
				"content@layout": {
					template: require('./views/entrega.jade'),
					controller: 'EntregaController',
					controllerAs: 'entrega'
				}
			}
		}).state('avanco', {
			url: '/avanco',
			parent: 'layout',
			views: {
				"content@layout": {
					template: require('./views/avanco.jade'),
					controller: 'AvancoController',
					controllerAs: 'avanco'
				}
			}
		});
}

routing.$inject = ['$urlRouterProvider', '$locationProvider', '$stateProvider'];

export default angular.module('routing', [uirouter])
	.config(routing)
	.name
