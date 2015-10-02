/**
 * Created by Koby on 25-Sep-15.
 */
'use strict';

function config($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/main/dashboard');
    $stateProvider
        .state('main', {
            url: '/main',
            'abstract': true,
            templateUrl: 'index.html'
        })
        .state('main.dashboard', {
            url: '/dashboard',
            templateUrl: 'dashboard/dashboard.html',
            controller: 'dashboardController as vm'
        });
}

angular
    .module('app', ['ui.router', 'ui.bootstrap', 'ngSanitize', 'ngPrettyJson'])
    .value("WIKIDATA_API_ROUTE", "http://localhost:3000/api/wikidata")
    .value("VIAF_API_ROUTE", "/api/viaf")
    .config(config);