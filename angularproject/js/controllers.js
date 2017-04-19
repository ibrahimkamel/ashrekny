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
}).controller('signup', function($scope, modelFactory) {

   
$scope.addUser = function(isvaild) {
 
   
    
 
  if (isvaild) {


 var    processData = false,
        transformRequest = angular.identity,
        headers = {'Content-Type': undefined},
    
  formdata= new FormData();
    
    formdata.append("firstName",$scope.user.firstName);
     formdata.append("secondName",$scope.user.secondName);
      formdata.append("gender",$scope.user.gender);
       formdata.append("email",$scope.user.email);
       formdata.append("password",$scope.user.password);
     formdata.append("region",$scope.user.region);
     formdata.append("city",$scope.user.city);
      formdata.append("gender",$scope.user.gender);
      if($scope.profilePic)
     {   formdata.append("profilepic",$scope.profilePic);}
        for (var pair of formdata.entries()) {
    console.log(pair[0]+ ', ' + pair[1]); 
}
   

   modelFactory.getData('post',
    'http://localhost/GP/laravelproject/api/user/add',formdata,processData, transformRequest, headers
   ).then(function(data) {
     if (data.volErrors) {
      $scope.volerror = data.volErrors;
      

     }
     if (data.userErrors) {
      $scope.userAsVolErros = data.userErrors;
      console.log($scope.userAsVolErros);
     
     }
 
    },
    function(err) {

    }); }};


$scope.addOrg = function(isvaild) {
  
    
 
  if (isvaild) {

 var    processData = false,
        transformRequest = angular.identity,
        headers = {'Content-Type': undefined},
    
  formdata= new FormData();
    
    formdata.append("orgName",$scope.org.orgName);
     formdata.append("desc",$scope.org.desc);
      formdata.append("region",$scope.org.region);
       formdata.append("city",$scope.org.city);
       formdata.append("email",$scope.org.email);
       formdata.append("password",$scope.org.password);
      formdata.append("fullAddress",$scope.org.fullAddress);
            formdata.append("officeHours",$scope.org.officeHours);
  formdata.append("license_number",$scope.org.license_number);
      
   if($scope.logo)
     {   formdata.append("logo",$scope.logo);}
        if($scope.license)
     {   formdata.append("licenseScan",$scope.license);}

       
        for (var pair of formdata.entries()) {
    console.log(pair[0]+ ', ' + pair[1]); 
}




   modelFactory.getData('post',
    'http://localhost/GP/laravelproject/api/user/add',formdata,processData, transformRequest, headers
   ).then(function(data) {
    
     if (data.userErrors) {
      $scope.orgAsUserErrors = data.userErrors;
      console.log(data.userErrors);
     }


     if (data.orgErrors) {
      $scope.orgErrors = data.orgErrors;
     }



    },
    function(err) {

    }); }};/////


$scope.setProfilePic=function(file)
{ console.log(file[0]);
  $scope.profilePic=file[0];
  console.log( $scope.profilePic);

}

$scope.setLogo=function(file)
{ console.log(file[0]);
  $scope.logo=file[0];

}

$scope.setLicense=function(file)
{ console.log(file[0]);
  $scope.license=file[0];

}})



  

function dateFormate(myDate){
  var date = myDate.toString().substr(4,11);
  var year = date.slice(-4),
      month = ['Jan','Feb','Mar','Apr','May','Jun',
                 'Jul','Aug','Sep','Oct','Nov','Dec'].indexOf(date.substr(0,3))+1,
        day = date.substr(4,2);
    var formated_date = year + '-' + (month<10?'0':'') + month + '-' + day;   
  return formated_date;
}
