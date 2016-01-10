angular.module('app').factory('mvCachedCategories', function(mvCategories) {
  var cagtegoriesList;

  return {
    query: function() {
      if(!cagtegoriesList) {
        cagtegoriesList = mvCategories.query();
      }

      return cagtegoriesList;
    }
  }
})