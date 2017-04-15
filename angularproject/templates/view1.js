angular.module('myApp.view1', [])
 
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('view1', {
    url: '/view1',
    templateUrl: "templates/view1.html",
      controller: 'View1Ctrl'
    }
  )
})
 
.controller('View1Ctrl',function($rootScope){
 
})