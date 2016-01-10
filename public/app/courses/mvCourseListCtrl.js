angular.module('app').controller('mvCourseListCtrl', function($http, $scope, mvCachedCourses) {
  $scope.courses = mvCachedCourses.query();

  $scope.sortOptions = [{value:"title",text: "Sort by Title"},
    {value: "published",text: "Sort by Publish Date"}];
  $scope.sortOrder = $scope.sortOptions[0].value;

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

  $scope.addCourse = function(course){
    console.log(course);
    $http.post('/api/courses').then(function(response) {
        console.log(response);
        if (response.data) {
            //$scope.allCategory=response.data; 
        } 
    });

  }
});