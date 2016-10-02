(function () {
    "use strict";

    angular.module('app')
        .controller('lobbyCtrl', function ($scope, $firebaseArray, $firebaseObject, campaign) {

            var fbref = firebase.database().ref();

            $scope.user = JSON.parse(localStorage.getItem('firebaseUser'));

            var mapsRef = fbref.child("savedMaps");
            $scope.savedMaps = $firebaseArray(mapsRef);
            $scope.campaign = campaign;


            //placeholder temp crap
            $scope.isUserDM = false;
        })

} ());