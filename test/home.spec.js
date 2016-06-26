import HomeController from '../src/controllers/HomeController'

describe('app', () => {

  describe('HomeController', () => {
    let ctrl;

    beforeEach(() => {
    /*  angular.mock.module('app');

      angular.mock.inject(($controller) => {
        ctrl = $controller(MainController, {});
      }); */

      ctrl =  new HomeController()
      console.log(ctrl);
    });
    console.log(ctrl);
    it('should contain the starter url', () => {
      expect(ctrl.teste).toBe('sim');
    });
  });
});
