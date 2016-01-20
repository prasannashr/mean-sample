angular.module('app', ['ngResource', 'ngRoute']);

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
      .when('/chat', { templateUrl: '/partials/main/main',
        controller: 'mvChatCtrl'
      })
      .when('/profile', { templateUrl: '/partials/account/profile',
        controller: 'mvProfileCtrl', resolve: routeRoleChecks.user
      })
      .when('/courses', { templateUrl: '/partials/courses/course-list',
        controller: 'mvCourseListCtrl'
      })
     .when('/categories', { templateUrl: '/partials/categories/categories',
        controller: 'mvCategoriesListCtrl', resolve: routeRoleChecks.admin
      })
     .when('/courses/add', { templateUrl: '/partials/courses/course-add',
        controller: 'mvCourseListCtrl', resolve: routeRoleChecks.admin
      })
     .when('/courses/edit/:id', { templateUrl: '/partials/courses/course-edit',
        controller: 'mvCourseDetailCtrl', resolve: routeRoleChecks.admin
      })
     .when('/course/:id', { templateUrl: '/partials/courses/course-details',
        controller: 'mvCourseDetailCtrl'
      })

});
angular.module('app').directive('myYoutube', function($sce) {
  return {
    restrict: 'EA',
    scope: { code:'=' },
    replace: true,
    template: '<div style="height:400px;"><iframe width="800px" height="400px" src="{{url}}" frameborder="0" allowfullscreen></iframe></div>',
    link: function (scope) {
        console.log('here');
        scope.$watch('code', function (newVal) {
           if (newVal) {
               scope.url = $sce.trustAsResourceUrl("http://www.youtube.com/embed/" + newVal);
           }
        });
    }
  };
});
angular.module('app').run(function($rootScope, $location) {
  $rootScope.$on('$routeChangeError', function(evt, current, previous, rejection) {
    if(rejection === 'not authorized') {
      $location.path('/');
    }
  })
})
