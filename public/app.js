/**
 * Created by Koby on 25-Sep-15.
 */

function config($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/main/entry/linker');
    $stateProvider
        .state('main', {
            url: '/main',
            'abstract': true,
            templateUrl: 'index.html'
        })
        .state('main.entry', {
            url: '/entry',
            templateUrl: 'navigator.html',
            controller: 'mainController as vm'
        })
        .state('main.entry.dashboard', {
            url: '/wikidata-dashboard',
            templateUrl: 'dashboard/dashboard.html',
            controller: 'dashboardController as vm'
        })
        .state('main.entry.viaf-dashboard', {
            url: '/viaf-dashboard',
            templateUrl: 'viaf_dashboard/viaf-dashboard.html',
            controller: 'viafDashboardController as vm'
        })
        .state('main.entry.linker', {
            url: '/linker',
            templateUrl: 'linker/linker.html',
            controller: 'linkerController as vm'
        })
        .state('main.entry.database', {
            url: '/database',
            templateUrl: 'database/database.html',
            controller: 'databaseController as vm'
        })
        .state('main.entry.settings', {
            url: '/settings',
            templateUrl: 'options/settings.html',
            controller: 'settingsController as vm'
        });
}

angular
    .module('app', ['ui.router', 'ui.bootstrap', 'ngSanitize', 'angular-json-tree', 'ngAnimate', 'smart-table'])
    .value("WIKIDATA_SERVICE_API", "./api/wikidata")
    .value("WIKIDATA_PERSISTENT_API", "./api/entities")
    .value("VIAF_API_ROUTE", "./api/viaf")
    .config(config);