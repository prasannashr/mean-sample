angular.module('app').controller('mvCourseDetailCtrl', function($http, $scope, $routeParams, $location) {
   $scope.link = 'https://www.youtube.com/watch?v=OPmOXJtxxoo';
  $http.get('/api/courses/'+$routeParams.id).then(function(response) {    
      if (response.data) {

          $scope.course=response.data; 
          console.log(response.data);
      } 
  });
  
});