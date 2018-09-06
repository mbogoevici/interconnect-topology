'use strict';

angular.module('myApp.localRegion2', ['ngRoute'])

.config (['$routeProvider', function ($routeProvider){
    $routeProvider.when ('/localRegion2', {
        templateUrl: 'localRegion2/localRegion2.html',
        controller: 'localRegion2Ctrl'
    });
}])

.controller ('localRegion2Ctrl', ['$scope','$sce', 'alertSvcLocalRegion2', 'localRegion2Svc', function($scope, $sce, alertSvcRegion2, region2Svc){
    // EVERY 3 SECONDS; SEE SERVICES.JS 'alertSvc' TO MODIFY
    alertSvcRegion2.startAlertTimer();
    console.log ('in commands ctrl');

    $scope.$on ('ALERT_REG2_LOCAL', function (event, data){
        $scope.notificationsLocalRegion2 = data;
    })

    $scope.account = {};

    $scope.sendCommand = function (){
        region2Svc.sendCommand($scope.account)
    }


    // $scope.getCurrentAlert = function (item) {
    //     return JSON.stringify(item, null, 2);
    // }
}]);
