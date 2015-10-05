/**
 * Created by Koby on 05-Oct-15.
 */
function settingsController($log) {

    var vm = this;
    $log.debug("started settingsController");

    vm.selectedLanguage = "";
    vm.languages = [
        {name: "English", value: "en", id: 0},
        {name: "Hebrew", value: "he", id: 1}
    ];

    vm.onLanguageChange = function (lang) {
        $log.debug("changed language to " + lang);
        vm.selectedLanguage = lang;
    };
}

angular.module('app').controller('settingsController', settingsController);