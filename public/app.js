/**
 * Created by Koby on 25-Sep-15.
 */
'use strict';

function config($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/main/entry/dashboard');
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
            url: '/dashboard',
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
    .module('app', ['ui.router', 'ui.bootstrap', 'ngSanitize', 'angular-json-tree', 'ngAnimate'])
    .value("WIKIDATA_API_ROUTE", "http://localhost:3000/api/wikidata")
    .value("VIAF_API_ROUTE", "http://localhost:3000/api/viaf")
    .config(config);