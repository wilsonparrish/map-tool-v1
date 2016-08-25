(function () {
    "use strict";

    angular.module('app')
        .config(function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/');

            $stateProvider
                .state('home', {
                    url: '/',
                    templateUrl: '../views/home.html'
                })
                .state('gridmap', {
                    url: '/gridmap',
                    templateUrl: '../views/gridmap.html',
                    controller: 'mapCtrl'
                })
                .state('divmap', {
                    url: '/divmap',
                    templateUrl: '../views/divmap.html',
                    controller: 'divmapCtrl'
                })

        });


} ());