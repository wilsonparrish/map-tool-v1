(function () {
    "use strict";

    angular.module('app')
        .controller('divmapMakerCtrl', function ($scope, $timeout) {

            $scope.cellsArray = [];
            $scope.mapWidth;
            $scope.mapHeight;
            $scope.activeColor;
            $scope.activeCustom;
            $scope.adding = false;

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
            
            $scope.applyColor = function (color) {
                $scope.activeColor = color;
                $scope.activeCustom = undefined;                
            };

            $scope.applyCustom = function (url) {
                $scope.activeCustom = url;
                $scope.activeColor = undefined;                
            };

            $scope.addCustom = function() {
                $scope.customTiles.push({
                    backgroundUrl: "'" + $scope.newUrl + "'"
                })
                $scope.newUrl = '';
                
            };

            $scope.paintColorsArray = [
                {
                    background: 'pink'
                },
                {
                    background: 'red'
                },
                {
                    background: 'purple'
                },
                {
                    background: 'lightblue'
                },
                {
                    background: 'blue'
                },
                {
                    background: 'green'
                },
                {
                    background: 'lightgreen'
                },
                {
                    background: 'yellow'
                },
                {
                    background: 'gold'
                },
                {
                    background: 'orange'
                },
                {
                    background: 'black'
                },
                {
                    background: 'grey'
                },
                {
                    background: 'white'
                },
            ];

            $scope.customTiles = [
                {
                    backgroundUrl: "https://s-media-cache-ak0.pinimg.com/236x/ea/ec/66/eaec665dea9111ac6029b11d65ff9e75.jpg"           
                },
                {
                    backgroundUrl: "http://the-lost-and-the-damned.664610.n2.nabble.com/file/n7581201/10857.jpg"
                },
                {
                    backgroundUrl: "http://www.dundjinni.com/forums/uploads/aegean/67Z_fractured_floor6_ae.png"
                }
            ];

        })

} ());