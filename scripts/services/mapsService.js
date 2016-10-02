(function () {
    "use strict";

    angular.module('app')
        .service("mapsService", function ($http, $q, $firebaseArray, $firebaseObject) {

            var fbref = firebase.database().ref();
            var mapsRef = fbref.child("savedMaps");

            var mapsCache = $firebaseArray(mapsRef);

            this.getMaps = function () {
                return mapsCache;
            }

        })

} ());