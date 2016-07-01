import mainGantt from './main'
import {register} from '../../plugins/utils'

export default angular.module('gantt', [])
	.name

register('gantt').directive('dhxGantt', mainGantt);

// TODO: Make the helpers directives, put the data flow on navService, proper test it
// TODO: Apply cacheService to getAvanco, getEntrega and GetGAntt at navService
// TODO: Memoize
// TODO: write the APIService
// TODO: Back End
