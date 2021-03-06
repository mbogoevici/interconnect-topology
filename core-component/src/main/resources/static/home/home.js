'use strict';

angular.module('myApp.home', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'home/home.html',
    controller: 'homeCtrl'
  });
}])

.controller('homeCtrl', ['$scope','$sce', 'notificationService', 'regionSvc', function($scope, $sce, notificationService, regionSvc) {

    var metadataPromise = regionSvc.getMetadata();
    metadataPromise.then(function (payload) {
        $scope.coreMetadata = payload.data;
    });

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
        $scope.account.region = region;
        regionSvc.sendNotification($scope.account, region === "NAM"? "region1" : "region2");
        $scope.account = {};
    }

    $scope.clearSelection = function (event) {
        angular.element(event.currentTarget).removeClass('selected')
    }
}]);
