angular.module('app').factory('mvCategories', function($http, $q, $window) {
    return {
        //add category
        createCategory: function(newCategoryData) {

            var dfd = $q.defer();
            /** add new categories in categories model
            **/
            $http.post('/api/categories', newCategoryData).then(function(response) {
                if (response.data) {
                    dfd.resolve(true);
                } else {
                    dfd.resolve(false);
                }
            });
            return dfd.promise;


        },


    }
});
