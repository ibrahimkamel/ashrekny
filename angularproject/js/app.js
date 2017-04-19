'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ui.router',
  'satellizer',
  'permission',
  'permission.ui'
])
.config(function($authProvider, $urlRouterProvider) {
  $authProvider.loginUrl = 'http://localhost/GP/laravelproject/api/authenticate';
  $urlRouterProvider.otherwise( function($injector) {
  		var $state = $injector.get("$state");
  		$state.go('home');
	});

})
.config(function($locationProvider) {
  $locationProvider.html5Mode(true);
})
.run(function ($rootScope, $state, $auth,PermPermissionStore) {
 
    $rootScope.logout = function() {
        $auth.logout().then(function() {
            localStorage.removeItem('user');
            $rootScope.currentUser = null;
            $state.go('home');
            });
           };

	$rootScope.currentUser = JSON.parse(localStorage.getItem('user'));

	PermPermissionStore.definePermission('isloggedin', function () {
	        // If the returned value is *truthy* then the user has the role, otherwise they don't
	        // console.log("isloggedin ", $auth.isAuthenticated()); 
	        if ($auth.isAuthenticated()) {
	          return true; // Is loggedin
	        }
	        return false;
	});
	PermPermissionStore.definePermission('anonymous', function () {
	        // If the returned value is *truthy* then the user has the role, otherwise they don't
	        // var User = JSON.parse(localStorage.getItem('user')); 
	        // console.log("anonymous ", $auth.isAuthenticated()); 
	        if (!$auth.isAuthenticated()) {
	          return true; // Is anonymous
	        }
	        return false;
	});
});