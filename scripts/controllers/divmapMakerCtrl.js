(function () {
    "use strict";

    angular.module('app')
        .controller('divmapMakerCtrl', function ($scope, $timeout, $firebaseArray, $firebaseObject) {

            var fbref = firebase.database().ref();

            $scope.cellsArray = [];
            $scope.mapWidth;
            $scope.mapHeight;
            $scope.activeColor;
            $scope.activeCustom;
            $scope.adding = false;
            $scope.addingTooltip = false;
            $scope.gridSize = 30;

            $scope.createMap = function (newRender, chosenMap) {
                if ($scope.mapDivHeight > 0 && $scope.mapDivWidth > 0 && newRender) {
                    $scope.cellsArray = [];
                    $scope.rendering = true;
                    var mapSize = $scope.mapDivWidth * $scope.mapDivHeight;
                    for (var i = 0; i < mapSize; i++) {
                        $scope.cellsArray.push({
                            tooltip: ""
                        });
                    }
                    $timeout(function () {
                        $scope.rendering = false;
                    }, 1500);
                }
                if (chosenMap) {
                    $scope.cellsArray = JSON.parse(chosenMap.map);
                    $scope.rendering = true;
                    $scope.mapDivWidth = chosenMap.width;
                    $scope.mapDivHeight = chosenMap.height;
                    $scope.gridSize = chosenMap.gridSize;
                    $timeout(function () {
                        $scope.rendering = false;
                    }, 1500);
                }
                $scope.mapWidth = $scope.mapDivWidth * $scope.gridSize + 'px';
                $scope.mapHeight = $scope.mapDivHeight * $scope.gridSize + 'px';
            }

            var mapsRef = fbref.child("savedMaps");
            $scope.savedMaps = $firebaseArray(mapsRef);

            $scope.saveMap = function () {
                var mapData = {
                    map: JSON.stringify($scope.cellsArray),
                    height: $scope.mapDivHeight,
                    width: $scope.mapDivWidth,
                    name: $scope.mapName,
                    gridSize: $scope.gridSize
                };
                console.log('saving: ', mapData);
                $scope.savedMaps.$add(mapData).then(function(ref){
                    console.log('saved: ', ref);
                })
                $scope.mapName = "";
            }

            // Everything having to do with tile colors below here
            
            $scope.applyColor = function (color) {
                $scope.activeColor = color;
                $scope.activeCustom = undefined;                
            };

            $scope.applyCustom = function (url) {
                $scope.activeCustom = url;
                $scope.activeColor = undefined;                
            };

            $scope.addCustom = function () {
                $scope.customTiles.$add({
                    backgroundUrl: "'" + $scope.newUrl + "'"
                })
                $scope.newUrl = '';
            };

            var customTilesRef = fbref.child("customTiles");
            $scope.customTiles = $firebaseArray(customTilesRef);   

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
                    background: 'saddlebrown'
                },
                {
                    background: 'brown'
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
            
        })

} ());