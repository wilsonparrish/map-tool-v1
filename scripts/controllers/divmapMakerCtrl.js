(function () {
    "use strict";

    angular.module('app')
        .controller('divmapMakerCtrl', function ($scope, $timeout, $firebaseArray, $firebaseObject) {

            var fbref = firebase.database().ref();
            var mapBeingEdited;

            $scope.cellsArray = [];
            $scope.mapWidth;
            $scope.mapHeight;
            $scope.activeColor;
            $scope.activeCustom;
            $scope.adding = false;
            $scope.addingTooltip = false;
            $scope.gridSize = 30;
            $scope.mouseDragging;

            $scope.setDragging = function (bool) {
                // console.log('setting');
                $scope.mouseDragging = bool;
            }

            $scope.mouseDragCheck = function (cell) {
                // console.log('checking...', $scope.mouseDragging);
                if ($scope.mouseDragging) {
                    cell.backgroundUrl = $scope.activeCustom;
                    cell.background = $scope.activeColor;
                    // console.log('changing...');
                }
            }

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
                    $scope.updatingMap = false;                    
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
                    mapBeingEdited = chosenMap.name;
                    $scope.mapName = chosenMap.name;
                    $scope.updatingMap = true;
                    $timeout(function () {
                        $scope.rendering = false;
                    }, 1500);
                }
                $scope.mapWidth = $scope.mapDivWidth * $scope.gridSize + 'px';
                $scope.mapHeight = $scope.mapDivHeight * $scope.gridSize + 'px';
            }

            var mapsRef = fbref.child("savedMaps");
            $scope.savedMaps = $firebaseArray(mapsRef);
            console.log($scope.savedMaps);

            $scope.saveMap = function (mapName) {
                var mapData = {
                    map: JSON.stringify($scope.cellsArray),
                    height: $scope.mapDivHeight,
                    width: $scope.mapDivWidth,
                    name: $scope.mapName,
                    gridSize: $scope.gridSize
                };
                console.log('saving: ', mapData);
                if (mapName) {
                    for (var i = 0; i < $scope.savedMaps.length; i++) {
                        if ($scope.savedMaps[i].name === mapName) {
                            console.log('saving map at index ' + i + ' with an $id of ' + $scope.savedMaps[i].$id + ' which should be equal to ' + $scope.savedMaps.$keyAt(i));
                            $scope.savedMaps[i].map = mapData.map;
                            $scope.savedMaps[i].height = mapData.height;
                            $scope.savedMaps[i].width = mapData.width;
                            $scope.savedMaps[i].name = mapData.name;
                            $scope.savedMaps[i].gridSize = mapData.gridSize;
                            $scope.savedMaps.$save($scope.savedMaps.$keyAt(i)).then(function (ref) {
                                console.log('saved: ', ref);
                            }, function (err) {
                                // alert("there was an error saving this map", err);
                                console.log(err);
                            })
                        }
                    }
                } else {
                    $scope.savedMaps.$add(mapData).then(function (ref) {
                        console.log('saved: ', ref);
                    }, function (err) {
                        // alert("there was an error saving this map", err);
                        console.log(err);
                    })
                }
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
                    name: $scope.customTileName,
                    backgroundUrl: "'" + $scope.newUrl + "'"
                })
                $scope.customTileName = '';
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