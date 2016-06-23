import app from '../src/app'

describe('app', () => {

  describe('MainController', () => {
    let ctrl;

    beforeEach(() => {
      angular.mock.module(app);

      angular.mock.inject(($controller) => {
        ctrl = $controller('MainController', {});
      });
    });

    it('should contain the starter url', () => {
      expect(MainController.active).toBe('');
    });
  });
});
