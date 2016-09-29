(function () {
    "use strict";

    angular.module('app')
        .controller('lobbyBrowserCtrl', function ($scope, $firebaseArray, $firebaseObject, allCampaigns, $filter) {

            var fbref = firebase.database().ref();

            $scope.allCampaigns = allCampaigns;
            $scope.currentPage = 0;
            $scope.pageSize = 10;
            $scope.campaignSearchTerm = '';

            $scope.getData = function () {
                return $filter('filter')($scope.allCampaigns, $scope.campaignSearchTerm)
            }

            $scope.numberOfPages = function () {
                return Math.ceil($scope.getData().length / $scope.pageSize);
            }

        })

} ());