angular.module('app').factory('mvIdentity', function($window, mvUser) {
  var currentUser;
  console.log($window.localStorage.currentUser);
  if($window.localStorage.currentUser !="null" && $window.localStorage.currentUser !=undefined) {
      currentUser = new mvUser();
      currentUser = JSON.parse($window.localStorage.currentUser);
      //console.log(JSON.parse($window.localStorage.currentUser));
   }
  return {
    currentUser: currentUser,
    isAuthenticated: function() {
      return !!this.currentUser;
    },
    isAuthorized: function(role) {
      return !!this.currentUser && this.currentUser.roles.indexOf(role) > -1;
    }
  }
})