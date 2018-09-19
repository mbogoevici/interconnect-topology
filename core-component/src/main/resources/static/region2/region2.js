'use strict';

angular.module('myApp.region2', ['ngRoute'])

.config (['$routeProvider', function ($routeProvider){
    $routeProvider.when ('/region2', {
        templateUrl: 'region2/region2.html',
        controller: 'region2Ctrl'
    });
}])

.controller ('region2Ctrl', ['$scope','$sce', 'notificationService', 'regionSvc', function($scope, $sce, notificationService, regionSvc){

    var promise = regionSvc.getCommands("region2");
    promise.then(
        function (payload) {
            $scope.commandsRegion2 = payload.data ? payload.data : [];

            notificationService.registerHandler("apacCommand", function(e) {
                $scope.commandsRegion2.push(JSON.parse(e.data))
                $scope.$apply()
            });
        }
    )

    $scope.account = {};
    $scope.account.accountId = ''
    $scope.account.payload = ''

    $scope.sendNotification = function (){
        $scope.account.region = 'APAC'
        regionSvc.sendNotification($scope.account, "region2")
        $scope.account = {};
    }


    // $scope.getCurrentAlert = function (item) {
    //     return JSON.stringify(item, null, 2);
    // }
}]);
