'use strict';

angular.module('myApp.region2', ['ngRoute'])

.config (['$routeProvider', function ($routeProvider){
    $routeProvider.when ('/region2', {
        templateUrl: 'region2/region2.html',
        controller: 'region2Ctrl'
    });
}])

.controller ('region2Ctrl', ['$scope','$sce', 'alertSvcRegion2', 'region2Svc', function($scope, $sce, alertSvcRegion2, region2Svc){
    // EVERY 3 SECONDS; SEE SERVICES.JS 'alertSvc' TO MODIFY
    alertSvcRegion2.startAlertTimer();
    console.log ('in commands ctrl');

    $scope.$on ('ALERT_REG2', function (event, data){
        $scope.commandsRegion2 = data;
    })

    $scope.account = {};
    $scope.account.accountId = ''

    $scope.sendNotification = function (){
        region2Svc.sendNotification($scope.account)
        $scope.account = {};
    }


    // $scope.getCurrentAlert = function (item) {
    //     return JSON.stringify(item, null, 2);
    // }
}]);
