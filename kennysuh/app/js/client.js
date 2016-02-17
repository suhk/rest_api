const angular = require('angular');

const personApp = angular.module('personApp', []);
personApp.controller('PersonController', ['$scope', '$http', function ($scope, $http) {
  $scope.people = [];
  $scope.editing = false;

  $scope.getAll = function() {
    $http.get('http://localhost:3000/api/person')
      .then((res) => {
        $scope.people = res.data;
      }, (err) => {
        console.log(err);
      });
  };

  var resetCount = () => {
    $http.get('http://localhost:3000/api/person/count')
      .then((res) => {
        $scope.peopleCount = res.data.count;
      }, (err) => {
        console.log(err);
      });
  };
  //resetCount();

  $scope.createPerson = (person) => {
    $http.post('http://localhost:3000/api/person', person)
      .then((res) => {
        $scope.people.push(res.data);
        $scope.newPerson = null;
        //resetCount();
      }, (err) => {
        console.log(err);
      });
  };

  $scope.deletePerson = (person) => {
    $http.delete('http://localhost:3000/api/person/' + person._id)
      .then((res) => {
        $scope.people = $scope.people.filter((i) => i._id != person._id);
        //resetCount();
      }, (err) => {
        console.log(err);
      });
  };

  $scope.updatePerson = (person) => {
    $http.put('http://localhost:3000/api/person/' + person._id, person)
      .then((res) => {
        var index = $scope.people.map(function(e) {return e._id;}).indexOf(person._id);
        $scope.people[index] = person;
        person.editing = false;
      }, (err) => {
        console.log(err);
      });
  };
}]);
