'use strict';

angular.module('myApp.region1', ['ngRoute'])

.config (['$routeProvider', function ($routeProvider){
    $routeProvider.when ('/region1', {
        templateUrl: 'region1/region1.html',
        controller: 'region1Ctrl'
    });
}])

.controller ('region1Ctrl', ['$scope','$sce', 'notificationService', 'regionSvc', function($scope, $sce, notificationService, regionSvc){
    // EVERY 3 SECONDS; SEE SERVICES.JS 'alertSvc' TO MODIFY

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

    $scope.account = {};


    $scope.sendNotification = function (){
        $scope.account.region = 'NA'
        regionSvc.sendNotification($scope.account, "region1")
        $scope.account = {};
    }


}]);
