angular.module('app', ['ngResource', 'ngRoute','ngYoutubeEmbed']);

angular.module('app').config(function($routeProvider, $locationProvider) {
  var routeRoleChecks = {
    admin: {auth: function(mvAuth) {
      return mvAuth.authorizeCurrentUserForRoute('admin')
    }},
    user: {auth: function(mvAuth) {
      return mvAuth.authorizeAuthenticatedUserForRoute()
    }}
  }

//$locationProvider.html5Mode(true);
  $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
  });
  $routeProvider
      .when('/', { templateUrl: '/partials/main/main', controller: 'mvMainCtrl'})
      .when('/admin/users', { templateUrl: '/partials/admin/user-list',
        controller: 'mvUserListCtrl', resolve: routeRoleChecks.admin
      })
      .when('/signup', { templateUrl: '/partials/account/signup',
        controller: 'mvSignupCtrl'
      })
      .when('/profile', { templateUrl: '/partials/account/profile',
        controller: 'mvProfileCtrl', resolve: routeRoleChecks.user
      })
      .when('/courses', { templateUrl: '/partials/courses/course-list',
        controller: 'mvCourseListCtrl'
      })
     .when('/categories', { templateUrl: '/partials/categories/categories',
        controller: 'mvCategoriesListCtrl'
      })
     .when('/courses/add', { templateUrl: '/partials/courses/course-add',
        controller: 'mvCourseListCtrl'
      })
     .when('/course/:id', { templateUrl: '/partials/courses/course-details',
        controller: 'mvCourseDetailCtrl'
      })

});

angular.module('app').run(function($rootScope, $location) {
  $rootScope.$on('$routeChangeError', function(evt, current, previous, rejection) {
    if(rejection === 'not authorized') {
      $location.path('/');
    }
  })
})
