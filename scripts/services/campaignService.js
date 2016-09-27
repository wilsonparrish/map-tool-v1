(function () {
    "use strict";

    angular.module('app')
        .service("campaignService", function ($http, $q, $firebaseAuth, $firebaseObject) {
            
            this.getCampaign = function(id) {
                return { name: 'super duper campaign', id: id }; 
            }
            
        })

} ());