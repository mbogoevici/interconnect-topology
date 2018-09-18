'use strict';

angular.module('myApp.globalRegion2', ['ngRoute'])

.config (['$routeProvider', function ($routeProvider){
    $routeProvider.when ('/globalRegion2', {
        templateUrl: 'globalRegion2/globalRegion2.html',
        controller: 'globalRegion2Ctrl'
    });
}])

.controller ('globalRegion2Ctrl', ['$scope','$sce', 'alertSvcGlobalRegion2', 'globalRegion2Svc', function($scope, $sce, alertSvc, regionSvc){
    // EVERY 3 SECONDS; SEE SERVICES.JS 'alertSvc' TO MODIFY

    alertSvc.startAlertTimer();
    console.log ('in commands ctrl');

    $scope.$on ('ALERT_REG2_GLOBAL', function (event, data){
        $scope.notificationsGlobalRegion2 = data;
    })

    $scope.account = {};

    $scope.sendCommand = function (){
        $scope.account.region = 'APAC'
        $scope.account.type = 'Global'
        $scope.account.partner = 'ECOMM'
        regionSvc.sendCommand($scope.account)
        $scope.account = {};
    }


    // $scope.getCurrentAlert = function (item) {
    //     return JSON.stringify(item, null, 2);
    // }
}]);
