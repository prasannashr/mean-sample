angular.module('app').controller('mvCourseDetailCtrl', function($http, $scope, $routeParams, $location, mvNotifier) {
   	$scope.link = 'https://www.youtube.com/watch?v=OPmOXJtxxoo';

  	$http.get('/api/courses/'+$routeParams.id).then(function(response) {    
      if (response.data) {

          $scope.course=response.data; 
          console.log(response.data);
      } 
  	});

  	$scope.getAllCategory = function() {
    
	    /** add new categories in categories model
	    **/
	    $http.get('/api/categories').then(function(response) {
	      console.log(response);
	        if (response.data) {
	            $scope.allCategory=response.data; 
	        } 
	    });
  	}

    $scope.updateCourse = function(isValid){
      //console.log(isValid);
      if(isValid){
        console.log($scope.course);
        $http.put('/api/courses/'+$scope.course._id,$scope.course).then(function(response) {
          //console.log(response);
          mvNotifier.notify('Updated successfully!');
          $location.path('/course/'+$scope.course._id);
          
        });
      }
    }
  
});