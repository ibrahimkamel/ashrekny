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
                    response.user.isVolunteer=response.isVolunteer;
                    response.user.role_id=response.role_id;
                    var user = JSON.stringify(response.user);
                    localStorage.setItem('user', user);
                    $rootScope.currentUser = response.user;
                    console.log($rootScope.isVolunteer + " " +$rootScope.role_id);
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
        $scope.participate=function(task){//edit volunteer id
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
        //ajax to post review on an event
        $scope.postreview=function(review,eventID){
            var commentform = review.comment;
            var rateform = review.rate;
            var eventidform = eventID;
            console.log(commentform,eventidform,rateform);
            var postdata = { id : eventidform, volunteer_id : 1 , comment : commentform,rate : rateform}
            var data=JSON.stringify(postdata);
            console.log(postdata);
            modelFactory.getData('post',
            'http://localhost/GP/laravelproject/api/event/'+id+'/addReview',data
            ).then(function successCallback(data){
                    console.log(data);
                    console.log("success");
                },function errorCallback(err){
                    console.log(err);
                    console.log("error");
                 });
            modelFactory.getData('get',
            'http://localhost/GP/laravelproject/api/event/'+id+'/getReviews'
            ).then(function successCallback(data){
                            $scope.eventDetails.reviewsvolunteers = data;
                            // var oneDay = 24*60*60*1000; 
                            // $scope.eventDetails.reviews.diffdate=Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
                            console.log(data);
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
        //ajax to get event's reviews
        modelFactory.getData('get',
            'http://localhost/GP/laravelproject/api/event/'+id+'/getReviews'
            ).then(function successCallback(data){
                            $scope.eventDetails.reviewsvolunteers = data;
                            // var oneDay = 24*60*60*1000; 
                            // $scope.eventDetails.reviews.diffdate=Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
                            console.log(data);
                          },function errorCallback(err){
                            console.log(err);
                        });
})

.controller('addEventCtrl',function($rootScope,$scope,modelFactory,$compile){
    // modelFactory.getData('get', 'http://localhost/GP/laravelproject/api/user/'+$rootScope.currentUser.id+'/getdetails').then(
    //   function(data){
    //     console.log(data.organization.id);
    //     $scope.organization_id = data.organization.id;
    //     console.log("success");
    // },
    //   function(err){
    //     console.log("fail");
    //     console.log(err);
    // });
    
    $scope.add=function(valid){    
    if(valid){
      //Formating Date input like YYYY-MM-DD
        $scope.newEvent.start_date=dateFormate($scope.start_date);
        
        if($scope.end_date){
          $scope.newEvent.end_date=dateFormate($scope.end_date);
        }
    $scope.newEvent.organization_id=3;
    console.log($scope.newEvent);
    if($scope.uploadedFile){
      $scope.newEvent.logo = $scope.uploadedFile;
    }
    var form = new FormData();
    form.append('title', $scope.newEvent.title);
    form.append('description', $scope.newEvent.description);
    form.append('start_date', $scope.newEvent.start_date);
    form.append('end_date', $scope.newEvent.end_date);
    form.append('country', $scope.newEvent.country);
    form.append('city', $scope.newEvent.city);
    form.append('region', $scope.newEvent.region);
    form.append('full_address', $scope.newEvent.region);
    if($scope.newEvent.tasks){
        form.append('tasks', JSON.stringify($scope.newEvent.tasks));
    }
    form.append('logo', $scope.newEvent.logo);
    form.append('organization_id', $rootScope.currentUser.role_id);
    console.log( $scope.newEvent.tasks);
    var tasks = $scope.newEvent.tasks;

    var method = 'post',
        url    = 'http://localhost/GP/laravelproject/api/event/add',
        processData = false,
        transformRequest = angular.identity,
        headers = {'Content-Type': undefined};

    modelFactory.getData(method, url, form, processData, transformRequest, headers).then(
      function(data){
        console.log(data);
        console.log("success");
    },
      function(err){
        console.log("fail");
        console.log(err);
    });
    } 
  }
  
  $scope.no_of_needs = 0;
  
        console.log($rootScope.currentUser);

        console.log($rootScope.currentUser.isVolunteer);
  $scope.add_need=function(){
        console.log($rootScope.isVolunteer);
        $scope.no_of_needs++;
        var need = "<div id='need"+$scope.no_of_needs+"' class='col-md-7 col-md-offset-3'>\
        <div class='col-md-9'>\
        <input ng-model='newEvent.tasks["+$scope.no_of_needs+"].name' name='task' placeholder='الاحتياج' class='wp-form-control wpcf7-text'  type='text'>\
        </div>\
        <div class='col-md-3'>\
        <input ng-model='newEvent.tasks["+$scope.no_of_needs+"].required_volunteers' placeholder='العدد' class='wp-form-control wpcf7-text'  type='text'>\
        </div></div>"
        ;
        $('#needs').append(need);
        var newneed = (angular.element($('#need'+$scope.no_of_needs)));
        $compile(newneed)($scope);
        console.log($scope.newEvent.tasks);
    }
  $scope.uploadLogo=function(file){
     console.log(file[0]);
     $scope.uploadedFile = file[0];
  }
})
.controller('orgProfileCtrl',function($scope,modelFactory,$stateParams){
        var id=$stateParams.id;
        modelFactory.getData('get',
        'http://localhost/GP/laravelproject/api/organization/get/'+id
        ).then(function successCallback(data){
                        $scope.organization = data.organization;
                        // console.log($scope.organization);
                      },function errorCallback(err){
                        console.log(err);
                    });
        modelFactory.getData('get',
        'http://localhost/GP/laravelproject/api/organization/'+id+'/getuser'
        ).then(function successCallback(data){
                        $scope.user = data.user;
                        // console.log($scope.user);
                      },function errorCallback(err){
                        console.log(err);
                    });
        modelFactory.getData('get',
        'http://localhost/GP/laravelproject/api/organization/'+id+'/getcategories'
        ).then(function successCallback(data){
                        $scope.categories = data.categories;
                        // console.log($scope.categories);
                      },function errorCallback(err){
                        console.log(err);
                    });
        modelFactory.getData('get',
        'http://localhost/GP/laravelproject/api/organization/'+id+'/getphones'
        ).then(function successCallback(data){
                        // $scope.phones = data.phones;
                        // console.log($scope.phones);
                      },function errorCallback(err){
                        console.log(err);
                    });
        modelFactory.getData('get',
        'http://localhost/GP/laravelproject/api/organization/'+id+'/getevents'
        ).then(function successCallback(data){
                        $scope.events = data.events;
                         // console.log($scope.events);
                      },function errorCallback(err){
                        console.log(err);
                    });
        modelFactory.getData('get',
        'http://localhost/GP/laravelproject/api/organization/'+id+'/getlinks'
        ).then(function successCallback(data){
                        $scope.links = data.links;
                         // console.log($scope.links);
                      },function errorCallback(err){
                        console.log(err);
                    });
        modelFactory.getData('get',
        'http://localhost/GP/laravelproject/api/organization/'+id+'/getalbum'
        ).then(function successCallback(data){
                        $scope.albums = data.album;
                         console.log($scope.albums);
                      },function errorCallback(err){
                        console.log(err);
                    });
})
.controller('addStoryCtrl',function($rootScope,$scope,modelFactory){
    $scope.add = function(valid){
        if(valid){
            $scope.newStory.volunteer_id = $rootScope.currentUser.role_id;
            var data = $scope.newStory;
            data = JSON.stringify(data);
            console.log(data);
            modelFactory.getData('post',
            'http://localhost/GP/laravelproject/api/story/add',
            data
            ).then(function successCallback(data){
                //console.log(data);
             },function errorCallback(err){
               console.log(err);
          });
        }   
    }
})