(function () {
    "use strict";

    angular.module('app')
        .controller('lobbyCtrl', function ($scope, $firebaseArray, $firebaseObject, campaign) {

            var fbref = firebase.database().ref();

            $scope.campaign = campaign;

        })

} ());