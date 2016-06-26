import MainController from '../src/controllers/MainController'


describe('MainController', () => {
    let ctrl

    let location;

    beforeEach(module(function($provide) {
        $provide.factory('MainController', function($location) {
            location = $location;
        });
    }));

    beforeEach(() => {
        ctrl = new MainController()
    });
    console.log(ctrl);
    it('should contain the starter url', () => {
        expect(ctrl.active).toBe('');
    });
});
