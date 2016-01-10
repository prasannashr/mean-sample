angular.module('app').controller('mvCategoriesListCtrl', function($scope, mvCategories, mvNotifier, $location, $http, $window, $route) {

  $scope.addcategory = function() {
    var newCategoryData = {
      categoryName: $scope.categoryName,
    };

    mvCategories.createCategory(newCategoryData).then(function() {
      console.log("Category Added Successfully !");
      $route.reload();
      mvNotifier.notify('Category Added Successfully !');
      //$window.location.reload();
    }, function(reason) {
      alert(reason);
      mvNotifier.error(reason);
    })
  }

  $scope.deleteCategory = function(id) {
    var del = $window.confirm('Are you sure you want to delete?');

    if (del) {
      $http.delete("/api/categories/" + id).success(function(data) {
        //reload page
        $route.reload();
        mvNotifier.notify('Deleted successfully!');
      })
    }
  }

  $scope.getAllCategory = function() {
    
    /** add new categories in categories model
    **/
    $http.get('/api/categories').then(function(response) {
      console.log(response);
        if (response.data) {
          console.log(response.data);
            $scope.allCategory=response.data;
            

        } else {

        }
    });
  }

});
