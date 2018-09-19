'use strict';

angular.module('myApp.globalRegion2', ['ngRoute'])

.config (['$routeProvider', function ($routeProvider){
    $routeProvider.when ('/globalRegion2', {
        templateUrl: 'globalRegion2/globalRegion2.html',
        controller: 'globalRegion2Ctrl'
    });
}])

.controller ('globalRegion2Ctrl', ['$scope','$sce', 'notificationService', 'globalRegion2Svc', function($scope, $sce, notificationService, regionSvc){

    var promise = regionSvc.getAllNotifications();
    promise.then(
        function (payload) {
            $scope.notificationsGlobalRegion2 = payload.data;

            notificationService.registerHandler("ecommNotification", function(e) {
                $scope.notificationsGlobalRegion2.push(JSON.parse(e.data))
                $scope.$apply()
            });
        }
    )

    $scope.account = {};

    $scope.sendCommand = function (){
        $scope.account.region = 'APAC'
        $scope.account.type = 'Global'
        $scope.account.partner = 'ECOMM'
        regionSvc.sendCommand($scope.account)
        $scope.account = {};
    }

}]);
