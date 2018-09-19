'use strict';

angular.module('myApp.home', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'home/home.html',
    controller: 'homeCtrl'
  });
}])

.controller ('homeCtrl', ['$scope','$sce', 'notificationService', 'regionService', function($scope, $sce, notificationService, regionSvc){

    var promise = regionSvc.getGlobalNotifications("region2");
    promise.then(
        function (payload) {
            if (payload.data) {
                $scope.notificationsGlobalRegion2 = payload.data;
            }
            else {
                $scope.notificationsGlobalRegion2 = [];
            }

            notificationService.registerHandler("ecommNotification", function(e) {
                $scope.notificationsGlobalRegion2.push(JSON.parse(e.data))
                $scope.$apply()
            });
        }
    )

    var promise2 = regionSvc.getGlobalNotifications("region1");
    promise2.then(
        function (payload) {
            if (payload.data) {
                $scope.notificationsGlobalRegion1 = payload.data;
            }
            else {
                $scope.notificationsGlobalRegion1 = [];
            }

            notificationService.registerHandler("acmeNotification", function(e) {
                $scope.notificationsGlobalRegion1.push(JSON.parse(e.data))
                $scope.$apply()
            });
        }
    )

    var promise3 = regionSvc.getLocalNotifications("region2");
    promise3.then(
        function (payload) {
            if (payload.data) {
                $scope.notificationsLocalRegion2 = payload.data;
            }
            else {
                $scope.notificationsLocalRegion2 = [];
            }

            notificationService.registerHandler("ecommLocalNotification", function(e) {
                $scope.notificationsLocalRegion2.push(JSON.parse(e.data))
                $scope.$apply()
            });
        }
    )

    var promise4 = regionSvc.getLocalNotifications("region1");
    promise4.then(
        function (payload) {
            if (payload.data) {
                $scope.notificationsLocalRegion1 = payload.data;
            }
            else {
                $scope.notificationsLocalRegion1 = [];
            }

            notificationService.registerHandler("acmeLocalNotification", function(e) {
                $scope.notificationsLocalRegion1.push(JSON.parse(e.data))
                $scope.$apply()
            });
        }
    )

    $scope.account = {};

    $scope.sendCommand = function (){
        $scope.account.region = 'APAC'
        $scope.account.type = 'Global'
        $scope.account.partner = 'ECOMM'
        regionSvc.sendCommand($scope.account, "region2")
        $scope.account = {};
    }

}]);

