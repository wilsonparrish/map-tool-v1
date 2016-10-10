(function () {
    "use strict";

    angular.module('app')
        .controller('lobbyBrowserCtrl', function ($scope, $firebaseArray, $firebaseObject, allCampaigns, $filter, mapsService, campaignService, $rootScope) {

            var fbref = firebase.database().ref();

            $scope.user = JSON.parse(localStorage.getItem('firebaseUser'));
            $scope.allCampaigns = allCampaigns;
            $scope.savedMaps = mapsService.getMaps();
            $scope.newCampaignRef = null;

            $scope.getCampaignKey = function(camp) {
                var key = $scope.allCampaigns.$keyAt(camp);
                // $rootScope.$broadcast('Update Active Campaign Key', key);
                // $rootScope.$broadcast('Update Active Campaign', camp);
                camp.key = key;
                return key;
            }

            $scope.createNewCampaign = function(newCamp) {
                if(!newCamp) {
                    return alert('You must set a name');
                }
                newCamp.DM = $scope.user.user.displayName;
                newCamp.maps = [];
                for(var i = 0; i < $scope.savedMaps.length; i++) {
                    if ($scope.savedMaps[i].selected) {
                        newCamp.maps.push($scope.savedMaps[i].name);
                        $scope.savedMaps[i].selected = false;
                    }
                }
                newCamp.maps = JSON.stringify(newCamp.maps);

                // Calls the create method and then sets the returned ref to scope
                $scope.newCampaignRef = campaignService.createCampaign(newCamp);
                setTimeout(function(){
                    console.log($scope.newCampaignRef);
                }, 3000);
            }

            // All this crap manages the table functionality
            $scope.currentPage = 0;
            $scope.pageSize = 10;
            $scope.campaignSearchTerm = '';
            $scope.getData = function () {
                return $filter('filter')($scope.allCampaigns, $scope.campaignSearchTerm);
            }
            $scope.numberOfPages = function () {
                return Math.ceil($scope.getData().length / $scope.pageSize);
            }

        })

} ());