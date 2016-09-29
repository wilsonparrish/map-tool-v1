(function () {
    "use strict";

    angular.module('app')
        .controller('lobbyBrowserCtrl', function ($scope, $firebaseArray, $firebaseObject, allCampaigns) {

            var fbref = firebase.database().ref();

            $scope.allCampaigns = allCampaigns;

        })

} ());