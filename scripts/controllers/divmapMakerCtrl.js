(function () {
    "use strict";

    angular.module('app')
        .controller('divmapMakerCtrl', function ($scope, $timeout) {

            $scope.cellsArray = [];
            $scope.mapWidth;
            $scope.mapHeight;

            $scope.createMap = function () {
                $scope.mapWidth = $scope.mapDivWidth * 30 + 'px';
                $scope.mapHeight = $scope.mapDivHeight * 30 + 'px';
                if ($scope.mapDivHeight > 0 && $scope.mapDivWidth > 0) {
                    $scope.rendering = true;
                    var mapSize = $scope.mapDivWidth * $scope.mapDivHeight;
                    $scope.cellsArray = [];
                    // if ($scope.cellsArray.length === 0) {
                        for (var i = 0; i < mapSize; i++) {
                            $scope.cellsArray.push({});
                        }
                    // }
                    $timeout(function () {
                        $scope.rendering = false;
                    }, 1500);
                }
            }

        })

} ());