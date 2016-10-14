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

            this.saveMap = function (map, toastMessage) {
                for (var i = 0; i < mapsCache.length; i++) {
                    if (mapsCache[i].$id === map.$id) {
                        mapsCache[i] = map;
                        mapsCache.$save(i).then(function (ref) {
                            console.log('saved: ', ref);
                            if (toastMessage) {
                                toastr.success(toastMessage, 'Success');
                            }
                        }, function (err) {
                            // alert("there was an error saving this map", err);
                            console.log(err);
                            toastr.error('An error occurred', 'Error');
                        })
                    }
                    break;
                }
            }

        })

} ());