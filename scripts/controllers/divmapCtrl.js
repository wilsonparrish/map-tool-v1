(function () {
    "use strict";

    angular.module('app')
        .controller('divmapCtrl', function ($scope) {
            
            $scope.cellsArray = [];

            for (var i = 0; i < 1500; i++){
                $scope.cellsArray.push('cell ' + i);
            }

            $scope.mapWidth = (50 * 30) + 'px';

        })

} ());