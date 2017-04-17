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
    modelFactory.getData('get',
        'http://localhost/GP/laravelproject/api/organization/getall'
        ).then(function successCallback(data){
                        console.log(data);
                      },function errorCallback(err){
                        console.log(err);
                    });
        
    // modelFactory.getData('delete',
    //     'http://localhost/team/laravelproject/api/organization/delete/18'
    //     ).then(function successCallback(data){
    //                     console.log(data);
    //                   },function errorCallback(err){
    //                     console.log(err);
    //                 });
})
.controller('ProfileCtrl',function($rootScope){
 
})
.controller('EventCtrl',function($scope,modelFactory){
        modelFactory.getData('get',
        'http://localhost/GP/laravelproject/api/event/getAll'
        ).then(function successCallback(data){
                        console.log(data);
                        $scope.events = data;
                      },function errorCallback(err){
                        console.log(err);
                    });
})
.controller('EventDetailsCtrl',function($scope,modelFactory,$stateParams){
    var id = $stateParams.id;
        modelFactory.getData('get',
        'http://localhost/GP/laravelproject/api/event/'+id+'/get'
        ).then(function successCallback(data){
                        $scope.eventDetails = data;
                      },function errorCallback(err){
                        console.log(err);
                    });
         modelFactory.getData('get',
        'http://localhost/GP/laravelproject/api/event/'+id+'/getTasks'
        ).then(function successCallback(data){
                        $scope.eventDetails.tasks = data;
                      },function errorCallback(err){
                        console.log(err);
                    });
})
