'use strict';
angular.module('myApp.view2', [])
 
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('view2', {
    url: '/view2',
    templateUrl: "templates/view2.html",
      controller: 'View2Ctrl'
    }
  )
})

.controller('View2Ctrl',function($rootScope){
 
});
