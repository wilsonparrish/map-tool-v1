(function () {
    "use strict";

    angular.module('app')
        .controller('divmapMakerCtrl', function ($scope, $timeout, $firebaseArray, $firebaseObject, mapsService) {

            var fbref = firebase.database().ref();
            var mapBeingEdited;

            $scope.user = JSON.parse(localStorage.getItem('firebaseUser'));

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
                    }, 500);
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

            $scope.savedMaps = mapsService.getMaps();

            $scope.saveMap = function (mapName) {
                if (!$scope.mapName) {
                    alert("Map name must be specified");
                    return;
                }
                var mapData = {
                    map: JSON.stringify($scope.cellsArray),
                    height: $scope.mapDivHeight,
                    width: $scope.mapDivWidth,
                    name: $scope.mapName,
                    gridSize: $scope.gridSize,
                    owner: $scope.user.user.displayName
                };
                console.log('saving: ', mapData);
                if (mapName) {
                    // for (var i = 0; i < $scope.savedMaps.length; i++) {
                    //     if (mapName === $scope.savedMaps[i].name) {
                    //         alert("A map by that name already exists");
                    //         return;
                    //     }
                    // }
                    for (var i = 0; i < $scope.savedMaps.length; i++) {
                        if ($scope.savedMaps[i].name === mapName) {
                            console.log('saving map at index ' + i + ' with an $id of ' + $scope.savedMaps[i].$id + ' which should be equal to ' + $scope.savedMaps.$keyAt(i));
                            $scope.savedMaps[i].map = mapData.map;
                            $scope.savedMaps[i].height = mapData.height;
                            $scope.savedMaps[i].width = mapData.width;
                            $scope.savedMaps[i].name = mapData.name;
                            $scope.savedMaps[i].gridSize = mapData.gridSize;
                            $scope.savedMaps[i].owner = $scope.user.user.displayName;
                            $scope.savedMaps.$save(i).then(function (ref) {
                                console.log('saved: ', ref);
                                toastr.success('Map saved successfully', 'Success');
                            }, function (err) {
                                // alert("there was an error saving this map", err);
                                console.log(err);
                                toastr.error('An error occurred', 'Error');                                
                            })
                        }
                    }
                } else {
                    $scope.savedMaps.$add(mapData).then(function (ref) {
                        toastr.success('Map saved successfully', 'Success');                        
                        console.log('saved: ', ref);
                    }, function (err) {
                        toastr.error('An error occurred', 'Error');                                
                        console.log(err);
                    })
                }
            }

            // Resizing maps 
            $scope.resizeOptions = [
                {
                    display: 'Add rows to top',
                    optionNum: 1
                }, {
                    display: 'Add rows to bottom',
                    optionNum: 2
                }, {
                    display: 'Add colums to left',
                    optionNum: 3
                }, {
                    display: 'Add columns to right',
                    optionNum: 4
                }, {
                    display: 'Remove rows from top',
                    optionNum: 5
                }, {
                    display: 'Remove rows from bottom',
                    optionNum: 6
                }, {
                    display: 'Remove columns from left',
                    optionNum: 7
                }, {
                    display: 'Remove columns from right',
                    optionNum: 8
                },
            ];

            $scope.resizeRowsCols = 0;

            $scope.resizeMap = function () {
                if (!$scope.mapName) {
                    alert("Map must be saved before resizing.");
                    return;
                }
                console.log($scope.chosenResizeOption);
                switch ($scope.chosenResizeOption) {
                    case 1:
                        var cellsToAdd = $scope.resizeRowsCols * $scope.mapDivWidth;
                        for (var i = 0; i < cellsToAdd; i++) {
                            $scope.cellsArray.unshift({ tooltip: "" });
                        }
                        $scope.mapDivHeight += $scope.resizeRowsCols;
                        break;
                    case 2:
                        var cellsToAdd = $scope.resizeRowsCols * $scope.mapDivWidth;
                        for (var i = 0; i < cellsToAdd; i++) {
                            $scope.cellsArray.push({ tooltip: "" });
                        }
                        $scope.mapDivHeight += $scope.resizeRowsCols;
                        break;                        
                    case 3:
                        $scope.mapDivWidth += $scope.resizeRowsCols;                                                
                        for (var i = 0; i < $scope.mapDivHeight; i++){
                            for (var j = 0; j < $scope.resizeRowsCols; j++){
                                $scope.cellsArray.splice($scope.mapDivWidth * i,0,{ tooltip: "" });                                
                            }
                        }
                        break;
                    case 4:
                        $scope.mapDivWidth += $scope.resizeRowsCols;                                                
                        for (var i = 1; i <= $scope.mapDivHeight; i++){
                            for (var j = 0; j < $scope.resizeRowsCols; j++){
                                $scope.cellsArray.splice($scope.mapDivWidth * i,0,{ tooltip: "" });                                
                            }
                        }
                        break;                        
                    case 5:
                        var cellsToRemove = $scope.resizeRowsCols * $scope.mapDivWidth;
                        for (var i = 0; i < cellsToRemove; i++) {
                            $scope.cellsArray.shift();
                        }
                        $scope.mapDivHeight -= $scope.resizeRowsCols;
                        break;                        
                    case 6:
                        var cellsToRemove = $scope.resizeRowsCols * $scope.mapDivWidth;
                        for (var i = 0; i < cellsToRemove; i++) {
                            $scope.cellsArray.pop();
                        }
                        $scope.mapDivHeight -= $scope.resizeRowsCols;
                        break;                        
                    case 7:
                        $scope.mapDivWidth -= $scope.resizeRowsCols;
                        for (var i = 0; i < $scope.mapDivHeight; i++){
                            $scope.cellsArray.splice($scope.mapDivWidth * i, $scope.resizeRowsCols);                                
                        }                                                
                        break;
                    case 8:
                        $scope.mapDivWidth -= $scope.resizeRowsCols;                        
                        for (var i = 1; i <= $scope.mapDivHeight; i++){
                            $scope.cellsArray.splice($scope.mapDivWidth * i, $scope.resizeRowsCols);                                
                        }
                        break;
                }
                $scope.saveMap($scope.mapName);
                $scope.createMap(false, $scope.chosenMap);
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