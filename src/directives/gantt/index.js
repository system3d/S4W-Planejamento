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

// TODO: Apply cacheService to getAvanco, getEntrega, and fix it at gantt, make a this.flag in the controllers and compare, it it defer then load new, else check cache and stuff, remeber to save in the cache if getting new
// TODO: Memoize
// TODO: write the APIService
// TODO: Back End
