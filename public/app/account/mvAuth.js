angular.module('app').factory('mvAuth', function($window, $http, mvIdentity, $q, mvUser) {
  return {
    authenticateUser: function(username, password) {
      var dfd = $q.defer();
      $http.post('/login', {username:username, password:password}).then(function(response) {
        if(response.data.success) {
          var user = new mvUser();
          angular.extend(user, response.data.user);
          mvIdentity.currentUser = user;
          $window.localStorage["currentUser"] = JSON.stringify(response.data.user);
          //currentUser = new mvUser();    
          //mvIdentity.currentUser = JSON.parse($window.localStorage.currentUser);
          console.log(mvIdentity.currentUser);
          dfd.resolve(true);
        } else {
          dfd.resolve(false);
        }
      });
      return dfd.promise;
    },

    createUser: function(newUserData) {
      var newUser = new mvUser(newUserData);
      var dfd = $q.defer();

      newUser.$save().then(function() {
        mvIdentity.currentUser = newUser;
        dfd.resolve();
      }, function(response) {
        dfd.reject(response.data.reason);
      });

      return dfd.promise;
    },

    updateCurrentUser: function(newUserData) {
      var dfd = $q.defer();

      var clone = angular.copy(mvIdentity.currentUser);
      angular.extend(clone, newUserData);
      clone.$update().then(function() {
        mvIdentity.currentUser = clone;
        dfd.resolve();
      }, function(response) {
        dfd.reject(response.data.reason);
      });
      return dfd.promise;
    },

    logoutUser: function() {
      var dfd = $q.defer();
      $http.post('/logout', {logout:true}).then(function() {
        $window.localStorage.currentUser = null;
        mvIdentity.currentUser = undefined;
        dfd.resolve();
      });
      return dfd.promise;
    },
    authorizeCurrentUserForRoute: function(role) {
      if(mvIdentity.isAuthorized(role)) {
        return true;
      } else {
        return $q.reject('not authorized');
      }

    },
    authorizeAuthenticatedUserForRoute: function() {
      if(mvIdentity.isAuthenticated()) {
        return true;
      } else {
        return $q.reject('not authorized');
      }
    }
  }
});