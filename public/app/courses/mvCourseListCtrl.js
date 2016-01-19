angular.module('app').controller('mvCourseListCtrl', function($http, $scope, $filter,$route, mvIdentity, mvCachedCourses, $location, mvNotifier, $window) {
  $scope.courses = mvCachedCourses.query();
  $scope.identity = mvIdentity;
  $scope.sortOptions = [{value:"title",text: "Sort by Title"},
                        {value: "published",text: "Sort by Publish Date"},
                        {value: "category",text: "Sort by Category"}];
  $scope.sortOrder = $scope.sortOptions[0].value;

  $scope.getAllCategory = function() {
    
    /** add new categories in categories model
    **/
    $http.get('/api/categories').then(function(response) {
      //console.log(response);
        if (response.data) {
            $scope.allCategory=response.data; 
        } 
    });
  }

  $scope.showCategory = function(categoryId) {
      //console.log(categoryId); 
      //$scope.statuses = ['New', 'Open', 'Waiting for Info', 'On Hold', 'In Progress', 'Resolved'];
      $scope.selectedCategory = $filter('filter')($scope.allCategory, {
          _id: categoryId
      });
      //console.log($scope.selectedCategory[0].categoryName);
      return (categoryId && $scope.selectedCategory.length) ? $scope.selectedCategory[0].categoryName : 'Not set';
  };

  $scope.addCourse = function(isValid){
    //console.log(isValid);
    if(isValid){
      //console.log($scope.course);
      $http.post('/api/courses',$scope.course).then(function(response) {
        mvNotifier.notify('Added successfully!');
        $location.path('/courses');
        
      });
    }
  }

  $scope.deleteCourse = function(id) {
    var del = $window.confirm('Are you sure you want to delete?');

    if (del) {
      $http.delete("/api/courses/" + id).success(function(data) {
        //reload page
        $route.reload();
        mvNotifier.notify('Deleted successfully!');
        $window.location.reload()
        
      })
    }
  }
});