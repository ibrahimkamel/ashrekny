'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  // 'ngRoute',
  'ui.router',
  'myApp.view1',
  'myApp.view2',
  'myApp.auth',
  'satellizer',
  'myApp.version'
]).
config(function($stateProvider, $urlRouterProvider, $authProvider) {
 
	$authProvider.loginUrl = 'http://localhost/team/laravelproject/api/authenticate';
  
  $urlRouterProvider.otherwise('/view1');
})
.
config(function($locationProvider) {
  $locationProvider.html5Mode(true);
});