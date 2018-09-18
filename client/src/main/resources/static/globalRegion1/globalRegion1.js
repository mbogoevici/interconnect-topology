'use strict';

angular.module('myApp.globalRegion1', ['ngRoute'])

.config (['$routeProvider', function ($routeProvider){
    $routeProvider.when ('/globalRegion1', {
        templateUrl: 'globalRegion1/globalRegion1.html',
        controller: 'globalRegion1Ctrl'
    });
}])

.controller ('globalRegion1Ctrl', ['$scope','$sce', 'alertSvcGlobalRegion1', 'globalRegion1Svc', function($scope, $sce, alertSvc, regionSvc){
    // EVERY 3 SECONDS; SEE SERVICES.JS 'alertSvc' TO MODIFY

    alertSvc.startAlertTimer();
    console.log ('in commands ctrl');

    $scope.$on ('ALERT_REG1_GLOBAL', function (event, data){
        $scope.notificationsGlobalRegion1 = data;
    })

    $scope.account = {};

    $scope.sendCommand = function (){
        $scope.account.region = 'NA'
        $scope.account.type = 'Global'
        $scope.account.partner = 'ACME'
        regionSvc.sendCommand($scope.account)
        $scope.account = {};
    }



    // $scope.getCurrentAlert = function (item) {
    //     return JSON.stringify(item, null, 2);
    // }
}]);
