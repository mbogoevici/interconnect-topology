angular.module('myApp.services', [])

.service ('alertSvcGlobalRegion1', function ($rootScope, $http, $interval, globalRegion1Svc){
    // START A TIMER TO CALL THE BACKEND FOR MESSAGES
    var DELAY = 3000;  // default time in seconds to update locations

    // CHECK FOR ALERTS EVERY 'DELAY' SECONDS
    var startAlertTimer = function (){
        $interval( function () {
            console.log ('checking for alerts ...');
            // checkForAlerts();
            var promise = globalRegion1Svc.getAllNotifications();
            promise.then (
                function (payload){
                    $rootScope.$broadcast ('ALERT_REG1_GLOBAL', payload.data);
                }                
            )
        }, DELAY);
    }

    return {
        startAlertTimer : startAlertTimer
    }
})

.service ('globalRegion1Svc', function ($http){
    var baseurl = 'camel/region1/notifications/global';

    var currentAlert = {};

    var setCurrentAlert = function (alertItem){
        currentAlert = alertItem;
    }

    var getCurrentAlert = function (){
        return currentAlert;
    }

    var getAllNotifications = function (){
        return $http.get(baseurl);
    }

    var sendCommand = function (account){
        // deep copy so we can remove the id field on the published data
        return $http.post('camel/region1/commands/global', account)
    }


    return {
        getAllNotifications : getAllNotifications,
        getCurrentAlert : getCurrentAlert,
        setCurrentAlert : setCurrentAlert,
        sendCommand: sendCommand
    }
})

    .service ('alertSvcGlobalRegion2', function ($rootScope, $http, $interval, globalRegion2Svc){
        // START A TIMER TO CALL THE BACKEND FOR MESSAGES
        var DELAY = 3000;  // default time in seconds to update locations

        // CHECK FOR ALERTS EVERY 'DELAY' SECONDS
        var startAlertTimer = function (){
            $interval( function () {
                console.log ('checking for alerts ...');
                // checkForAlerts();
                var promise = globalRegion2Svc.getAllNotifications();
                promise.then (
                    function (payload){
                        $rootScope.$broadcast ('ALERT_REG2_GLOBAL', payload.data);
                    }
                )
            }, DELAY);
        }

        var checkForAlerts = function (){

            var level = Math.floor(Math.random() * 10) + 1
            if (level > 7){
                var alertIndex = Math.floor(Math.random() * 3) + 0
                var data = messages[alertIndex];
                data.timestamp = new Date().getTime();
                $rootScope.$broadcast ('SYSTEM_ALERT', data);
            }
        }
        return {
            startAlertTimer : startAlertTimer
        }
    })

    .service ('globalRegion2Svc', function ($http){
        var baseurl = 'camel/region2/notifications/global';

        var currentAlert = {};

        var setCurrentAlert = function (alertItem){
            currentAlert = alertItem;
        }

        var getCurrentAlert = function (){
            return currentAlert;
        }

        var getAllNotifications = function (){
            return $http.get(baseurl);
        }

        var sendCommand = function (account){
            // deep copy so we can remove the id field on the published data
            return $http.post('camel/region2/commands/global', account)
        }


        return {
            getAllNotifications : getAllNotifications,
            getCurrentAlert : getCurrentAlert,
            setCurrentAlert : setCurrentAlert,
            sendCommand: sendCommand
        }
    })

    .service ('alertSvcLocalRegion1', function ($rootScope, $http, $interval, localRegion1Svc){
        // START A TIMER TO CALL THE BACKEND FOR MESSAGES
        var DELAY = 3000;  // default time in seconds to update locations

        // CHECK FOR ALERTS EVERY 'DELAY' SECONDS
        var startAlertTimer = function (){
            $interval( function () {
                console.log ('checking for alerts ...');
                // checkForAlerts();
                var promise = localRegion1Svc.getAllNotifications();
                promise.then (
                    function (payload){
                        $rootScope.$broadcast ('ALERT_REG1_LOCAL', payload.data);
                    }
                )
            }, DELAY);
        }

        var checkForAlerts = function (){

            var level = Math.floor(Math.random() * 10) + 1
            if (level > 7){
                var alertIndex = Math.floor(Math.random() * 3) + 0
                var data = messages[alertIndex];
                data.timestamp = new Date().getTime();
                $rootScope.$broadcast ('SYSTEM_ALERT', data);
            }
        }
        return {
            startAlertTimer : startAlertTimer
        }
    })

    .service ('localRegion1Svc', function ($http){
        var baseurl = 'camel/region1/notifications/local';

        var currentAlert = {};

        var setCurrentAlert = function (alertItem){
            currentAlert = alertItem;
        }

        var getCurrentAlert = function (){
            return currentAlert;
        }

        var getAllNotifications = function (){
            return $http.get(baseurl);
        }

        var sendCommand = function (account){
            // deep copy so we can remove the id field on the published data
            return $http.post('camel/region1/commands/local', account)
        }


        return {
            getAllNotifications : getAllNotifications,
            getCurrentAlert : getCurrentAlert,
            setCurrentAlert : setCurrentAlert,
            sendCommand: sendCommand
        }
    })

    .service ('alertSvcLocalRegion2', function ($rootScope, $http, $interval, localRegion2Svc){
        // START A TIMER TO CALL THE BACKEND FOR MESSAGES
        var DELAY = 3000;  // default time in seconds to update locations

        // CHECK FOR ALERTS EVERY 'DELAY' SECONDS
        var startAlertTimer = function (){
            $interval( function () {
                console.log ('checking for alerts ...');
                // checkForAlerts();
                var promise = localRegion2Svc.getAllNotifications();
                promise.then (
                    function (payload){
                        $rootScope.$broadcast ('ALERT_REG2_LOCAL', payload.data);
                    }
                )
            }, DELAY);
        }

        var checkForAlerts = function (){

            var level = Math.floor(Math.random() * 10) + 1
            if (level > 7){
                var alertIndex = Math.floor(Math.random() * 3) + 0
                var data = messages[alertIndex];
                data.timestamp = new Date().getTime();
                $rootScope.$broadcast ('SYSTEM_ALERT', data);
            }
        }
        return {
            startAlertTimer : startAlertTimer
        }
    })

    .service ('localRegion2Svc', function ($http){
        var baseurl = 'camel/region2/notifications/local';

        var currentAlert = {};

        var setCurrentAlert = function (alertItem){
            currentAlert = alertItem;
        }

        var getCurrentAlert = function (){
            return currentAlert;
        }

        var getAllNotifications = function (){
            return $http.get(baseurl);
        }

        var sendCommand = function (account){
            // deep copy so we can remove the id field on the published data
            return $http.post('camel/region2/commands/local', account)
        }


        return {
            getAllNotifications : getAllNotifications,
            getCurrentAlert : getCurrentAlert,
            setCurrentAlert : setCurrentAlert,
            sendCommand: sendCommand
        }
    })