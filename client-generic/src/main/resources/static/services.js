angular.module('myApp.services', [])

.service('regionService', function ($http) {
    var baseurl = 'camel';

    var globalNotificationsSuffix = 'notifications/global';

    var localNotificationsSuffix = 'notifications/local';

    var getGlobalNotifications = function () {
        return $http.get(baseurl + "/" + globalNotificationsSuffix);
    }

    var getLocalNotifications = function (region) {
        return $http.get(baseurl + "/" + localNotificationsSuffix);
    }

    var getMetadata = function () {
        return $http.get(baseurl + "/metadata" );
    }

    var sendCommand = function (account, targetRegion) {
        return $http.post(baseurl + "/" + "commands/" + targetRegion, account)
    }


    return {
        getGlobalNotifications: getGlobalNotifications,
        getLocalNotifications: getLocalNotifications,
        sendCommand: sendCommand,
        getMetadata: getMetadata
    }
})


.service('notificationService', function () {

    var eventServiceUrl = 'eventStream'

    const eventSource = new EventSource(eventServiceUrl)

    var registerHandler = function (eventName, handler) {
        eventSource.addEventListener(eventName, handler, false)
    }

    return {
        registerHandler: registerHandler
    }

})