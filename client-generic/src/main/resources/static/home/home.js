'use strict';

angular.module('myApp.home', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/home', {
            templateUrl: 'home/home.html',
            controller: 'homeCtrl'
        });
    }])

    .controller('homeCtrl', ['$scope', '$sce', 'notificationService', 'regionService', function ($scope, $sce, notificationService, regionSvc) {

        var metadataPromise = regionSvc.getMetadata();
        metadataPromise.then(function (payload) {
            $scope.partnerMetadata = payload.data;
        });

        var promise = regionSvc.getGlobalNotifications();
        promise.then(
            function (payload) {
                if (payload.data) {
                    $scope.notificationsGlobal = payload.data;
                }
                else {
                    $scope.notificationsGlobal = [];
                }

                notificationService.registerHandler("globalNotification", function (e) {
                    $scope.notificationsGlobal.push(JSON.parse(e.data))
                    $scope.$apply()
                });
            }
        )

        var promise2 = regionSvc.getLocalNotifications();
        promise2.then(
            function (payload) {
                if (payload.data) {
                    $scope.notificationsLocal = payload.data;
                }
                else {
                    $scope.notificationsLocal = [];
                }

                notificationService.registerHandler("localNotification", function (e) {
                    $scope.notificationsLocal.push(JSON.parse(e.data))
                    $scope.$apply()
                });
            }
        )

        $scope.account = {};

        $scope.sendCommand = function (targetRegion) {
            $scope.account.region = $scope.partnerMetadata.localRegion.toUpperCase()
            $scope.account.type = targetRegion === 'local' ? 'Local' : 'Cross-Region'
            $scope.account.partner = $scope.partnerMetadata.partner
            regionSvc.sendCommand($scope.account, targetRegion)
            $scope.account = {};
        }

        $scope.clearSelection = function (event) {
            angular.element(event.currentTarget).removeClass('selected')
        }

        $scope.displayName = function(value) {
            return value ? value.charAt(0).toUpperCase() + value.substr(1) : ""
        }

        $scope.upper = function(value) {
            return value ? value.toUpperCase() : ""
        }

    }]);

