var angular = require('angular');
require('angular-mocks');
require(__dirname + '/../app/js/client.js');

describe('person controller', () => {
  var $httpBackend;
  var $scope;
  var $ControllerConstructor;

  beforeEach(angular.mock.module('personApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $ControllerConstructor = $controller;
    $scope = $rootScope.$new();
  }));

  it('should be able to make a controller', () => {
    var personController = $ControllerConstructor('PersonController', {$scope: $scope});
    expect(typeof personController).toBe('object');
    expect(Array.isArray($scope.people)).toBe(true);
    expect(typeof $scope.getAll).toBe('function');
  });

  describe('REST requests', () => {
    beforeEach(angular.mock.inject((_$httpBackend_) => {
      $httpBackend = _$httpBackend_;
      $ControllerConstructor('PersonController', {$scope});
    }));

    afterEach(() => {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should make a get request to /api/person', () => {
      $httpBackend.expectGET('http://localhost:3000/api/person').respond(200, [{name: 'test person'}]);
      $scope.getAll();
      $httpBackend.flush();
      expect($scope.people.length).toBe(1);
      expect($scope.people[0].name).toBe('test person');
    });

    it('should make a post request to /api/bears', () => {
      $httpBackend.expectPOST('http://localhost:3000/api/person', {name: 'sent person'}).respond(200, {name: 'response person'});
      $scope.newPerson = {name: 'new person'};
      $scope.createPerson({name: 'sent person'});
      $httpBackend.flush();
      expect($scope.people.length).toBe(1);
      expect($scope.newPerson).toBe(null);
      expect($scope.people[0].name).toBe('response person');
    });
  });

});
