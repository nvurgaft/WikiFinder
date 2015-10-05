/**
 * Created by Koby on 05-Oct-15.
 */
function mainController($log) {
    var vm = this;

    $log.debug('started mainController');

    vm.languages = [
        {lang: "english", value:0},
        {lang: "hebrew", value:1}
    ];

    vm.onLanguageChange = function(lang) {
        $log.debug("changed language to " + lang);
    };
}

angular.module('app').controller('mainController', mainController);