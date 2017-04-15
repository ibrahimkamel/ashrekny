angular.module('myApp.auth', [])
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('auth', {
    url: '/auth',
    templateUrl: "templates/auth.html",
      controller: 'AuthCtrl'
    }
  )
}])
.controller('AuthCtrl',function($auth, $state, $http, $rootScope,$scope) {
 		
		$scope.loginError = false;
        $scope.loginErrorText;
        $scope.login = function() {
 
            var credentials = {
                email: $scope.email,
                password: $scope.password
            }
            
            $auth.login(credentials).then(function() {
                $http.get('http://localhost/team/laravelproject/api/authenticate/user').success(function(response){
                    var user = JSON.stringify(response.user);
                    localStorage.setItem('user', user);
                    $rootScope.currentUser = response.user;                   
                    $state.go('view2');
                })
                .error(function(){
                    $scope.loginError = true;
                    $scope.loginErrorText = error.data.error;
                    console.log($scope.loginErrorText);
                })
            });
        }
 
});