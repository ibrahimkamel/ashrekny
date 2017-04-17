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
        //ajax to let volunteer participate in an event's task
        $scope.participate=function(task){
            var data = {volunteer_id : 1 , task_id : task.id}
            console.log(data);
            modelFactory.getData('post',
            'http://localhost/GP/laravelproject/api/task/participate',data
            ).then(function successCallback(data){
                task.required_volunteers= data.required_volunteers;
                task.going_volunteers = data.going_volunteers;
                },function errorCallback(err){
                    console.log(err);
                 });
        }; 
        //ajax to let volunteer cancel his participation in an event's task
        $scope.cancelparticipate=function(task){
            var data = {volunteer_id : 1 , task_id : task.id}
            console.log(data);
            modelFactory.getData('post',
            'http://localhost/GP/laravelproject/api/task/cancelparticipate',data
            ).then(function successCallback(data){
                task.required_volunteers= data.required_volunteers;
                task.going_volunteers = data.going_volunteers;
                },function errorCallback(err){
                    console.log(err);
                 });
        }; 
        //ajax request to get event's details      
        modelFactory.getData('get',
            'http://localhost/GP/laravelproject/api/event/'+id+'/get'
            ).then(function successCallback(data){
                            $scope.eventDetails = data;
                          },function errorCallback(err){
                            console.log(err);
                        });
        //ajax request to get the organization that created the event
        modelFactory.getData('get',
            'http://localhost/GP/laravelproject/api/event/'+id+'/getOrganization'
            ).then(function successCallback(data){
                            $scope.eventDetails.organization = data;
                          },function errorCallback(err){
                            console.log(err);
                        });
        //ajax request to get event's tasks
        modelFactory.getData('get',
            'http://localhost/GP/laravelproject/api/task/'+id+'/get'
            ).then(function successCallback(data){
                            $scope.eventDetails.tasks = data;
                          },function errorCallback(err){
                            console.log(err);
                        });
        //ajax request to get event's categories
        modelFactory.getData('get',
            'http://localhost/GP/laravelproject/api/event/'+id+'/getCategories'
            ).then(function successCallback(data){
                            $scope.eventDetails.categories = data;
                            console.log(data);
                          },function errorCallback(err){
                            console.log(err);
                        });
})

