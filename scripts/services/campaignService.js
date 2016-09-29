(function () {
    "use strict";

    angular.module('app')
        .service("campaignService", function ($http, $q, $firebaseAuth, $firebaseObject) {

            this.getCampaign = function (id) {
                return { name: 'super duper campaign', id: id };
            }

            this.getAllCampaigns = function () {
                return [
                    {
                        name: 'Neverwinter Nights',
                        DM: 'Caketown',
                        id: 1
                    },
                    {
                        name: 'Shadows of Anauroch',
                        DM: 'Scoot',
                        id: 2
                    },
                    {
                        name: 'Sons of Gruumsh',
                        DM: 'NyanPudge',
                        id: 3
                    },{
                        name: 'Neverwinter Nights',
                        DM: 'Caketown',
                        id: 1
                    },
                    {
                        name: 'Shadows of Anauroch',
                        DM: 'Scoot',
                        id: 2
                    },
                    {
                        name: 'Sons of Gruumsh',
                        DM: 'NyanPudge',
                        id: 3
                    },
                ]
            }

        })

} ());