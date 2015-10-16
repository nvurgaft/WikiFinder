/**
 * Created by Koby on 05-Oct-15.
 */
function mainController($log, PreferencesService) {
    var vm = this;

    $log.debug('started mainController');
    vm.collapsed = true;

    vm.selectedLanguage = PreferencesService.getLanguage();

    vm.languageList = PreferencesService.getAllLanguages();

    vm.selectLanguage = function(language) {
        PreferencesService.setLanguage(language);
        vm.selectedLanguage = PreferencesService.getLanguage();
    };

}

angular.module('app').controller('mainController', mainController);