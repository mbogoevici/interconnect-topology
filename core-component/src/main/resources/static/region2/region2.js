'use strict';

angular.module('myApp.region2', ['ngRoute'])

.config (['$routeProvider', function ($routeProvider){
    $routeProvider.when ('/region2', {
        templateUrl: 'region2/region2.html',
        controller: 'region2Ctrl'
    });
}])

.controller ('region2Ctrl', ['$scope','$sce', 'notificationService', 'region2Svc', function($scope, $sce, notificationService, regionSvc){

    var promise = regionSvc.getAllCommands();
    promise.then(
        function (payload) {
            $scope.commandsRegion2 = payload.data;

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
        regionSvc.sendNotification($scope.account)
        $scope.account = {};
    }


    // $scope.getCurrentAlert = function (item) {
    //     return JSON.stringify(item, null, 2);
    // }
}]);
