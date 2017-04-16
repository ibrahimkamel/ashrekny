'use strict';
angular.module("myApp").factory("modelFactory",function($http,$q){
    return{ 
             getData: function(ajaxMethod,ajaxUrl,ajaxData,ajaxContentType){
                 var defer=$q.defer();
                 $http({
                      method: ajaxMethod,
                      url: ajaxUrl,
                      data: ajaxData,
                      contentType: ajaxContentType,
                 }).then(function successCallback(res){
                        defer.resolve(res.data);
                      },function errorCallback(err){
                        defer.reject(err.data);
                    });
                 return defer.promise;
              }
          }
});