(function () {
    "use strict";

    angular.module('app')
        .service("campaignService", function ($http, $q, $firebaseArray, $firebaseObject) {

            var fbref = firebase.database().ref();
            var campsRef = fbref.child('campaigns');

            var campsCache = $firebaseArray(campsRef);

            this.getCampaign = function (key) {
                return campsCache.$getRecord(key);
            }

            this.createCampaign = function (camp) {
                var d = $q.defer();
                campsCache.$add(camp).then(function (ref) {
                    console.log(ref.key);
                    d.resolve(ref.key);
                }, function (err) {
                    d.reject(err);
                });
                return d.promise;
            }

            this.getAllCampaigns = function () {
                console.log(campsCache);
                return campsCache;
            }

        })

} ());