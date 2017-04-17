'use strict';
angular.module('myApp')
.controller('AuthCtrl',function($auth, $state, $http, $rootScope,$scope) {
 		
		$scope.loginError = false;
        $scope.loginErrorText;
        $scope.login = function() {
 
            var credentials = {
                email: $scope.email,
                password: $scope.password
            }
            
            $auth.login(credentials).then(function successCallback() {
                $http.get('http://localhost/GP/laravelproject/api/authenticate/user').success(function successCallback(response){
                    var user = JSON.stringify(response.user);
                    localStorage.setItem('user', user);
                    $rootScope.currentUser = response.user;                   
                    $state.go('profile');
                })
                .error(function errorCallback(){
                    $scope.loginError = true;
                    $scope.loginErrorText = error.data.error;
                    console.log($scope.loginErrorText);
                })
            });
        }
 
})
.controller('HomeCtrl',function($rootScope,modelFactory){
    // modelFactory.getData('get',
    //     'http://localhost/GP/laravelproject/api/organization/getall'
    //     ).then(function successCallback(data){
    //                     // console.log(data);
    //                   },function errorCallback(err){
    //                     console.log(err);
    //                 });
        
    // modelFactory.getData('delete',
    //     'http://localhost/GP/laravelproject/api/organization/delete/18'
    //     ).then(function successCallback(data){
    //                     console.log(data);
    //                   },function errorCallback(err){
    //                     console.log(err);
    //                 });
})
.controller('ProfileCtrl',function($rootScope){
 
})