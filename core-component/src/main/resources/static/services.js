angular.module('myApp.services', [])

.service ('alertSvcRegion1', function ($rootScope, $http, $interval, region1Svc){
    // START A TIMER TO CALL THE BACKEND FOR MESSAGES
    var DELAY = 3000;  // default time in seconds to update locations

    // CHECK FOR ALERTS EVERY 'DELAY' SECONDS
    var startAlertTimer = function (){
        $interval( function () {
            console.log ('checking for alerts ...');
            // checkForAlerts();
            var promise = region1Svc.getAllCommands();
            promise.then (
                function (payload){
                    $rootScope.$broadcast ('ALERT_REG1', payload.data);
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

.service ('alertSvcRegion2', function ($rootScope, $http, $interval, region2Svc){
    // START A TIMER TO CALL THE BACKEND FOR MESSAGES
    var DELAY = 3000;  // default time in seconds to update locations

    // CHECK FOR ALERTS EVERY 'DELAY' SECONDS
    var startAlertTimer = function (){
        $interval( function () {
            console.log ('checking for alerts ...');
            // checkForAlerts();
            var promise = region2Svc.getAllCommands();
            promise.then (
                function (payload){
                    $rootScope.$broadcast ('ALERT_REG2', payload.data);
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

.service ('region1Svc', function ($http){
    var baseurl = 'camel/region1';

    var commandsUrl = baseurl + "/commands"

    var currentCommand = {};

    var getCurrentCommand = function (commandItem){
        currentCommand = commandItem;
    }

    var getCurrentCommand = function (){
        return currentCommand;
    }

    var getAllCommands = function (){
        return $http.get(commandsUrl);
    }

    var sendNotification = function (account){
        // deep copy so we can remove the id field on the published data
        return $http.post(baseurl + '/notifications', account)
    }

    return {
        getAllCommands : getAllCommands,
        getCurrentCommand : getCurrentCommand,
        sendNotification: sendNotification
    }
})

.service ('region2Svc', function ($http){
    var baseurl = 'camel/region2';

    var commandsUrl = baseurl + "/commands"

    var currentCommand = {};

    var getCurrentCommand = function (commandItem){
        currentCommand = commandItem;
    }

    var getCurrentCommand = function (){
        return currentCommand;
    }

    var getAllCommands = function (){
        return $http.get(commandsUrl);
    }

    var sendNotification = function (account){
        // deep copy so we can remove the id field on the published data
        return $http.post(baseurl + '/notifications', account)
    }

    return {
        getAllCommands : getAllCommands,
        getCurrentCommand : getCurrentCommand,
        sendNotification: sendNotification
    }
})