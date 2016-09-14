(function () {
    "use strict";

    angular.module('app')
        .controller('divmapMakerCtrl', function ($scope, $timeout) {

            $scope.cellsArray = [];
            $scope.mapWidth;
            $scope.mapHeight;
            $scope.activeColor;
            var cachedHeight;
            var cachedWidth;

            $scope.createMap = function () {
                $scope.mapWidth = $scope.mapDivWidth * 30 + 'px';
                $scope.mapHeight = $scope.mapDivHeight * 30 + 'px';
                $scope.cellsArray = [];
                if ($scope.mapDivHeight > 0 && $scope.mapDivWidth > 0) {
                    $scope.rendering = true;
                    var mapSize = $scope.mapDivWidth * $scope.mapDivHeight;
                    for (var i = 0; i < mapSize; i++) {
                        $scope.cellsArray.push({});
                    }
                    $timeout(function () {
                        $scope.rendering = false;
                    }, 1500);
                }
            }

            $scope.paintColorsArray = [
                {
                    background: 'red'
                }, {
                    background: 'purple'
                }, {
                    background: 'blue'
                }, {
                    background: 'green'
                }, {
                    background: 'yellow'
                }, {
                    background: 'orange'
                }, {
                    background: 'black'
                }, {
                    background: 'grey'
                }, {
                    background: 'white'
                },
            ];

            $scope.applyColor = function (color) {
                $scope.activeColor = color;
            };

        })

} ());