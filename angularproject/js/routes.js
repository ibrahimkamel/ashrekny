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
            redirectTo: 'home'
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
      controller: 'HomeController'
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
            only: ['organization'],
            redirectTo: 'home'
          }
        }
    }
  )
  .state('volunteerprofile', {
      url: '/volunteerprofile/:id',
      templateUrl: "templates/volunteerprofile.html",
      controller: 'VolunteerProfileCtrl'
    }
  )
  .state('stories', {
      url: '/stories',
      templateUrl: "templates/stories.html",
      controller: 'storiesCtrl'
    }
  )
  .state('storydetails', {
      url: '/:id/storydetails',
      templateUrl: "templates/storydetails.html",
      controller: 'storydetailsCtrl'
    }
  )
.state('select', {
      url: '/select',
      templateUrl: "templates/select.html",
      controller: 'selectCtrl'
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
            only: ['volunteer'],
            redirectTo: 'home'
          }
        }
    }
)
.state('signup', {
      url: '/signup',
      templateUrl: "templates/signup.html",
      controller: 'signup',
      data: {
          permissions: {
            except: ['isloggedin'],
            redirectTo: 'home'
          }
        }
     
     }
  )
.state('myEvents', {
      url: '/myevents/:id',
      templateUrl: "templates/myevents.html",
      controller: 'myEventsCtrl',
      data: {
          permissions: {
            except: ['anonymous'],
            redirectTo: 'events'
          }
        }
    }
  )
.state('contactus', {
      url: '/contactus',
      templateUrl: "templates/contactus.html"
      }
    )
.state('aboutus', {
      url: '/aboutus',
      templateUrl: "templates/aboutus.html"
      }
    )
});


