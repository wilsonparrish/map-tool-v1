(function () {
    "use strict";

    angular.module('app')
        .controller('divmapCtrl', function ($scope, $timeout) {
            
            $scope.cellsArray = [];
            $scope.mapWidth = (50 * 30) + 'px';

            function renderMap() {
                $scope.rendering = true;
                for (var i = 0; i < 1500; i++) {
                    $scope.cellsArray.push('cell ' + i);
                }
                $timeout(function(){
                    $scope.rendering = false;
                }, 3000);
            }

            renderMap();


        })

} ());