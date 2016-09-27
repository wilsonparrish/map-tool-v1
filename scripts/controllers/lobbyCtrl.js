(function () {
    "use strict";

    angular.module('app')
        .controller('lobbyCtrl', function ($scope, $firebaseArray, $firebaseObject, campaign) {

            $scope.campaign = campaign;

        })

} ());