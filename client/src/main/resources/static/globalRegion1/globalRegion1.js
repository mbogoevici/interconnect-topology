'use strict';

angular.module('myApp.globalRegion1', ['ngRoute'])

.config (['$routeProvider', function ($routeProvider){
    $routeProvider.when ('/globalRegion1', {
        templateUrl: 'globalRegion1/globalRegion1.html',
        controller: 'globalRegion1Ctrl'
    });
}])

.controller ('globalRegion1Ctrl', ['$scope','$sce', 'notificationService', 'globalRegion1Svc', function($scope, $sce, notificationService, regionSvc){
    // EVERY 3 SECONDS; SEE SERVICES.JS 'alertSvc' TO MODIFY

    console.log ('in commands ctrl');

    var promise = regionSvc.getAllNotifications();
    promise.then(
        function (payload) {
            $scope.notificationsGlobalRegion1 = payload.data;

            notificationService.registerHandler("acmeNotification", function(e) {
                $scope.notificationsGlobalRegion1.push(JSON.parse(e.data))
                $scope.$apply()
            });
        }
    )


    $scope.account = {};

    $scope.sendCommand = function (){
        $scope.account.region = 'NA'
        $scope.account.type = 'Global'
        $scope.account.partner = 'ACME'
        regionSvc.sendCommand($scope.account)
        $scope.account = {};
    }

}]);
