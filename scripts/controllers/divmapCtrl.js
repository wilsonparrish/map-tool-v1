(function () {
    "use strict";

    angular.module('app')
        .controller('divmapCtrl', function ($scope, $timeout) {

            $scope.cellsArray = [];
            $scope.mapWidth = (30 * 30) + 'px';
            $scope.mapHeight = (20 * 30) + 'px';

            function renderMap() {
                $scope.rendering = true;
                for (var i = 0; i < 600; i++) {
                    var ranCol = Math.random();
                    if (ranCol < .33) {
                        ranCol = 'blue';
                    } else if (ranCol < .67) {
                        ranCol = 'red';
                    } else {
                        ranCol = 'yellow';
                    }
                    $scope.cellsArray.push({ background: ranCol });
                }
                $timeout(function(){
                    $scope.rendering = false;
                }, 1500);
            }

            renderMap();


        })

} ());