import mainGantt from './main'
import {register} from '../../plugins/utils'
import {zoomIn, zoomOut} from './zooms'
import toggle from './toggle'
import save from './save'

export default angular.module('gantt', [])
	.name

register('gantt').directive('dhxGantt', mainGantt);
register('gantt').directive('zoomIn', zoomIn);
register('gantt').directive('zoomOut', zoomOut);
register('gantt').directive('ganttToggle', toggle);
register('gantt').directive('saveGantt', save);

// TODO: Make the helpers directives, put the data flow on navService, proper test it
// TODO: Apply cacheService to getAvanco, getEntrega and GetGAntt at navService
// TODO: Memoize
// TODO: write the APIService
// TODO: Back End
