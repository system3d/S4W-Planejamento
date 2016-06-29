// Angular Framework
import angular from 'angular'
//Angular Animate
import ngAnimate from 'angular-animate'
// App Files related to Angular
import app from './app'
// CSS Styles
import './styles'

angular.module('PlanejamentoApp', [app,ngAnimate])

let docBody = document.getElementsByTagName('body')[0]
docBody.className += " sidebar-collapse"
