'use strict';

angular.module('myApp.region1', ['ngRoute'])

.config (['$routeProvider', function ($routeProvider){
    $routeProvider.when ('/region1', {
        templateUrl: 'region1/region1.html',
        controller: 'region1Ctrl'
    });
}])

.controller ('region1Ctrl', ['$scope','$sce', 'alertSvcRegion1', 'region1Svc', function($scope, $sce, alertSvcRegion1, region1Svc){
    // EVERY 3 SECONDS; SEE SERVICES.JS 'alertSvc' TO MODIFY

    alertSvcRegion1.startAlertTimer();
    console.log ('in commands ctrl');

    $scope.$on ('ALERT_REG1', function (event, data){
        $scope.commandsRegion1 = data;
    })

    $scope.account = {};
    $scope.account.accountId = ''
    $scope.account.payload = ''


    $scope.sendNotification = function (){
        $scope.account.region = 'NA'
        region1Svc.sendNotification($scope.account)
        $scope.account = {};
    }


    // $scope.getCurrentAlert = function (item) {
    //     return JSON.stringify(item, null, 2);
    // }
}]);
