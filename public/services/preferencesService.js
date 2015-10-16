/**
 * Created by Koby on 16-Oct-15.
 */
function PreferencesService($log) {

    var languageList = [
        {
            caption: "English",
            value: "en",
            icon : "images/flags/en.png"
        },
        {
            caption: "Hebrew",
            value: "he",
            icon : "images/flags/he.png"
        },
    ];
    var language = languageList[0];

    var service = {
        getAllLanguages: function() {
            return languageList;
        },
        getLanguage: function() {
            $log.debug("language: " + JSON.stringify(language));
            return language;
        },
        setLanguage: function(lang) {
            var r = _.find(languageList, function(item) {
                if (_.isEqual(item.value, lang.value)) {
                    language = item;
                    return true;
                } else return false;
            });
            $log.debug("language set to: " + JSON.stringify(language));
            return r;
        }
    };
    return service;
}

angular.module('app').service('PreferencesService', PreferencesService);