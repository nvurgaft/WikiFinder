/**
 * Created by Koby on 05-Oct-15.
 */
function settingsService($log) {

    var vm = this;
    $log.debug("started settingsService");

    var serviceName = 'settingsService';

    return {

    };
}

angular.module('app').factory('settingsService', settingsService);