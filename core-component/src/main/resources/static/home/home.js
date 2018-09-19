'use strict';

angular.module('myApp.home', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'home/home.html',
    controller: 'homeCtrl'
  });
}])

.controller('homeCtrl', ['$scope','$sce', 'notificationService', 'regionSvc', function($scope, $sce, notificationService, regionSvc) {

   var promise = regionSvc.getCommands("region1");
    promise.then(
        function (payload) {
            $scope.commandsRegion1 = payload.data ? payload.data : [];

            notificationService.registerHandler("namCommand", function(e) {
                $scope.commandsRegion1.push(JSON.parse(e.data))
                $scope.$apply()
            });
        }
    )

    var promise2 = regionSvc.getCommands("region2");
    promise2.then(
        function (payload) {
            $scope.commandsRegion2 = payload.data ? payload.data : [];

            notificationService.registerHandler("apacCommand", function(e) {
                $scope.commandsRegion2.push(JSON.parse(e.data))
                $scope.$apply()
            });
        }
    )

    $scope.account = {};

    $scope.sendNotification = function (region){
        $scope.account.region = region === "region1"? "NA" : "APAC";
        regionSvc.sendNotification($scope.account, region)
        $scope.account = {};
    }

    $scope.clearSelection = function (event) {
        angular.element(event.currentTarget).removeClass('selected')
    }
}]);
