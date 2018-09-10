'use strict';

angular.module('myApp.localRegion1', ['ngRoute'])

.config (['$routeProvider', function ($routeProvider){
    $routeProvider.when ('/localRegion1', {
        templateUrl: 'localRegion1/localRegion1.html',
        controller: 'localRegion1Ctrl'
    });
}])

.controller ('localRegion1Ctrl', ['$scope','$sce', 'alertSvcLocalRegion1', 'localRegion1Svc', function($scope, $sce, alertSvcRegion1, region1Svc){
    // EVERY 3 SECONDS; SEE SERVICES.JS 'alertSvc' TO MODIFY

    alertSvcRegion1.startAlertTimer();
    console.log ('in commands ctrl');

    $scope.$on ('ALERT_REG1_LOCAL', function (event, data){
        $scope.notificationsLocalRegion1 = data;
    })

    $scope.account = {};

    $scope.sendCommand = function (){
        $scope.account.region = 'NA'
        $scope.account.type = 'Local'
        region1Svc.sendCommand($scope.account)
        $scope.account = {};
    }


    // $scope.getCurrentAlert = function (item) {
    //     return JSON.stringify(item, null, 2);
    // }
}]);
