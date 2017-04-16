'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp')
.config(function($stateProvider) {

  $stateProvider
  .state('auth', {
      url: '/auth',
      templateUrl: "templates/auth.html",
      controller: 'AuthCtrl',
      data: {
          permissions: {
            except: ['isloggedin'],
            redirectTo: 'profile'
          }
        }
    }
  )
  .state('profile', {
      url: '/profile',
      templateUrl: "templates/profile.html",
      controller: 'ProfileCtrl',
      data: {
          permissions: {
            except: ['anonymous'],
            redirectTo: 'auth'
          }
        }
    }
  )
  .state('home', {
      url: '/home',
      templateUrl: "templates/home.html",
      controller: 'HomeCtrl'
    }
  )
  
});