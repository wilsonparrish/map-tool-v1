(function () {
    "use strict";

    angular.module('app')
        .controller('lobbyCtrl', function ($scope, $state, $firebaseArray, $firebaseObject, $timeout, campaign, campaignService, mapsService) {

            var fbref = firebase.database().ref();

            $scope.user = JSON.parse(localStorage.getItem('firebaseUser'));

            $scope.savedMaps = mapsService.getMaps();
            $scope.campaign = campaign;
            $scope.$parent.activeCampaign = $scope.campaign;
            $scope.allCampaigns = campaignService.getAllCampaigns();

            $scope.playerIcon = localStorage.getItem('playerIcon') || "";
            $scope.setPlayerIcon = function () {
                localStorage.setItem("playerIcon", $scope.newIconUrl);
                $scope.playerIcon = $scope.newIconUrl;
            }
            $scope.placeIcon = function (iconUrl, idx) {
                $scope.cellsArray.forEach(function (e, i, a) {
                    if (e.occupantIconUrl === iconUrl) {
                        e.occupantIconUrl = "";
                    }
                })
                $scope.cellsArray[idx].occupantIconUrl = iconUrl;
                $scope.activeMap.map = JSON.stringify($scope.cellsArray);
                mapsService.saveMap($scope.activeMap);
            }

            $scope.renderMap = function () {
                $scope.rendering = true;
                $scope.gridSize = $scope.activeMap.gridSize;
                $scope.cellsArray = JSON.parse($scope.activeMap.map);
                $scope.mapWidth = $scope.activeMap.width * $scope.gridSize + 'px';
                $scope.mapHeight = $scope.activeMap.height * $scope.gridSize + 'px';
                for (var i = 0; i < $scope.allCampaigns.length; i++) {
                    if ($scope.allCampaigns[i].name === $scope.campaign.name) {
                        $scope.allCampaigns[i].activeMap = $scope.activeMap.name;
                        $scope.allCampaigns.$save(i).then(function (ref) {
                            console.log('ref,', ref);
                        }, function (err) {
                            console.log('err,', err);
                        })
                    }
                }

                $timeout(function () {
                    $scope.rendering = false;
                }, 500);
            }

            if (!$scope.campaign) {
                $state.go('lobbyBrowser');
            }
            $scope.mapsArray = JSON.parse($scope.campaign.maps);
            $scope.activeMap = getActiveMap();
            if ($scope.activeMap) {
                $scope.renderMap();
            }

            function getActiveMap() {
                var returnMap = null;
                $scope.savedMaps.forEach(function (map) {
                    if (map.name === $scope.campaign.activeMap) {
                        returnMap = map;
                    }
                })
                return returnMap;
            }

            if ($scope.user.user.displayName === $scope.campaign.DM) {
                $scope.isUserDM = true;
            } else {
                $scope.isUserDM = false;
            }
        })

} ());