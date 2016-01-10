angular.module('app').controller('mvCourseListCtrl', function($http, $scope, mvCachedCourses, $location) {
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

  $scope.addCourse = function(isValid){
    //console.log(isValid);
    if(isValid){
      console.log($scope.course);
      $http.post('/api/courses',$scope.course).then(function(response) {
        console.log(response);
        $location.path('/courses');
        
      });
    }
   

  }
});