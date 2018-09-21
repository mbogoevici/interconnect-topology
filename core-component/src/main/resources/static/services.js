angular.module('myApp.services', [])

.service ('regionSvc', function ($http){
    var baseurl = 'camel';

    var getCommands = function (region){
        return $http.get(baseurl + "/" + region + "/commands" );
    }

    var sendNotification = function (account, region){
        // deep copy so we can remove the id field on the published data
        return $http.post(baseurl + "/" + region + '/notifications', account)
    }

    var getMetadata = function () {
        return $http.get(baseurl + "/metadata");
    }

    return {
        getCommands : getCommands,
        sendNotification: sendNotification,
        getMetadata : getMetadata
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