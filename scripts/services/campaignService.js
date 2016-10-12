(function () {
    "use strict";

    angular.module('app')
        .service("campaignService", function ($http, $q, $firebaseArray, $firebaseObject) {

            var fbref = firebase.database().ref();
            var campsRef = fbref.child('campaigns');

            var campsCache = $firebaseArray(campsRef);

            this.getCampaign = function (key) {
                var campaign = campsCache.$getRecord(key);
                return campaign;
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

            this.saveCampaign = function (campaign, toastMessage) {
                for (var i = 0; i < campsCache.length; i++) {
                    if (campsCache[i].$id === campaign.$id) {
                        campsCache[i] = campaign;
                        campsCache.$save(i).then(function (ref) {
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