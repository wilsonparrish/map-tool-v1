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
                .state('divmap', {
                    url: '/divmap',
                    templateUrl: '../views/divmap.html',
                    controller: 'divmapCtrl'
                })
                .state('divmapMaker', {
                    url: '/divmapMaker',
                    templateUrl: '../views/divmapMaker.html',
                    controller: 'divmapMakerCtrl'
                })
                .state('campaignLobby', {
                    url: '/campaignLobby/:campaignId',
                    templateUrl: '../views/campaignLobby.html',
                    controller: 'lobbyCtrl',
                    resolve: {
                        campaign: function(campaignService, $stateParams){
                            return campaignService.getCampaign($stateParams.campaignId);
                        }
                    }
                })
                .state('lobbyBrowser', {
                    url: '/lobbyBrowser',
                    templateUrl: '../views/lobbyBrowser.html',
                    controller: 'lobbyBrowserCtrl',
                    resolve: {
                        allCampaigns: function(campaignService){
                            return campaignService.getAllCampaigns();
                        }
                    }
                })
        });


} ());