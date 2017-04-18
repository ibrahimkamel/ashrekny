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
  .state('events', {
      url: '/events',
      templateUrl: "templates/allevents.html",
      controller: 'EventCtrl'
    }
  )
  .state('eventdetails', {
      url: '/:id/eventdetails',
      templateUrl: "templates/eventdetails.html",
      controller: 'EventDetailsCtrl'
    }
  )
  .state('addevent', {
      url: '/addevent',
      templateUrl: "templates/addevent.html",
      controller: 'addEventCtrl',
      data: {
          permissions: {
            except: ['anonymous'],
            redirectTo: 'auth'
          }
        }
    }
  )
  .state('orgprofile', {
      url: '/orgprofile/:id',
      templateUrl: "templates/orgprofile.html",
      controller: 'orgProfileCtrl'
    }
  )

  .state('addstory', {
      url: '/addstory',
      templateUrl: "templates/addstory.html",
      controller: 'addStoryCtrl',
      data: {
          permissions: {
            except: ['anonymous'],
            redirectTo: 'auth'
          }
        }
    }
  )
  
});